import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import MapboxGLPlugin from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { LAYERS, LAYER_GROUPS, useLayers } from 'hooks/useLayers';

import { useQueryParams } from 'helpers/pages';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import ClusterLayer from 'components/map/layers/cluster';
import { Legend } from 'components/map/legend/types';
import ProjectMapPin from 'components/project-map-pin';
import { logEvent } from 'lib/analytics/ga';

import { useProjectsMap } from 'services/projects/projectService';

import LayerInfoModal from './layer-info-modal';
import LayerLegend from './layer-legend';
import LocationSearcher from './location-searcher';
import MapHelp from './map-help';
import MapLayersSelector from './map-layers-selector';
import { MapLayersSelectorForm } from './map-layers-selector/types';
import MapPinCluster from './pin-cluster';
import { DiscoverMapProps, SelectLayerInfoType } from './types';

const cartoProvider = new CartoProvider();

export const DiscoverMap: FC<DiscoverMapProps> = ({ onSelectProjectPin }) => {
  const { layers } = useLayers();
  const { page, sorting, search, ...filters } = useQueryParams();

  const { projectsMap } = useProjectsMap({
    ...filters,
    'filter[full_text]': search as string,
  });

  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  const [layerSelectorOpen, setLayerSelectorOpen] = useState(false);
  const [selectedLayerInfo, setSelectedLayerInfo] = useState<SelectLayerInfoType>();

  // blur map and controllers when layer selector is open
  const blur = { 'blur-[2px]': layerSelectorOpen };

  const onZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
        transitionDuration: 300,
      });
    },
    [viewport]
  );

  const { register, watch, resetField, setValue } = useForm<MapLayersSelectorForm>();

  const layerInputs = watch();

  /** An array with the values of the selected layers */
  const visibleLayers: string[] = useMemo(
    () =>
      Object.values(layerInputs).reduce((prev, curr) => {
        return !!curr && curr.length ? [...prev, curr[0]] : prev;
      }, []),
    [layerInputs]
  );

  const handleViewportChange = useCallback(
    (vw) => {
      setViewport({ ...viewport, ...vw });
    },
    [viewport]
  );

  const handleLocationSelected = ({ bbox }) => {
    setBounds({ ...bounds, bbox });
  };

  /** An array with the selected layers legends */
  const layerLegends: Legend[] = useMemo(
    () =>
      visibleLayers
        .map((layer) => (layers as unknown as Legend[]).find(({ id }) => layer === id))
        .reverse(),
    [layers, visibleLayers]
  );

  const displayResourceWatchCredits = useMemo(() => {
    return layerLegends.some((layer) => layer.isResourceWatch);
  }, [layerLegends]);

  const handleChangeVisibleLayer = (e: ChangeEvent<HTMLInputElement>) => {
    // The layer inputs are groups of checkboxes. To limit one value per group, the value is always
    // updated to an array of one item with the last selected value. If the checkbox is already
    // selected (the user unchecked the checkbox), the field is reseted.
    const { name, value } = e.currentTarget;
    if (visibleLayers.includes(value)) {
      resetField(name as keyof MapLayersSelectorForm);
    } else {
      logEvent('layer_toggled', { layer_name: value });
      setValue(name as keyof MapLayersSelectorForm, [value]);
    }
  };

  useEffect(() => {
    // Set priority landscapes layer visible by default
    setValue(LAYER_GROUPS.BaseLayer, [LAYERS.HeCoMosaics]);
  }, []);

  return (
    <>
      <div className="relative w-full h-full">
        <div className={cx('w-full h-full', blur)}>
          <Map
            bounds={bounds}
            viewport={viewport}
            onMapViewportChange={handleViewportChange}
            reuseMaps
          >
            {(map) => (
              <>
                <LayerManager
                  map={map}
                  plugin={MapboxGLPlugin}
                  providers={{
                    [cartoProvider.name]: cartoProvider.handleData,
                  }}
                >
                  {layers.map(({ specification: layerSpec }) => {
                    if (!layerSpec || !visibleLayers.includes(layerSpec.id)) return null;
                    return <Layer key={layerSpec.id} {...layerSpec} />;
                  })}
                </LayerManager>

                <ClusterLayer
                  data={projectsMap}
                  map={map}
                  MarkerComponent={ProjectMapPin}
                  ClusterComponent={MapPinCluster}
                  onSelectProjectPin={onSelectProjectPin}
                />
              </>
            )}
          </Map>
        </div>
        <div
          // `bottom-12` ensures the layers menu doesn't overflow the map
          // `pointer-events-none` because this div covers the map, this class is necessary to ensure the user can
          // interact with the map; however children elements inside need the `pointer-events-auto` added to make them
          // interactable
          className="absolute flex items-start gap-2 inset-3.5 bottom-12 text-gray-800 text-sm pointer-events-none"
        >
          <LocationSearcher
            className={cx('absolute pointer-events-auto', blur)}
            onLocationSelected={handleLocationSelected}
            isAlwaysOpen
          />
          <MapLayersSelector
            className="pointer-events-auto"
            register={register}
            registerOptions={{
              onChange: handleChangeVisibleLayer,
            }}
            visibleLayers={visibleLayers?.length}
            layerSelectorOpen={layerSelectorOpen}
            setLayerSelectorOpen={setLayerSelectorOpen}
            selectedLayerInfo={selectedLayerInfo}
            setSelectedLayerInfo={setSelectedLayerInfo}
          />
        </div>

        <div className="absolute px-2 text-xs text-gray-900 bg-gray-200 rounded bottom-2 left-4 bg-opacity-30">
          {displayResourceWatchCredits && (
            <span>
              <FormattedMessage
                defaultMessage="Powered by <a>Resource Watch</a>"
                id="vrCHpK"
                values={{
                  a: (chunk: string) => (
                    <a
                      className="hover:underline"
                      href="https://resourcewatch.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {chunk}
                    </a>
                  ),
                }}
              />
            </span>
          )}
        </div>

        <Controls
          className={cx(
            'absolute top-0 right-0 flex flex-col items-end justify-between w-full h-full pointer-events-none gap-y-2',
            blur
          )}
        >
          <div className="flex flex-col items-end p-4 gap-y-2">
            <ZoomControl
              className="pointer-events-auto w-min"
              viewport={{ ...viewport }}
              onZoomChange={onZoomChange}
            />
            <MapHelp />
          </div>
          <div className="max-h-[45%] flex-col flex justify-end h-auto">
            <LayerLegend
              className="flex flex-col justify-end h-full max-h-full overflow-y-auto"
              onCloseLegend={(layerGroup) => resetField(layerGroup as keyof MapLayersSelectorForm)}
              layersLegends={layerLegends}
              setSelectedLayerInfo={setSelectedLayerInfo}
            />
          </div>
        </Controls>
      </div>
      <LayerInfoModal
        layer={selectedLayerInfo}
        closeLayerInfoModal={() => setSelectedLayerInfo(undefined)}
      />
    </>
  );
};

export default DiscoverMap;
