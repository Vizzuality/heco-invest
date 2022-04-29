import { useRef, useCallback, ChangeEventHandler, useState } from 'react';

import { Upload as UploadIcon } from 'react-feather';
import { FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import bbox from '@turf/bbox';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { mergeRefs } from 'helpers/refs';

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
  const intl = useIntl();

  const [internalError, setInternalError] = useState('');
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

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

  return (
    <div className={className}>
      <div className="flex flex-col items-end">
        <input
          ref={mergeRefs([ref, inputRef])}
          id={id}
          className="sr-only"
          type="file"
          accept={supportedFileformats.map((ext) => `.${ext}`).join(',')}
          multiple
          aria-describedby={`${name}-internal-error`}
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
        <ErrorMessage id={`${name}-internal-error`} errorText={internalError} />
      </div>
      <div className="p-2 mt-2 bg-white border border-solid h-80 border-beige rounded-2xl">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <div ref={mapContainerRef} className="relative w-full h-full bg-white">
            <Map bounds={bounds} viewport={viewport} onMapViewportChange={(v) => setViewport(v)}>
              {(map) => (
                <LayerManager map={map} plugin={PluginMapboxGl}>
                  {!!value && (
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
            <Controls className="absolute bottom-2 left-2">
              <ZoomControl viewport={{ ...viewport }} onZoomChange={onZoomChange} />
            </Controls>
            <Controls className="absolute top-2 right-2">
              <FullscreenControl mapRef={mapContainerRef} />
            </Controls>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometryInput;
