import { useMemo } from 'react';

import { useIntl } from 'react-intl';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

enum LAYER_GROUPS {
  BaseLayer = 'base-layer',
  ContextLayer = 'context-layer',
  PriorityLayer = 'priority-layer',
}

enum LAYERS {
  // BASE LAYERS
  HeCoMosaics = 'heco-mosaics',
  PoliticalBoundaries = 'political-boundaries',
  SubBasinBoundaries = 'sub-basin-boundaries',
  ProtectedAreas = 'protected-areas',
  // CONTEXT LAYERS
  BiodiversityIntactness = 'biodiversity-intactness',
  TreeBiomassIntensity = 'tree-biomass-density',
  Wetlands = 'wetlands',
  PopulationDensity = 'population-density',
  // PRIORITY LAYERS
  EndangeredSpecies = 'endangered-species',
  TreeCoverLoss = 'tree-cover-loss',
  // RiverineFloodRisk = 'riverine-flood-risk',
  IndigenousReserves = 'indigenous-reserves',
}

export const useLayers = () => {
  const intl = useIntl();

  const layerGroups = useMemo(
    () => [
      {
        id: LAYER_GROUPS.BaseLayer,
        name: intl.formatMessage({ defaultMessage: 'Base Layers', id: '9nYuln' }),
      },
      {
        id: LAYER_GROUPS.ContextLayer,
        name: intl.formatMessage({ defaultMessage: 'Context Layers', id: 'fIkMFK' }),
      },
      {
        id: LAYER_GROUPS.PriorityLayer,
        name: intl.formatMessage({ defaultMessage: 'Priority Layers', id: 'gpOeXW' }),
      },
    ],
    [intl]
  );

  const layers = useMemo(
    () =>
      [
        // BASE LAYERS
        {
          id: LAYERS.HeCoMosaics,
          group: LAYER_GROUPS.BaseLayer,
          name: intl.formatMessage({ defaultMessage: 'HeCo mosaics', id: 'W7un1n' }),
          description: null,
          specification: null,
        },
        {
          id: LAYERS.PoliticalBoundaries,
          group: LAYER_GROUPS.BaseLayer,
          name: intl.formatMessage({ defaultMessage: 'Political boundaries', id: 'Fm6QvT' }),
          description: null,
          specification: null,
        },
        {
          id: LAYERS.SubBasinBoundaries,
          group: LAYER_GROUPS.BaseLayer,
          name: intl.formatMessage({ defaultMessage: 'Sub-basin boundaries', id: 'WskbuL' }),
          description: intl.formatMessage({
            defaultMessage: 'Sub-basin boundaries of Colombia.',
            id: 'EmE3wV',
          }),
          specification: null,
        },
        {
          id: LAYERS.ProtectedAreas,
          group: LAYER_GROUPS.BaseLayer,
          name: intl.formatMessage({ defaultMessage: 'Protected areas', id: 'NUVSd2' }),
          description: null,
          specification: null,
        },
        // CONTEXT_LAYERS
        {
          id: LAYERS.BiodiversityIntactness,
          group: LAYER_GROUPS.ContextLayer,
          name: intl.formatMessage({ defaultMessage: 'Biodiversity intactness', id: 'Bt7PVr' }),
          description: intl.formatMessage({
            defaultMessage:
              'Displays the impacts of forest change on local biodiversity intactness.',
            id: 'MJuP2l',
          }),
          specification: null,
        },
        {
          id: LAYERS.TreeBiomassIntensity,
          group: LAYER_GROUPS.ContextLayer,
          name: intl.formatMessage({ defaultMessage: 'Tree biomass density', id: 'BSFsv6' }),
          description: intl.formatMessage({
            defaultMessage: 'Shows above ground live woody biomass density.',
            id: 'fvFVbs',
          }),
          specification: null,
        },
        {
          id: LAYERS.Wetlands,
          group: LAYER_GROUPS.ContextLayer,
          name: intl.formatMessage({ defaultMessage: 'Wetlands', id: 'xa6OiT' }),
          description: intl.formatMessage({
            defaultMessage: 'Shows the wetlands of Colombia.',
            id: 'XKK/dy',
          }),
          specification: null,
        },
        {
          id: LAYERS.PopulationDensity,
          group: LAYER_GROUPS.ContextLayer,
          name: intl.formatMessage({ defaultMessage: 'Population density', id: 'JBFQAB' }),
          description: intl.formatMessage({
            defaultMessage: 'Global estimate of human population density and distribution.',
            id: 'A8lXv/',
          }),
          specification: null,
        },
        // PRIORITY LAYERS
        {
          id: LAYERS.EndangeredSpecies,
          group: LAYER_GROUPS.PriorityLayer,
          name: intl.formatMessage({
            defaultMessage: 'Endangered species and critical habitats',
            id: 'PD6Q1A',
          }),
          description: intl.formatMessage({
            defaultMessage:
              'Displays the Key Biodiversity Areas containing 95% or more of the remaining population of one or more species listed as Endangered or Critically Endangered on the International Union for Conservation of Nature (IUCN) Red List of Threatened Species.',
            id: '6vrfSY',
          }),
          specification: null,
        },
        {
          id: LAYERS.TreeCoverLoss,
          group: LAYER_GROUPS.PriorityLayer,
          name: intl.formatMessage({
            defaultMessage: 'Tree cover loss',
            id: 'y8AKM4',
          }),
          description: intl.formatMessage({
            defaultMessage: 'Identifies areas of gross tree cover loss.',
            id: 'rw2/NH',
          }),
          specification: null,
        },
        /*
        {
          id: LAYERS.RiverineFloodRisk,
          group: LAYER_GROUPS.PriorityLayer,
          name: intl.formatMessage({
            defaultMessage: 'Riverine flood risk',
            id: 'deHJ3+',
          }),
          description: intl.formatMessage({
            defaultMessage:
              'Shows the percentage of the population expected to be affected by riverine flooding in an average year.',
            id: 'nwXvcg',
          }),
          specification: null,
        },
        */
        {
          id: LAYERS.IndigenousReserves,
          group: LAYER_GROUPS.PriorityLayer,
          name: intl.formatMessage({ defaultMessage: 'Indigenous Reserves', id: 'kN5g/0' }),
          description: intl.formatMessage({
            defaultMessage: 'Legalized Indigenous Reservations until the year 2021.',
            id: '1Qvlb5',
          }),
          specification: null,
        },
      ].map((layer) => ({
        ...layer,
        ...(layer.specification && { specification: { id: layer.id, ...layer.specification } }),
      })),
    [intl]
  );

  const groupedLayers = useMemo(
    () =>
      layerGroups.map(({ id, name }) => ({
        id,
        name,
        layers: layers.filter(({ group }) => group === id),
      })),
    [layerGroups, layers]
  );

  return {
    layers,
    groupedLayers,
  };
};
