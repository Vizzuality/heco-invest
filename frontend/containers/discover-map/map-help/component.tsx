import { FC, useState } from 'react';

import { HelpCircle, Layers, MapPin, Search, ZoomIn, ZoomOut } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from 'components/button';
import Icon from 'components/icon';
import Modal from 'components/modal';
import { theme } from 'tailwind.config';

import clusterExemple from 'svgs/map/cluster-exemple.svg';

import { MapHelpProps } from '.';

export const MapHelp: FC<MapHelpProps> = () => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Button
        className="flex items-center justify-center w-8 h-8 px-2 py-1 text-gray-800 transition-all bg-white rounded shadow focus-visible:outline-green-dark hover:text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-opacity-60 disabled:pointer-events-none"
        theme="naked"
        size="smallest"
        icon={() => <HelpCircle className="mr-0" />}
        onClick={() => setOpen(true)}
        aria-label={formatMessage({ defaultMessage: 'Open map help', id: 'q/Z5g4' })}
      />
      <Modal
        open={open}
        onDismiss={() => setOpen(false)}
        title={formatMessage({ defaultMessage: 'Map help', id: '5eVTzC' })}
        scrollable={false}
      >
        <div className="fixed w-full -translate-y-1 bg-white -z-10">
          <h1 className="font-serif text-3xl font-semibold text-green-dark">
            <FormattedMessage defaultMessage="Help" id="SENRqu" />
          </h1>
        </div>
        <div className="relative h-full px-1 pt-6 pb-24 overflow-y-scroll top-12 sm:pb-44">
          <p>
            <FormattedMessage
              defaultMessage="The map allows you to quickly see the location of each project and understand the context of the different projects."
              id="ghKJy+"
            />
          </p>
          <h2 className="block my-4 font-semibold">
            <FormattedMessage defaultMessage="Projects" id="UxTJRa" />
          </h2>
          <p>
            <FormattedMessage
              defaultMessage="Each project is represented by a marker that has a color defined by the project category."
              id="qFGn1F"
            />
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-7">
            <div className="flex items-center gap-x-4">
              {Object.values(theme.colors.category).map((categoryColor) => (
                <MapPin
                  className="stroke-transparent"
                  style={{ fill: categoryColor }}
                  key={categoryColor}
                  aria-label={formatMessage({ defaultMessage: 'Project pin icon', id: 'AMKznU' })}
                />
              ))}
              <p className="text-sm">
                <FormattedMessage defaultMessage="Project marker" id="wvp0Qm" />
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <Icon
                aria-label={formatMessage({ defaultMessage: 'Project cluster icon', id: 'XwwnKr' })}
                icon={clusterExemple}
                className="h-14 w-14 drop-shadow"
              />
              <p className="text-sm">
                <FormattedMessage defaultMessage="Group of projects" id="wghPR3" />
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">
                <FormattedMessage defaultMessage="Map Layers" id="A8VNfu" />
              </h2>
              <div className="px-2 py-1 rounded shadow right-10">
                <Icon
                  aria-label={formatMessage({ defaultMessage: 'Map layers icon', id: 'A4FcXS' })}
                  icon={Layers}
                  className="inline-block w-4 h-4 mr-2.5"
                />
                <span className="text-sm text-gray-800">
                  <FormattedMessage defaultMessage="Map Layers" id="A8VNfu" />
                </span>
              </div>
            </div>
            <p>
              <FormattedMessage
                defaultMessage="To help you understand the context of each project, we provide a range of contextual layers. These layers are divided in three different groups, and you can only activate one layer per group in order to keep the legibility of the map. The layers are:"
                id="hRsu1I"
              />
            </p>
            <ul className="pl-5 mt-6 space-y-1 list-disc">
              <li>
                <FormattedMessage
                  defaultMessage="<n>Base layers:</n> Heco priority landscapes, Sub-basin boundaries, Protected areas;"
                  id="ZERB8x"
                  values={{
                    n: (chunk: string) => <span className="my-2 font-medium">{chunk}</span>,
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="<n>Contextual layers:</n> Biodiversity intactness, Tree biomass density, Wetlands, Population density;"
                  id="uzMeos"
                  values={{
                    n: (chunk: string) => <span className="my-2 font-medium">{chunk}</span>,
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="<n>Priority layers:</n> Endangered species and critical habitats, Tree cover loss, Riverine flood risk, Indigenous Reserves."
                  id="YXI1nH"
                  values={{
                    n: (chunk: string) => <span className="my-2 font-medium">{chunk}</span>,
                  }}
                />
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="mb-4 font-semibold">
              <FormattedMessage defaultMessage="Map controls" id="r3xohw" />
            </h2>
            <p>
              <FormattedMessage
                defaultMessage="The different controls will allow you too easily navigate on the map:"
                id="0tb6zN"
              />
            </p>
            <div className="flex items-center mt-3 gap-x-12">
              <div className="w-8 h-8 p-2 rounded shadow">
                <Icon
                  icon={Search}
                  className="w-4 h-4 mr-12"
                  aria-label={formatMessage({ defaultMessage: 'Search icon', id: 'i7V7mZ' })}
                />
              </div>
              <span className="text-sm">
                <FormattedMessage defaultMessage="Search a location on the map" id="+HRDx3" />
              </span>
            </div>
            <div className="flex items-center mt-3 gap-x-12">
              <div className="w-8 h-8 p-2 rounded rounded-b-none shadow">
                <Icon
                  aria-label={formatMessage({ defaultMessage: 'Zoom in icon', id: 'KPVqej' })}
                  icon={ZoomIn}
                  className="w-4 h-4 mr-12"
                />
              </div>
              <span className="text-sm">
                <FormattedMessage defaultMessage="Zoom In" id="KQ9L9d" />
              </span>
            </div>
            <div className="flex items-center mt-0.5 gap-x-12">
              <div className="w-8 h-8 p-2 rounded rounded-t-none shadow">
                <Icon
                  aria-label={formatMessage({ defaultMessage: 'Zoom out icon', id: '/cMb5f' })}
                  icon={ZoomOut}
                  className="w-4 h-4 mr-12"
                />
              </div>
              <span className="text-sm">
                <FormattedMessage defaultMessage="Zoom Out" id="uln7eT" />
              </span>
            </div>
          </div>
        </div>
        <div className="fixed right-0 w-full h-10 sm:h-14 bottom-16 sm:bottom-24 bg-fading"></div>
        <div className="fixed bottom-0 left-0 flex items-end justify-center w-full h-16 pb-4 bg-white sm:h-24 sm:pb-8">
          <Button onClick={() => setOpen(false)}>
            <FormattedMessage defaultMessage="Ok" id="jwimQJ" />
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MapHelp;
