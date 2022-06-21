import { IntlShape } from 'react-intl';

import { selectLoader, load, parse } from '@loaders.gl/core';
import { KMLLoader } from '@loaders.gl/kml';
import { Loader } from '@loaders.gl/loader-utils';
import { ShapefileLoader } from '@loaders.gl/shapefile';
import { ZipLoader } from '@loaders.gl/zip';
import {
  Feature,
  featureCollection,
  FeatureCollection,
  GeoJSONObject,
  Geometries,
} from '@turf/turf';

import { ValidGeometryType } from './types';

export const supportedFileformats = [
  ...KMLLoader.extensions,
  ...['kmz'],
  ...['shp', 'prj', 'shx', 'dbf', 'cfg'],
];

/**
 * Return the text content of a file
 * @param file File to read as text
 * @returns Text content of the file
 */
const readFileAsText = (file: File | ArrayBuffer): Promise<string> => {
  if (file instanceof ArrayBuffer) {
    return Promise.resolve(new TextDecoder().decode(file));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result as string);
    };

    reader.onerror = (e) => {
      reject(e);
    };

    reader.readAsText(file);
  });
};

/**
 * Validate a file and return an error message if it fails
 * @param file File to validate
 * @param loader Loader used to parse the file
 * @param intl Intl object for internationalization
 * @returns Error message if the validation fails
 */
export const validateFile = async (
  file: File | ArrayBuffer,
  loader: Loader,
  intl: IntlShape
): Promise<string | undefined> => {
  switch (loader) {
    case KMLLoader: {
      const errorMessage = intl.formatMessage({
        defaultMessage:
          'This .kml/.kmz file does not have a valid XML syntax. Please try to validate it and resolve the issues.',
        id: 'z3yOZn',
      });

      // For the KML files, we're checking whether they are valid XML files. For this, we verify:
      // 1. that we can parse them with `DOMParser`
      // 2. that they don't contain parse errors using the technique described in
      //    https://stackoverflow.com/a/20294226
      try {
        const xml = new DOMParser().parseFromString(await readFileAsText(file), 'text/xml');

        const xmlWithError = new DOMParser().parseFromString('invalid', 'text/xml');

        const parseErrorNS = xmlWithError.getElementsByTagName('parsererror')[0].namespaceURI;

        if (xml.getElementsByTagNameNS(parseErrorNS, 'parsererror').length > 0) {
          return errorMessage;
        }
      } catch (e) {
        return errorMessage;
      }
      return;
    }

    default:
      return;
  }
};

/**
 * Convert files to a GeoJSON
 * @param files Files to convert
 * @param intl Intl object for internationalization
 * @returns Error message if the convertion fails
 */
