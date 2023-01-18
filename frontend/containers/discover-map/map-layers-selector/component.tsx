import { FC, useRef, useState } from 'react';

import { FocusScope } from 'react-aria';
import { Layers as IconLayers } from 'react-feather';
import { ChevronUp as ChevronUpIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useKey } from 'rooks';

import { useLayers } from 'hooks/useLayers';

import Button from 'components/button';
import Expando from 'components/expando';
import Switch from 'components/forms/switch';
import Modal from 'components/modal';
import Tooltip from 'components/tooltip';

import LayerTooltip from '../layer-tooltip';

import type { MapLayersSelectorProps, SelectedLayerTooltip } from './types';

export const MapLayersSelector: FC<MapLayersSelectorProps> = ({
  className,
  register,
  registerOptions,
  visibleLayers,
}: MapLayersSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLayer, setSelectedlayer] = useState<SelectedLayerTooltip>();
  const containerRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const { groupedLayers } = useLayers();
  const initialOpenLayerGroup = groupedLayers.map((group) => group.id);
  const [openLayerGroup, setOpenLayerGroup] = useState<string[]>(initialOpenLayerGroup);

  useKey(['Escape'], () => setIsOpen(false), {
    target: selectorRef,
  });

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
    <div
      className={cx({
        [className]: !!className,
        'w-full h-full bg-white bg-opacity-70': isOpen,
      })}
      ref={containerRef}
    >
      <button
        className={cx(
          'flex items-center gap-2.5 shadow-sm  rounded border-xl px-2 py-1.5 outline-none transition-all focus-visible:outline-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-fit',
          {
            'bg-white text-gray-800 hover:text-green-dark': !isOpen,
            'bg-green-dark text-white': isOpen,
          }
        )}
        onClick={handleButtonClick}
      >
        <IconLayers className="w-4 h-4" />
        <FormattedMessage defaultMessage="Map layers" id="iwpEth" />
        {!!visibleLayers && (
          <div
            className={cx(
              'flex items-center justify-center w-4 h-4 rounded-full text-xs font-sans font-semibold transition-colors',
              {
                'bg-white text-gray-800 hover:text-green-dark': isOpen,
                'bg-green-dark text-white': !isOpen,
              }
            )}
          >
            {visibleLayers}
          </div>
        )}
      </button>
      {isOpen && (
        <FocusScope contain restoreFocus>
          <div
            className="mt-1.5 absolute top-8 z-20 flex flex-col md:flex-row md:items-stretch mx-0.5 bg-white rounded shadow drop-shadow max-h-full max-w-[255px]"
            ref={selectorRef}
          >
            <div className="flex flex-shrink-0 max-w-full p-3 overflow-y-auto">
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
                          className="flex items-center justify-start w-full gap-1 px-0 py-0 my-2"
                          onClick={() => handleChangeOpenLayerGroup(layerGroup.id)}
                        >
                          <span className="text-sm font-semibold text-gray-900">
                            {layerGroup.name}
                          </span>
                          <span className="text-xs text-gray-600">
                            (<FormattedMessage defaultMessage="max 1 layer" id="hRcpAt" />)
                          </span>
                          <span className="flex justify-end flex-grow">
                            <ChevronUpIcon
                              className={cx({
                                'w-4 h-4 transition-all': true,
                                'rotate-180': !groupIsOpen,
                                'rotate-0': groupIsOpen,
                              })}
                            />
                          </span>
                        </Button>
                      }
                    >
                      <ol className="flex flex-col gap-3.5 text-xs text-black py-2">
                        {layerGroup.layers.map(
                          ({
                            id,
                            name,
                            description,
                            overview,
                            dataSource,
                            dataSourceUrl,
                            group,
                          }) => (
                            <li key={id} className="flex items-center gap-1.5">
                              <div>
                                <Switch
                                  id={id}
                                  name={group}
                                  defaultValue={id}
                                  switchSize="smallest"
                                  register={register}
                                  registerOptions={registerOptions}
                                />
                              </div>
                              <label key={id} htmlFor={id} className="cursor-pointer">
                                {name}
                              </label>
                              <Tooltip
                                content={
                                  <div className="z-40 flex-shrink-0 max-w-xs p-2 font-sans text-sm font-normal text-white bg-black rounded-sm sm:max-w-md">
                                    {description}
                                  </div>
                                }
                              >
                                <Button
                                  theme="naked"
                                  size="smallest"
                                  className="flex items-center justify-center flex-shrink-0 w-4 h-4 text-gray-800 scale-90 border border-gray-800 rounded-full pointer focus-visible:outline-green-dark focus-visible:outline-2"
                                  onClick={() =>
                                    handleShowTooltip({
                                      id,
                                      name,
                                      description,
                                      overview,
                                      dataSource,
                                      dataSourceUrl,
                                    })
                                  }
                                >
                                  <span className="sr-only">
                                    <FormattedMessage defaultMessage="Information" id="E80WrK" />
                                  </span>
                                  <span className="pt-0.5 text-xs" aria-hidden>
                                    i
                                  </span>
                                </Button>
                              </Tooltip>
                            </li>
                          )
                        )}
                      </ol>
                    </Expando>
                  );
                })}
              </form>
            </div>
            <Modal
              open={!!selectedLayer}
              onDismiss={() => setSelectedlayer(undefined)}
              title={selectedLayer?.name}
            >
              <LayerTooltip selectedLayer={selectedLayer} />
            </Modal>
          </div>
        </FocusScope>
      )}
    </div>
  );
};

export default MapLayersSelector;
