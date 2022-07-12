import { FC, useRef, useState, useEffect } from 'react';

import { FocusScope } from 'react-aria';
import { Layers as IconLayers } from 'react-feather';
import { ChevronUp as ChevronUpIcon, X as CloseIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useKey, useOutsideClick } from 'rooks';

import { useLayers } from 'hooks/useLayers';

import Button from 'components/button';
import Expando from 'components/expando';
import Switch from 'components/forms/switch';

import LayerTooltip from '../layer-tooltip';

import type { MapLayersSelectorProps, MapLayersSelectorForm, SelectedLayerTooltip } from './types';

export const MapLayersSelector: FC<MapLayersSelectorProps> = ({
  className,
  onActiveLayersChange,
}: MapLayersSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLayer, setSelectedlayer] = useState<SelectedLayerTooltip>();
  const containerRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const { groupedLayers } = useLayers();
  const initialOpenLayerGroup = groupedLayers.map((group) => group.id);
  const [openLayerGroup, setOpenLayerGroup] = useState<string[]>(initialOpenLayerGroup);

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
    setSelectedlayer(undefined);
    setOpenLayerGroup(initialOpenLayerGroup);
  });

  useEffect(() => {
    onActiveLayersChange(activeLayers);
  }, [activeLayers, onActiveLayersChange]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setSelectedlayer(undefined);
  };

  const handleShowTooltip = (layer: SelectedLayerTooltip) => {
    setSelectedlayer(layer);
  };

  const handleChangeOpenLayerGroup = (groupId: string) => {
    const newOpenLayerGroup = openLayerGroup.includes(groupId)
      ? openLayerGroup.filter((id) => id !== groupId)
      : [...openLayerGroup, groupId];
    setOpenLayerGroup(newOpenLayerGroup);
  };

  return (
    <div className={className} ref={containerRef}>
      <div className="relative flex flex-col justify-center">
        <button
          className="flex items-center gap-2.5 shadow-sm h-full bg-white rounded border-xl px-2 py-1 outline-none focus-visible:ring-green-dark focus-visible:ring-2 hover:ring-green-dark hover:ring-1 w-fit"
          onClick={handleButtonClick}
        >
          <IconLayers className="w-4 h-4" />
          <FormattedMessage defaultMessage="Map layers" id="iwpEth" />
        </button>
        {isOpen && (
          <FocusScope contain restoreFocus>
            <div
              className="z-10 relative flex flex-col md:flex-row mx-0.5 mt-2 bg-white rounded-2xl"
              ref={selectorRef}
            >
              <div className="flex top-0 left-0 lg:min-w-fit z-10 p-3 -m-0.5 whitespace-nowrap overflow-auto">
                <form>
                  {groupedLayers.map((layerGroup) => {
                    if (!layerGroup.layers.length) return null;
                    const groupIsOpen = openLayerGroup.includes(layerGroup.id);

                    return (
                      <Expando
                        defaultOpen={groupIsOpen}
                        key={layerGroup.id}
                        title={
                          <Button
                            theme="naked"
                            className="w-full px-0 py-0"
                            onClick={() => handleChangeOpenLayerGroup(layerGroup.id)}
                          >
                            <div className="flex items-center w-full my-2">
                              <span className="flex flex-grow">{layerGroup.name}</span>
                              <ChevronUpIcon
                                className={cx({
                                  'w-4 h-4 transition-all': true,
                                  'rotate-180': !groupIsOpen,
                                  'rotate-0': groupIsOpen,
                                })}
                              />
                            </div>
                          </Button>
                        }
                      >
                        <ol className="flex flex-col gap-3.5 text-xs text-black py-2">
                          {layerGroup.layers.map(({ id, name, description, overview }) => (
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

                              <button
                                onClick={() =>
                                  handleShowTooltip({ id, name, description, overview })
                                }
                                type="button"
                                className="flex items-center justify-center w-4 h-4 text-gray-800 scale-90 border border-gray-800 rounded-full pointer focus-visible:outline-green-dark focus-visible:outline-2"
                              >
                                <p className="pt-0.5 text-xs">i</p>
                              </button>
                            </li>
                          ))}
                        </ol>
                      </Expando>
                    );
                  })}
                </form>
              </div>
              <LayerTooltip
                selectedLayer={selectedLayer}
                closeTooltip={() => setSelectedlayer(undefined)}
              />
            </div>
          </FocusScope>
        )}
      </div>
    </div>
  );
};

export default MapLayersSelector;
