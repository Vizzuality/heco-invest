import { FC, useRef, useState, useEffect } from 'react';

import { FocusScope } from 'react-aria';
import { Layers as IconLayers } from 'react-feather';
import { ChevronUp as ChevronUpIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useKey, useOutsideClick } from 'rooks';

import { useLayers } from 'hooks/useLayers';

import Expando from 'components/expando';
import Switch from 'components/forms/switch';
import Tooltip from 'components/tooltip';

import type { MapLayersSelectorProps, MapLayersSelectorForm } from './types';

export const MapLayersSelector: FC<MapLayersSelectorProps> = ({
  className,
  onActiveLayersChange,
}: MapLayersSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const { groupedLayers } = useLayers();

  const { register, watch } = useForm<MapLayersSelectorForm>({
    defaultValues: {
      activeLayers: [],
    },
  });

  const activeLayers = watch('activeLayers');

  useKey(['Escape'], () => setIsOpen(false), {
    target: selectorRef,
  });

  useOutsideClick(containerRef, () => {
    if (!isOpen) return;
    setIsOpen(false);
  });

  useEffect(() => {
    onActiveLayersChange(activeLayers);
  }, [activeLayers, onActiveLayersChange]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className} ref={containerRef}>
      <div className="relative flex flex-col justify-center">
        <button
          className="flex items-center gap-2.5 shadow-sm h-full bg-white rounded border-xl px-2 py-1 outline-none focus-visible:ring-green-dark focus-visible:ring-2 hover:ring-green-dark hover:ring-1"
          onClick={handleButtonClick}
        >
          <IconLayers className="w-4 h-4" />
          <FormattedMessage defaultMessage="Map layers" id="iwpEth" />
        </button>
        {isOpen && (
          <FocusScope contain restoreFocus>
            <div className="relative mx-0.5 mt-2" ref={selectorRef}>
              <div className="absolute top-0 left-0 lg:min-w-[280px] z-10 p-3 -m-0.5 bg-white rounded-md shadow-xl border-xl whitespace-nowrap">
                <form>
                  {groupedLayers.map((layerGroup) => {
                    if (!layerGroup.layers.length) return null;

                    return (
                      <Expando
                        key={layerGroup.id}
                        title={
                          <div className="flex items-center w-full my-2">
                            <span className="flex flex-grow">{layerGroup.name}</span>
                            <span>
                              <ChevronUpIcon
                                className={cx({
                                  'w-4 h-4 transition-all': true,
                                  'rotate-0': !isOpen,
                                  'rotate-180': isOpen,
                                })}
                              />
                            </span>
                          </div>
                        }
                      >
                        <ol className="flex flex-col gap-3.5 text-xs text-black py-2">
                          {layerGroup.layers.map(({ id, name, description }) => (
                            <li key={id} className="flex items-center gap-1.5">
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Switch
                                  id={id}
                                  name="activeLayers"
                                  switchSize="smallest"
                                  value={id}
                                  register={register}
                                />
                                {name}
                              </label>
                              {description && (
                                <Tooltip
                                  placement="top"
                                  arrow
                                  arrowClassName="bg-black"
                                  content={
                                    <div className="max-w-md p-2 font-sans text-sm font-normal text-white bg-black rounded-sm w-72">
                                      {description}
                                    </div>
                                  }
                                >
                                  <button
                                    type="button"
                                    className="flex items-center justify-center w-4 h-4 text-gray-800 scale-90 border border-gray-800 rounded-full pointer focus-visible:outline-green-dark focus-visible:outline-2"
                                  >
                                    <p className="text-xs">i</p>
                                  </button>
                                </Tooltip>
                              )}
                            </li>
                          ))}
                        </ol>
                      </Expando>
                    );
                  })}
                </form>
              </div>
            </div>
          </FocusScope>
        )}
      </div>
    </div>
  );
};

export default MapLayersSelector;
