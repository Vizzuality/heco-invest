import { FC, useRef, useState } from 'react';

import { FocusScope } from 'react-aria';
import { Layers as IconLayers } from 'react-feather';
import { ChevronUp as ChevronUpIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useKey } from 'rooks';

import { useLayers } from 'hooks/useLayers';

import Expando from 'components/expando';
import Switch from 'components/forms/switch';

import LayerInfo from '../layer-info';

import type { MapLayersSelectorProps } from './types';

export const MapLayersSelector: FC<MapLayersSelectorProps> = ({
  className,
  register,
  registerOptions,
  visibleLayers,
  layerSelectorOpen,
  setLayerSelectorOpen,
}: MapLayersSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const { groupedLayers } = useLayers();
  const initialOpenLayerGroup = groupedLayers.map((group) => group.id);
  const [openLayerGroup, setOpenLayerGroup] = useState<string[]>(initialOpenLayerGroup);

  useKey(['Escape'], () => setLayerSelectorOpen(false), {
    target: selectorRef,
  });

  const handleButtonClick = () => {
    setLayerSelectorOpen(!layerSelectorOpen);
  };

  const handleChangeOpenLayerGroup = (groupId: string) => {
    const newOpenLayerGroup = openLayerGroup.includes(groupId)
      ? openLayerGroup.filter((id) => id !== groupId)
      : [...openLayerGroup, groupId];
    setOpenLayerGroup(newOpenLayerGroup);
  };

  return (
    <div className={className} ref={containerRef}>
      <button
        className={cx(
          'flex items-center gap-2.5 shadow-sm h-full rounded border-xl px-2 py-1.5 outline-none transition-all focus-visible:outline-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-fit',
          {
            'bg-white text-gray-800 hover:text-green-dark': !layerSelectorOpen,
            'bg-green-dark text-white': layerSelectorOpen,
          }
        )}
        onClick={handleButtonClick}
      >
        <IconLayers className="w-4 h-4" />
        <FormattedMessage defaultMessage="Map data" id="avLYLg" />
        {!!visibleLayers && (
          <div
            className={cx(
              'flex items-center justify-center w-4 h-4 rounded-full text-xs font-sans font-semibold transition-colors',
              {
                'bg-white text-gray-800 hover:text-green-dark': layerSelectorOpen,
                'bg-green-dark text-white': !layerSelectorOpen,
              }
            )}
          >
            {visibleLayers}
          </div>
        )}
      </button>
      <FocusScope contain restoreFocus>
        <div
          className={cx(
            'mt-1.5 overflow-hidden mx-0.5 absolute bg-white top-8 z-20 transition-all duration-500',
            {
              'flex opacity-100 flex-col md:flex-row md:items-stretch rounded shadow drop-shadow h-auto':
                layerSelectorOpen,
              'h-0 opacity-0': !layerSelectorOpen,
            }
          )}
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
                    onChange={() => handleChangeOpenLayerGroup(layerGroup.id)}
                    title={
                      <div className="flex items-center justify-start w-full gap-1 px-0 py-0 my-2">
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
                      </div>
                    }
                  >
                    <ol className="flex flex-col gap-3.5 text-xs text-black py-2">
                      {layerGroup.layers.map((layer) => {
                        const { id, name, group } = layer;
                        return (
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
                            <label htmlFor={id} className="cursor-pointer">
                              {name}
                            </label>
                            <LayerInfo layer={layer} />
                          </li>
                        );
                      })}
                    </ol>
                  </Expando>
                );
              })}
            </form>
          </div>
        </div>
      </FocusScope>
    </div>
  );
};

export default MapLayersSelector;
