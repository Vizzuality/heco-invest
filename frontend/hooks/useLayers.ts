import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { TileLayer } from '@deck.gl/geo-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import GL from '@luma.gl/constants';
import { DecodedLayer } from '@vizzuality/layer-manager-layers-deckgl';

export enum LAYER_GROUPS {
  BaseLayer = 'base-layer',
  ContextLayer = 'context-layer',
  PriorityLayer = 'priority-layer',
}

export enum LAYERS {
  // BASE LAYERS
  HeCoMosaics = 'heco-mosaics',
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
  RiverineFloodRisk = 'riverine-flood-risk',
  IndigenousReserves = 'indigenous-reserves',
}

export const useLayers = () => {
  const { formatMessage } = useIntl();

  const layerGroups = useMemo(
    () => [
      {
        id: LAYER_GROUPS.BaseLayer,
        name: formatMessage({ defaultMessage: 'Base Layers', id: '9nYuln' }),
      },
      {
        id: LAYER_GROUPS.ContextLayer,
        name: formatMessage({ defaultMessage: 'Contextual Layers', id: 'EKOV4Z' }),
      },
      {
        id: LAYER_GROUPS.PriorityLayer,
        name: formatMessage({ defaultMessage: 'Priority Layers', id: 'gpOeXW' }),
      },
    ],
    [formatMessage]
  );

  const layers = useMemo(
    () =>
      [
        // BASE LAYERS
        {
          id: LAYERS.HeCoMosaics,
          group: LAYER_GROUPS.BaseLayer,
          name: formatMessage({ defaultMessage: 'HeCo priority landscapes', id: 'X+46wB' }),
          description: formatMessage({
            defaultMessage: 'Heritage Colombia priority landscapes',
            id: '5N2nPU',
          }),
          overview: formatMessage({
            defaultMessage: 'Displays the areas prioritized for Goal 3 of Heritage Colombia',
            id: '9Lv5em',
          }),
          dataSource: 'Ministerio de Medio Ambiente y Desarrollo Sostenible de Colombia',
          dataSourceUrl: 'https://www.minambiente.gov.co/herencia-colombia/',
          legend: {
            type: 'monocolor',
            items: [{ color: '#3d6c50' }],
          },
          specification: {
            type: 'vector',
            source: {
              url: 'mapbox://leticiaheco.4c9sot08',
            },
            render: {
              layers: [
                {
                  id: 'mosaics-updated',
                  type: 'fill',
                  paint: {
                    'fill-color': [
                      'match',
                      ['get', 'mosaico'],
                      [
                        'Orinoquía',
                        'Cordillera Central',
                        'Corazón Amazonía',
                        'Piedemonte Amazónico - Macizo',
                        'Pacífico - Marino Costero',
                        'Caribe',
                        'Cordillera Oriental',
                        'Transición Pacífico - Caribe',
                        'Transición Orinoquía',
                      ],
                      'rgba(206, 214, 97, 0.5)',
                      '',
                      'hsl(64, 59%, 61%)',
                      'hsla(106, 80%, 22%, 0)',
                    ],
                    'fill-outline-color': '#326247',
                  },
                  source: 'composite',
                  'source-layer': 'mosaics_demand_new-7t4sbe',
                },
                // {
                //   paint: {
                //     'line-color': 'hsl(94, 35%, 33%)',
                //     'line-width': [
                //       'interpolate',
                //       ['linear'],
                //       ['zoom'],
                //       0,
                //       0.5,
                //       4.03,
                //       0.5,
                //       8.26,
                //       1,
                //       22,
                //       1,
                //     ],
                //   },
                //   layout: {
                //     'line-cap': 'round',
                //     'line-join': 'round',
                //     'line-round-limit': ['interpolate', ['linear'], ['zoom'], 0, 1, 22, 1],
                //     visibility: 'none',
                //   },
                //   'source-layer': 'Mosaics',
                //   type: 'line',
                // },
                // {
                //   layout: {
                //     'text-field': ['to-string', ['get', 'mosaico']],
                //     'text-font': ['Work Sans Medium', 'Arial Unicode MS Regular'],
                //     'text-transform': 'uppercase',
                //     'text-size': 10,
                //     'text-letter-spacing': 0.1,
                //     'text-offset': [0.3, 0],
                //     'text-radial-offset': 0.4,
                //     visibility: 'none',
                //   },
                //   metadata: {
                //     'mapbox:group': '3023c5604894e6920a7f7da208a21b27',
                //   },
                //   type: 'symbol',
                //   source: 'composite',
                //   paint: {
                //     'text-halo-color': 'hsl(0, 7%, 91%)',
                //     'text-halo-width': 0.3,
                //     'text-color': '#517237',
                //     'text-halo-blur': 2,
                //   },
                //   'source-layer': 'Mosaics',
                // },
              ],
            },
          },
        },
        {
          id: LAYERS.SubBasinBoundaries,
          group: LAYER_GROUPS.BaseLayer,
          name: formatMessage({ defaultMessage: 'Sub-basin boundaries', id: 'WskbuL' }),
          description: formatMessage({
            defaultMessage: 'Sub-basin boundaries of Colombia.',
            id: 'EmE3wV',
          }),
          overview: formatMessage({
            defaultMessage:
              'The dataset represents a series of vectorized polygon layers that depict sub-basin boundaries at a global scale. An important characteristic of any sub-basin delineation is the sub-basin breakdown. At its highest level of sub-basin breakdown, each basin has been divided into two sub-basins at every location where two river branches meet which each have an individual upstream area of at least 100 km². A second critical feature of sub-basin delineations is the way the sub-basins are grouped or coded to allow for the creation of nested sub-basins at different scales, or to navigate within the sub-basin network from up- to downstream. To support these functionalities and topological concepts, the ‘Pfafstetter’ coding system has been implemented, offering 12 hierarchically nested sub-basin breakdowns globally.',
            id: 'Y2HapG',
          }),
          dataSource: 'HydroSHEDS',
          dataSourceUrl: 'https://www.hydrosheds.org/products/hydrobasins#downloads',
          legend: {
            type: 'monocolor',
            items: [{ color: '#2485bc' }],
          },
          specification: {
            type: 'vector',
            source: {
              url: 'mapbox://leticiaheco.77lko5p2',
            },
            render: {
              layers: [
                {
                  paint: {
                    'line-color': 'hsl(202, 68%, 44%)',
                  },
                  'source-layer': 'Basins',
                  type: 'line',
                },
              ],
            },
          },
        },
        {
          id: LAYERS.ProtectedAreas,
          group: LAYER_GROUPS.BaseLayer,
          name: formatMessage({ defaultMessage: 'Protected areas', id: 'NUVSd2' }),
          description: formatMessage({
            defaultMessage: 'Protected areas of Colombia',
            id: 'q18ubl',
          }),
          overview: formatMessage({
            defaultMessage:
              'Displays the protected areas signed into the RUNAP (Unique Registry of Protected Areas) of Colombia',
            id: 'kTXMXN',
          }),
          dataSource: 'Parques Nacionales Naturales de Colombia',
          dataSourceUrl: 'https://runap.parquesnacionales.gov.co/cifras',
          legend: {
            type: 'monocolor',
            items: [{ color: '#bafdd1', opacity: 0.7 }],
          },
          specification: {
            type: 'vector',
            source: {
              url: 'mapbox://leticiaheco.3cokqqf5',
            },
            render: {
              layers: [
                {
                  paint: {
                    'fill-color': 'hsla(141, 94%, 86%, 0.7)',
                    'fill-outline-color': 'hsl(141, 20%, 56%)',
                  },
                  'source-layer': 'Protected',
                  type: 'fill',
                },
              ],
            },
          },
        },
        // CONTEXT_LAYERS
        {
          id: LAYERS.BiodiversityIntactness,
          group: LAYER_GROUPS.ContextLayer,
          name: formatMessage({ defaultMessage: 'Biodiversity intactness', id: 'Bt7PVr' }),
          description: formatMessage({
            defaultMessage:
              'Displays the impacts of forest change on local biodiversity intactness.',
            id: 'MJuP2l',
          }),
          overview: formatMessage({
            defaultMessage:
              'This layer quantifies the impact humans have had on the intactness of species communities. Anthropogenic pressures such as land use conversion have caused dramatic changes to the composition of species communities and this layer illustrates these changes by focusing on the impact of forest change on biodiversity intactness. The maximum value indicates no human impact, while lower values indicate that intactness has been reduced. The Projecting Responses of Ecological Diversity in Changing Terrestrial Systems (PREDICTS) database comprises over 3 million records of geographically and taxonomically representative data of land use impacts to local biodiversity (Hudson et al. 2017). A subset of the PREDICTS database, including data pertaining to forested biomes only, is employed to model the impacts of land use change and human population density on the intactness of local species communities. To produce the land use map, all forested biomes are selected and each 30 x 30 m pixel within the biome is assigned a land use category based upon inputs from the Global Forest Watch forest change database and a downscaled land use map (Hoskins et al 2016). The modelled results of biodiversity intactness derived from the PREDICTS database are projected onto the land use and human population density maps, and the final product is aggregated to match the resolution of the downscaled land use map (Hoskins et al 2016). The final output models the impacts of forest change on local biodiversity intactness within forested biomes.',
            id: 'TKNxLV',
          }),
          dataSource:
            'United Nations Environment World Conservation Monitoring Centre (UNEP-WCMC) and Natural History Museum',
          dataSourceUrl: 'https://data.nhm.ac.uk/',
          legend: {
            type: 'gradient',
            items: [
              { label: formatMessage({ defaultMessage: 'Low', id: '477I0g' }), color: '#F8EBFF' },
              { label: '', color: '#ECCAFC' },
              { label: '', color: '#DFA4FF' },
              { label: '', color: '#C26DFE' },
              { label: '', color: '#9D36F7' },
              { label: '', color: '#6D00E1' },
              { label: formatMessage({ defaultMessage: 'High', id: 'AxMhQr' }), color: '#3C00AB' },
            ],
          },
          isResourceWatch: true,
          specification: {
            type: 'raster',
            source: {
              type: 'raster',
              tiles: [
                'https://tiles.globalforestwatch.org/birdlife_biodiversity_intactness/v201909/default/{z}/{x}/{y}.png',
              ],
            },
          },
        },
        {
          id: LAYERS.TreeBiomassIntensity,
          group: LAYER_GROUPS.ContextLayer,
          name: formatMessage({ defaultMessage: 'Tree biomass density', id: 'BSFsv6' }),
          description: formatMessage({
            defaultMessage: 'Shows above ground live woody biomass density.',
            id: 'fvFVbs',
          }),
          overview: formatMessage({
            defaultMessage:
              'This is a global, wall-to-wall map of aboveground biomass (AGB) at approximately 30-meter resolution. This data product expands on the methodology presented in Baccini et al. (2012) to generate a global map of aboveground live woody biomass (AGB) density (megagrams biomass per ha) at 0.00025-degree (approximately 30-meter) resolution for the year 2000. Aboveground biomass was estimated using a multi-step process of calculating AGB at more than seven hundred thousand points with LiDAR with regional allometric equations, then using those to train a wall-to-wall model based on Landsat imagery. Pixels without tree canopy were assigned a biomass density of 0 Mg/ha.',
            id: 'jvb6yi',
          }),
          dataSource: 'Global Forest Watch',
          dataSourceUrl:
            'https://data.globalforestwatch.org/datasets/aboveground-live-woody-biomass-density',
          legend: {
            type: 'gradient',
            items: [
              { color: '#895122', label: '0' },
              { color: '#957F4F', label: '' },
              { color: '#9DB38A', label: '' },
              { color: '#39A401', label: '480 t Ha⁻¹' },
            ],
          },
          isResourceWatch: true,
          specification: {
            type: 'deck',
            source: {
              parse: false,
            },
            render: {
              parse: false,
            },
            deck: [
              new MapboxLayer({
                id: 'tree-biomass-density',
                type: TileLayer,
                data: 'https://storage.googleapis.com/wri-public/biomass/global/2017/v2/30/{z}/{x}/{y}.png',
                tileSize: 256,
                visible: true,
                refinementStrategy: 'no-overlap',
                renderSubLayers: ({ id: subLayerId, data, tile, visible, opacity }) => {
                  const {
                    zoom,
                    bbox: { west, south, east, north },
                  } = tile;

                  if (data) {
                    return new DecodedLayer({
                      id: subLayerId,
                      image: data,
                      bounds: [west, south, east, north],
                      textureParameters: {
                        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
                        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
                        [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
                        [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
                      },
                      zoom,
                      visible,
                      opacity,
                      decodeParams: {
                        threshold: 30,
                      },
                      decodeFunction: `
                        float intensity = color.b * 255.;
                        color.r = (255. - intensity) / 255.;
                        color.g = 128. / 255.;
                        color.b = 0.;
                        alpha = intensity / 255.;
                      `,
                    });
                  }

                  return null;
                },
              }),
            ],
          },
        },
        {
          id: LAYERS.Wetlands,
          group: LAYER_GROUPS.ContextLayer,
          name: formatMessage({ defaultMessage: 'Wetlands', id: 'xa6OiT' }),
          description: formatMessage({
            defaultMessage: 'National Wetlands Map of Colombia',
            id: 'GgNMmS',
          }),
          overview: formatMessage({
            defaultMessage:
              'This layer shows the permanent and temporal wetlands of Colombia at a 1:100.000 resolution',
            id: 'LxeDPc',
          }),
          dataSource: 'Sistema de Información Ambiental de Colombia - SIAC',
          dataSourceUrl:
            'https://siac-datosabiertos-mads.hub.arcgis.com/datasets/a499da66b2814db48888343283b57cdb/about',
          legend: {
            type: 'monocolor',
            items: [{ color: '#0d9dc9', opacity: 0.6 }],
          },
          specification: {
            type: 'vector',
            source: {
              url: 'mapbox://leticiaheco.1r3bnjgc',
            },
            render: {
              layers: [
                {
                  paint: {
                    'fill-color': 'hsla(194, 88%, 42%, 0.6)',
                    'fill-outline-color': 'hsla(0, 0%, 0%, 0)',
                  },
                  'source-layer': 'Wetlands',
                  type: 'fill',
                },
              ],
            },
          },
        },
        {
          id: LAYERS.PopulationDensity,
          group: LAYER_GROUPS.ContextLayer,
          name: formatMessage({ defaultMessage: 'Population density', id: 'JBFQAB' }),
          description: formatMessage({
            defaultMessage: 'Global estimate of human population density and distribution.',
            id: 'A8lXv/',
          }),
          legend: {
            items: [
              { color: '#32095D', label: '≤25' },
              { color: '#781C6D', label: '≤100' },
              { color: '#BA3655', label: '≤1k' },
              { color: '#ED6825', label: '≤5k' },
              { color: '#FBB318', label: '≤10k' },
              { color: '#FCFEA4', label: '>10k' },
            ],
            type: 'choropleth',
          },
          isResourceWatch: true,
          overview: [
            formatMessage({
              defaultMessage:
                'The Global Human Settlement Layer (GHSL) Population Grid depicts the distribution and density of population, expressed as the number of people per cell, for 2015. While we show only 2015 data, the GHSL is a multi-temporal population data set that employs new spatial data mining technologies. These methods enable the automatic processing and extraction of analytics and knowledge from different data sets: global, fine-scale satellite image data streams, census data, and crowd sources or volunteered geographic information sources.',
              id: 'CK3jus',
            }),
            formatMessage({
              defaultMessage:
                'To produce this population density and distribution data set, researchers mapped global built-up areas, which are defined as all above ground constructions intended for human or animal sheltering or to produce economic goods. The locations of these built up areas was established using Landsat imagery analysis. An additional source used to compile this data set was the Gridded Population of the World (GPW) data set assembled by the Center for International Earth Science Information Network (CIESIN). The GPW data set consists of census population data and bolstered the built-up areas data by enabling researchers to estimate residential population. To present this data as grid cells, GPW data was disaggregated from census or administrative units.',
              id: 'dKiARI',
            }),
          ],
          dataSource:
            'European Commission, Joint Research Centre (JRC); Columbia University, Center for International Earth Science Information Network - CIESIN',
          dataSourceUrl: 'https://data.jrc.ec.europa.eu/dataset/jrc-ghsl-ghs_pop_gpw4_globe_r2015a',
          specification: {
            type: 'raster',
            source: {
              type: 'raster',
              tiles: [
                'https://api.resourcewatch.org/v1/layer/24aaef77-3cee-4bdd-b6c9-2f5ab147db7d/tile/gee/{z}/{x}/{y}',
              ],
            },
          },
        },
        // PRIORITY LAYERS
        {
          id: LAYERS.EndangeredSpecies,
          group: LAYER_GROUPS.PriorityLayer,
          name: formatMessage({
            defaultMessage: 'Endangered species and critical habitats',
            id: 'PD6Q1A',
          }),
          description: formatMessage({
            defaultMessage:
              'Displays the Key Biodiversity Areas containing 95% or more of the remaining population of one or more species listed as Endangered or Critically Endangered on the International Union for Conservation of Nature (IUCN) Red List of Threatened Species.',
            id: '6vrfSY',
          }),
          overview: [
            formatMessage({
              defaultMessage:
                'The dataset represents the boundaries of sites containing 95% or more of the remaining population of one or more species listed as Endangered or Critically Endangered on the International Union for Conservation of Nature (IUCN) Red List of Threatened Species.',
              id: 'TYrWO2',
            }),
            formatMessage({
              defaultMessage:
                'The Alliance for Zero Extinction (AZE) originally created this dataset with a goal to prevent extinctions by identifying and safeguarding key sites. The 2019 March version of this dataset contains 859 sites, supporting 1483 Critically Endangered or Endangered species.',
              id: 'tgYyOu',
            }),
          ],
          dataSource: 'Alliance for Zero Extinctions (AZE)',
          legend: {
            type: 'monocolor',
            items: [{ color: '#b2d26e' }],
          },
          isResourceWatch: true,
          dataSourceUrl: 'https://www.keybiodiversityareas.org/kba-data/request',
          specification: {
            type: 'vector',
            source: {
              type: 'vector',
              provider: {
                type: 'carto',
                account: 'wri-rw',
                layers: [
                  {
                    options: {
                      type: 'cartodb',
                      sql: 'SELECT * FROM bio_001_endangered_species_critical_habitats',
                    },
                  },
                ],
              },
            },
            render: {
              layers: [
                {
                  'source-layer': 'layer0',
                  type: 'line',
                  filter: ['all'],
                  paint: {
                    'line-width': 0.5,
                    'line-color': '#FFF',
                    'line-opacity': 1,
                  },
                },
                {
                  'source-layer': 'layer0',
                  type: 'fill',
                  filter: ['all'],
                  paint: {
                    'fill-color': ' #b2d26e',
                    'fill-opacity': 1,
                  },
                },
              ],
            },
          },
        },
        {
          id: LAYERS.TreeCoverLoss,
          group: LAYER_GROUPS.PriorityLayer,
          name: formatMessage({
            defaultMessage: 'Tree cover loss',
            id: 'y8AKM4',
          }),
          description: formatMessage({
            defaultMessage: 'Identifies areas of gross tree cover loss.',
            id: 'rw2/NH',
          }),
          overview: [
            formatMessage({
              defaultMessage:
                'This data set, a collaboration between the Global Land Analysis & Discovery (GLAD) lab at the University of Maryland, Google, USGS, and NASA, measures areas of tree cover loss across all global land (except Antarctica and other Arctic islands) at approximately 30 × 30 meter resolution. The data were generated using multispectral satellite imagery from the Landsat 5 thematic mapper (TM), the Landsat 7 thematic mapper plus (ETM+), and the Landsat 8 Operational Land Imager (OLI) sensors. Over 1 million satellite images were processed and analyzed, including over 600,000 Landsat 7 images for the 2000-2012 interval, and more than 400,000 Landsat 5, 7, and 8 images for updates for the 2011-2021 interval. The clear land surface observations in the satellite images were assembled and a supervised learning algorithm was applied to identify per pixel tree cover loss.',
              id: 'eE6uKi',
            }),
            formatMessage({
              defaultMessage:
                'In this data set, “tree cover” is defined as all vegetation greater than 5 meters in height, and may take the form of natural forests or plantations across a range of canopy densities. Tree cover loss is defined as “stand replacement disturbance,” or the complete removal of tree cover canopy at the Landsat pixel scale. Tree cover loss may be the result of human activities, including forestry practices such as timber harvesting or deforestation (the conversion of natural forest to other land uses), as well as natural causes such as disease or storm damage. Fire is another widespread cause of tree cover loss, and can be either natural or human-induced.',
              id: 'keWpuD',
            }),
          ],
          dataSource: 'Hansen/UMD/Google/USGS/NASA',
          dataSourceUrl: 'https://glad.earthengine.app/view/global-forest-change',
          legend: {
            type: 'monocolor',
            items: [{ color: '#dc6c9a' }],
          },
          isResourceWatch: true,
          specification: {
            type: 'deck',
            source: {
              parse: false,
            },
            render: {
              parse: false,
            },
            deck: [
              new MapboxLayer({
                id: 'tree-cover-loss',
                type: TileLayer,
                data: 'https://tiles.globalforestwatch.org/umd_tree_cover_loss/v1.8/tcd_30/{z}/{x}/{y}.png',
                tileSize: 256,
                visible: true,
                refinementStrategy: 'no-overlap',
                renderSubLayers: ({ id: subLayerId, data, tile, visible, opacity }) => {
                  const {
                    zoom,
                    bbox: { west, south, east, north },
                  } = tile;

                  if (data) {
                    return new DecodedLayer({
                      id: subLayerId,
                      image: data,
                      bounds: [west, south, east, north],
                      textureParameters: {
                        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
                        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
                        [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
                        [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
                      },
                      zoom,
                      visible,
                      opacity,
                      decodeParams: {
                        startYear: 2001,
                        endYear: new Date().getFullYear(),
                      },
                      decodeFunction: `
                        // values for creating power scale, domain (input), and range (output)
                        float domainMin = 0.;
                        float domainMax = 255.;
                        float rangeMin = 0.;
                        float rangeMax = 255.;
                        float exponent = zoom < 13. ? 0.3 + (zoom - 3.) / 20. : 1.;
                        float intensity = color.r * 255.;
                        // get the min, max, and current values on the power scale
                        float minPow = pow(domainMin, exponent - domainMin);
                        float maxPow = pow(domainMax, exponent);
                        float currentPow = pow(intensity, exponent);
                        // get intensity value mapped to range
                        float scaleIntensity = ((currentPow - minPow) / (maxPow - minPow) * (rangeMax - rangeMin)) + rangeMin;
                        // a value between 0 and 255
                        alpha = zoom < 13. ? scaleIntensity / 255. : color.g;
                        float year = 2000.0 + (color.b * 255.);
                        // map to years
                        if (year >= startYear && year <= endYear && year >= 2001.) {
                          color.r = 220. / 255.;
                          color.g = (72. - zoom + 102. - 3. * scaleIntensity / zoom) / 255.;
                          color.b = (33. - zoom + 153. - intensity / zoom) / 255.;
                        } else {
                          alpha = 0.;
                        }
                      `,
                    });
                  }

                  return null;
                },
              }),
            ],
          },
        },
        {
          id: LAYERS.RiverineFloodRisk,
          group: LAYER_GROUPS.PriorityLayer,
          name: formatMessage({
            defaultMessage: 'Riverine flood risk',
            id: 'deHJ3+',
          }),
          description: formatMessage({
            defaultMessage:
              'Shows the percentage of the population expected to be affected by riverine flooding in an average year.',
            id: 'nwXvcg',
          }),
          overview: formatMessage({
            defaultMessage:
              'Riverine flood risk measures the percentage of population expected to be affected by Riverine flooding in an average year, accounting for existing flood-protection standards. Flood risk is assessed using hazard (inundation caused by river overflow), exposure (population in flood zone), and vulnerability. The existing level of flood protection is also incorporated into the risk calculation. It is important to note that this indicator represents flood risk not in terms of maximum possible impact but rather as average annual impact. The impacts from infrequent, extreme flood years are averaged with more common, less newsworthy flood years to produce the “expected annual affected population.” Higher values indicate that a greater proportion of the population is expected to be impacted by Riverine floods on average.',
            id: 'ItUshV',
          }),
          dataSource: 'World Resources Institute',
          legend: {
            items: [
              {
                color: '#990000',
                label: formatMessage({ defaultMessage: 'Extremely high', id: 'q9Rhsk' }),
              },
              { color: '#FF1900', label: formatMessage({ defaultMessage: 'High', id: 'AxMhQr' }) },
              {
                color: '#FF9900',
                label: formatMessage({ defaultMessage: 'Medium to high', id: 'VjcEkC' }),
              },
              {
                color: '#FFE600',
                label: formatMessage({ defaultMessage: 'Low to medium', id: 'w9SaaR' }),
              },
              { color: '#FFFF99', label: formatMessage({ defaultMessage: 'Low', id: '477I0g' }) },
              {
                color: '#808080',
                label: formatMessage({ defaultMessage: 'Arid & low water use', id: 'v5SfUh' }),
              },
              {
                color: '#4E4E4E',
                label: formatMessage({ defaultMessage: 'No data', id: 'UG5qoS' }),
              },
            ],
            type: 'basic',
          },
          isResourceWatch: true,
          dataSourceUrl: 'https://www.wri.org/data/aqueduct-global-maps-30-data',
          specification: {
            type: 'vector',
            source: {
              type: 'vector',
              provider: {
                type: 'carto',
                account: 'wri-rw',
                layers: [
                  {
                    type: 'cartodb',
                    options: {
                      sql: "SELECT s.aq30_id as cartodb_id, coalesce(NULLIF(rfr_label,''), 'No Data') as label, r.the_geom, r.the_geom_webmercator, (CASE WHEN rfr_label = 'Insignificant Trend' THEN -1 ELSE coalesce(rfr_cat, -9999)END) as water_risk FROM water_risk_indicators_annual s LEFT JOIN y2018m12d06_rh_master_shape_v01 r on s.aq30_id=r.aq30_id WHERE s.pfaf_id != -9999 and s.gid_1 != '-9999' and r.aqid != -9999 ORDER BY s.aq30_id",
                      cartocss:
                        '#water_risk_indicators_annual [water_risk=4] { polygon-fill:#990000; line-color:#990000 } #water_risk_indicators_annual [water_risk=3] { polygon-fill:  #FF1900; line-color:  #FF1900 } #water_risk_indicators_annual [water_risk=2] { polygon-fill: #FF9900; line-color: #FF9900 } #water_risk_indicators_annual [water_risk=1] { polygon-fill: #FFE600; line-color:  #FFE600 } #water_risk_indicators_annual [water_risk=0] { polygon-fill: #FFFF99; line-color:  #FFFF99 } #water_risk_indicators_annual [water_risk=-1] { polygon-fill: #808080; line-color:  #808080 } #water_risk_indicators_annual [water_risk<-1] { polygon-fill: #4E4E4E; line-color:  #4E4E4E }',
                      cartocss_version: '2.3.0',
                    },
                  },
                ],
              },
            },
            render: {
              layers: [
                {
                  'source-layer': 'layer0',
                  type: 'fill',
                  filter: ['all'],
                  paint: {
                    'fill-opacity': 0.7,
                    'fill-color': [
                      'step',
                      ['get', 'water_risk'],
                      '#4E4E4E',
                      -1,
                      '#808080',
                      0,
                      '#FFFF99',
                      1,
                      '#FFE600',
                      2,
                      '#FF9900',
                      3,
                      '#FF1900',
                      4,
                      '#990000',
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          id: LAYERS.IndigenousReserves,
          group: LAYER_GROUPS.PriorityLayer,
          name: formatMessage({ defaultMessage: 'Indigenous Reserves', id: 'kN5g/0' }),
          description: formatMessage({
            defaultMessage: 'Legalized Indigenous Reservations until the year 2021.',
            id: '1Qvlb5',
          }),
          overview: formatMessage({
            defaultMessage:
              'Indigenous Reservations are understood as a socio-political legal institution of colonial origin, made up of a recognized territory of a community of Amerindian descent, with inalienable, collective or community property title, governed by a special autonomous statute, with its own cultural guidelines and traditions.',
            id: 'yer18A',
          }),
          dataSource: 'Agencia Nacional de Tierras',
          dataSourceUrl:
            'https://data-agenciadetierras.opendata.arcgis.com/datasets/agenciadetierras::resguardos-ind%C3%ADgenas-1/about',
          legend: {
            type: 'monocolor',
            items: [{ color: '#ffb780', opacity: 0.7 }],
          },
          specification: {
            type: 'vector',
            source: {
              url: 'mapbox://leticiaheco.99uihxi8',
            },
            render: {
              layers: [
                {
                  paint: {
                    'fill-color': 'hsla(26, 100%, 75%, 0.7)',
                    'fill-outline-color': '#b96f37',
                  },
                  'source-layer': 'Reserves',
                  type: 'fill',
                },
                {
                  paint: {
                    'line-color': 'hsl(37, 59%, 64%)',
                    'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.5, 8, 1],
                  },
                  layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                    'line-round-limit': 1,
                    visibility: 'none',
                  },
                  'source-layer': 'Reserves',
                  type: 'line',
                },
              ],
            },
          },
        },
      ].map((layer) => ({
        ...layer,
        specification: {
          id: layer.id,
          ...layer.specification,
        },
      })),
    [formatMessage]
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
