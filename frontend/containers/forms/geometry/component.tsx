import { useRef, useCallback, ChangeEventHandler, useState, useEffect } from 'react';

import { Upload as UploadIcon, Edit2 as PenIcon } from 'react-feather';
import { FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

import cx from 'classnames';

import Script from 'next/script';

import bbox from '@turf/bbox';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { mergeRefs } from 'helpers/refs';

import LocationSearcher from 'containers/discover-map/location-searcher';

import Button from 'components/button';
import ErrorMessage from 'components/forms/error-message';
import Icon from 'components/icon';
import Map from 'components/map';
import Controls from 'components/map/controls';
import FullscreenControl from 'components/map/controls/fullscreen';
import ZoomControl from 'components/map/controls/zoom';

import { convertFilesToGeojson, supportedFileformats } from './helpers';
import { GeometryInputProps } from './types';

export const GeometryInput = <FormValues extends FieldValues>({
  id,
  'aria-label': ariaLabel,
  name,
  control,
  controlOptions,
  className,
}: GeometryInputProps<FormValues>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef(null);
  const editorRef = useRef<Editor>(null);
  const intl = useIntl();

  const [internalError, setInternalError] = useState('');
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });
  const [drawMode, setDrawMode] = useState(new DrawPolygonMode());
  const [drawing, setDrawing] = useState(false);

  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: controlOptions,
    defaultValue: controlOptions.value as UnpackNestedValue<
      PathValue<FormValues, Path<FormValues>>
    >,
  });

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const { files } = e.currentTarget;

      try {
        const geojson = await convertFilesToGeojson(Array.from(files), intl);

        onChange({
          type: 'change',
          target: { name, value: geojson },
        });
        setInternalError('');

        setBounds({ bbox: bbox(geojson), options: { padding: 20 } });
      } catch (errorMessage) {
        onChange({ type: 'change', target: { name, value: null } });
        setInternalError(errorMessage);
      }
    },
    [intl, name, onChange]
  );

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

  const onClickDraw = useCallback(() => setDrawing(true), []);

  const onClickCancel = useCallback(() => {
    setDrawing(false);

    // This line makes sure to reset the editor's internal state
    setDrawMode(new DrawPolygonMode());
  }, []);

  const onUpdateDrawing = useCallback(
    ({ editType, data }) => {
      if (editType === 'addFeature') {
        const geojson = {
          type: 'FeatureCollection',
          features: data,
        };

        onChange({
          type: 'change',
          target: { name, value: geojson },
        });
        setInternalError('');

        setDrawing(false);
      }
    },
    [name, onChange]
  );

  const handleLocationSelected = ({ bbox }) => {
    setBounds({ ...bounds, bbox });
  };

  return (
    <div className={className}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      <div className="flex flex-col items-end">
        <input
          ref={mergeRefs([ref, inputRef])}
          id={id}
          className="sr-only"
          type="file"
          accept={supportedFileformats.map((ext) => `.${ext}`).join(',')}
          multiple
          aria-label={ariaLabel}
          aria-describedby={`${name}-internal-error`}
          onBlur={onBlur}
          onChange={onChangeInput}
        />
        <Button
          type="button"
          theme="secondary-green"
          aria-label={intl.formatMessage({
            defaultMessage: 'Upload shapefile / KML file',
            id: 'PgGfZr',
          })}
          onClick={() => inputRef.current.click()}
        >
          <Icon icon={UploadIcon} className="inline-block w-5 h-5 mr-3" aria-hidden={true} />
          <FormattedMessage defaultMessage="Shapefile / KML" id="cqoaMq" />
        </Button>
        <span className="max-w-lg text-right">
          <ErrorMessage id={`${name}-internal-error`} errorText={internalError} />
        </span>
      </div>
      <div
        className={cx({
          'p-2 mt-2 bg-white border border-solid h-80 rounded-2xl': true,
          'border-beige': !invalid,
          'border-red-700': invalid,
        })}
      >
        <div className="w-full h-full overflow-hidden rounded-lg">
          <div ref={mapContainerRef} className="relative w-full h-full bg-white">
            <Map
              bounds={bounds}
              viewport={viewport}
              onMapViewportChange={(v) => setViewport(v)}
              getCursor={({ isHovering, isDragging }) => {
                if (drawing) {
                  return 'crosshair';
                } else if (isHovering) {
                  return 'pointer';
                } else if (isDragging) {
                  return 'grabbing';
                }

                return 'grab';
              }}
            >
              {(map) => (
                <LayerManager map={map} plugin={PluginMapboxGl}>
                  {drawing && (
                    <Editor
                      ref={editorRef}
                      mode={drawMode}
                      clickRadius={7}
                      editHandleShape="circle"
                      featureStyle={{
                        stroke: '#316146',
                        strokeWidth: '2',
                        fill: 'none',
                      }}
                      editHandleStyle={({ index }) => ({
                        stroke: '#316146',
                        strokeWidth: 2,
                        fill: '#CFD762',
                        fillOpacity: 0.2,
                        r: index === 0 ? '6px' : '0px',
                      })}
                      onUpdate={onUpdateDrawing}
                    />
                  )}
                  {!!value && !drawing && (
                    <Layer
                      id="geojson"
                      type="geojson"
                      source={{ type: 'geojson', data: value }}
                      render={{
                        layers: [
                          {
                            type: 'fill',
                            paint: {
                              'fill-color': '#CFD762',
                              'fill-opacity': 0.2,
                            },
                          },
                          {
                            type: 'line',
                            paint: {
                              'line-color': '#316146',
                              'line-opacity': 1,
                              'line-width': 2,
                            },
                          },
                        ],
                      }}
                    />
                  )}
                </LayerManager>
              )}
            </Map>
            <div className="absolute flex gap-2 top-3.5 left-3.5 text-gray-800 text-sm">
              <LocationSearcher onLocationSelected={handleLocationSelected} />
            </div>
            <Controls className="absolute bottom-2 left-2">
              <ZoomControl viewport={{ ...viewport }} onZoomChange={onZoomChange} />
            </Controls>
            <Controls className="absolute top-2 right-2">
              <FullscreenControl mapRef={mapContainerRef} />
            </Controls>
            <Controls className="absolute -translate-x-1/2 bottom-2 left-1/2">
              {!drawing && (
                <Button type="button" onClick={onClickDraw}>
                  <>
                    <Icon className="inline-block w-5 h-5 mr-2" icon={PenIcon} aria-hidden />
                    <FormattedMessage defaultMessage="Start drawing" id="aT5Ajq" />
                  </>
                </Button>
              )}
              {drawing && (
                <Button type="button" onClick={onClickCancel}>
                  <>
                    <Icon className="inline-block w-5 h-5 mr-2" icon={PenIcon} aria-hidden />
                    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                  </>
                </Button>
              )}
            </Controls>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometryInput;