export async function convertFilesToGeojson(
  files: File[],
  intl: IntlShape
): Promise<Feature<ValidGeometryType>> {
  // If multiple files are uploaded and one of them is a ShapeFile, this is the one we pass to the
  // loader because it is the one `ShapefileLoader` expects (out of the .prj, .shx, etc. other
  // Shapefile-related files). If the user uploaded files of a different extension, we just take the
  // first one.
  let fileToParse: File | ArrayBuffer = files.find((f) => f.name.endsWith('.shp')) ?? files[0];

  let loader: Loader;

  // We check that we have all the mandatory files to process a ShapeFile
  if (
    (fileToParse.name.endsWith('.shp') ||
      fileToParse.name.endsWith('.shx') ||
      fileToParse.name.endsWith('.dbf') ||
      fileToParse.name.endsWith('.prj')) &&
    files.length < 3
  ) {
    return Promise.reject(
      intl.formatMessage({
        defaultMessage:
          'To upload a Shapefile geometry, you must upload the .shp, .shx, .dbf and eventually .prj files all at once.',
        id: 'ejuZC0',
      })
    );
  }

  if (fileToParse.name.endsWith('.kmz')) {
    // In most of the cases, a .kmz file is just a zipped .kml file, but it can still contains
    // multiple files
    const fileMap = await parse(fileToParse, ZipLoader);

    const kmlFileName = Object.keys(fileMap).find((name) => name.endsWith('.kml'));

    fileToParse = kmlFileName ? (fileMap[kmlFileName] as ArrayBuffer) : null;

    loader = KMLLoader;
  } else {
    try {
      loader = await selectLoader(fileToParse, [ShapefileLoader, KMLLoader]);
    } catch (e) {
      return Promise.reject(
        intl.formatMessage({
          defaultMessage: 'This file is not supported. Please try uploading a different format.',
          id: 'XO0Kon',
        })
      );
    }
  }

  if (!loader) {
    return Promise.reject(
      intl.formatMessage({
        defaultMessage: 'This file is not supported. Please try uploading a different format.',
        id: 'XO0Kon',
      })
    );
  }

  const validationError = await validateFile(fileToParse, loader, intl);
  if (validationError) {
    return Promise.reject(validationError);
  }

  let content;

  try {
    content = await load(fileToParse, loader, {
      gis: {
        format: 'geojson',
        // In case of Shapefile, if a .prj file is uploaded, we want to reproject the geometry
        reproject: true,
      },
      shp: {
        // Shapefiles can hold up to 4 dimensions (XYZM). By default all dimensions are parsed;
        // when set to 2 only the X and Y dimensions are parsed. If not set, the resulting geometry
        // will not match the GeoJSON Specification (RFC 7946) and Google Maps will crash.
        // See: https://datatracker.ietf.org/doc/html/rfc7946#appendix-A.2
        _maxDimensions: 2,
      },
      // By default, some loaders like `ShapefileLoader` will fetch the companion files (.prj, .shx,
      // etc.) relative to where the .shp file is located. Yet, they are not served by an external
      // server so we reroute loaders.gl to the files the user uploaded.
      fetch: async (url: string | File): Promise<Response> => {
        let file: File;

        if (typeof url === 'string') {
          const extension = url.split('.').pop();
          file = files.find((f) => f.name.toLowerCase().endsWith(extension.toLowerCase()));
        } else {
          file = url;
        }

        if (file) {
          return new Response(file);
        }

        return new Response(null, { status: 404 });
      },
    });
  } catch (e) {
    return Promise.reject(
      intl.formatMessage({
        defaultMessage: 'Unable to parse the file. Please try uploading a different format.',
        id: 'FN+0yY',
      })
    );
  }

  if (loader === ShapefileLoader) {
    content = content.data[0];
  }

  let cleanedGeoJSON: Feature<ValidGeometryType>;

  try {
    cleanedGeoJSON = cleanupGeoJSON(content);
  } catch (e) {
    return Promise.reject(
      intl.formatMessage({
        defaultMessage: 'Unable to parse the file. Please try uploading a different format.',
        id: 'FN+0yY',
      })
    );
  }

  return cleanedGeoJSON;
}

function cleanupGeoJSON(geoJSON: GeoJSONObject): Feature<ValidGeometryType> {
  let collection: FeatureCollection;
  if (geoJSON.type === 'Feature') {
    collection = featureCollection([geoJSON as Feature<Geometries, any>]);
  } else if (geoJSON.type === 'FeatureCollection') {
    collection = geoJSON as FeatureCollection<Geometries, any>;
  } else {
    return;
  }

  const features: Feature<ValidGeometryType>[] = collection.features.filter(
    (f) =>
      f.geometry?.type === 'MultiPolygon' ||
      f.geometry?.type === 'Polygon' ||
      f.geometry?.type === 'GeometryCollection'
  ) as Feature<ValidGeometryType>[];

  // NOTE: Only the first feature is imported
  const feature = features[0];
  if (!feature) {
    // No feature with polygon or multipolygon found in geojson
    throw new Error();
  }

  return feature;
}
