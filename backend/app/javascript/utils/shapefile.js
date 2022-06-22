import { selectLoader, load, parse } from '@loaders.gl/core';
import { KMLLoader } from '@loaders.gl/kml';
import { ShapefileLoader } from '@loaders.gl/shapefile';
import { ZipLoader } from '@loaders.gl/zip';
import { featureCollection } from '@turf/turf';

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
const readFileAsText = (file) => {
  if (file instanceof ArrayBuffer) {
    return Promise.resolve(new TextDecoder().decode(file));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
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
 * @returns Error message if the validation fails
 */
export const validateFile = async (
  file,
  loader,
  messages
) => {
  switch (loader) {
    case KMLLoader: {
      const errorMessage = messages.not_valid_kml;

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
  * @returns Error message if the convertion fails
 */
export async function convertFilesToGeojson(files, messages) {
  // If multiple files are uploaded and one of them is a ShapeFile, this is the one we pass to the
  // loader because it is the one `ShapefileLoader` expects (out of the .prj, .shx, etc. other
  // Shapefile-related files). If the user uploaded files of a different extension, we just take the
  // first one.
  let fileToParse = files.find((f) => f.name.endsWith('.shp')) ?? files[0];

  let loader;

  if (fileToParse.name.endsWith('.kmz')) {
    // In most of the cases, a .kmz file is just a zipped .kml file, but it can still contains
    // multiple files
    const fileMap = await parse(fileToParse, ZipLoader);

    const kmlFileName = Object.keys(fileMap).find((name) => name.endsWith('.kml'));

    fileToParse = kmlFileName ? fileMap[kmlFileName] : null;

    loader = KMLLoader;
  } else if (fileToParse.name.endsWith('.zip')) {
    const fileMap = await parse(fileToParse, ZipLoader);

    const shpFileName = Object.keys(fileMap).find((name) => name.endsWith('.shp'));
    fileToParse = shpFileName ? fileMap[shpFileName] : null;
    files = Object.keys(fileMap).map((filename) => {
      if (!(fileMap[filename] instanceof ArrayBuffer)) return null;
      const blob = new Blob([fileMap[filename]]);
      return new File([blob], filename);
    }).filter(x => x);

    if (fileToParse) {
      loader = ShapefileLoader;
    }
  } else {
    loader = await selectLoader(fileToParse, [ShapefileLoader, KMLLoader]);
  }

  if (!loader) {
    return Promise.reject(messages.not_supported);
  }

  const validationError = await validateFile(fileToParse, loader, messages);
  if (validationError) {
    return Promise.reject(validationError);
  }

  let content;
  let errorMessage = messages.unable_to_parse;

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
      fetch: async (url) => {
        let file;

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
    console.error(e);
    return Promise.reject(errorMessage);
  }

  if (loader === ShapefileLoader) {
    content = content.data[0];
  }

  let cleanedGeoJSON;

  try {
    cleanedGeoJSON = cleanupGeoJSON(content);
  } catch (e) {
    console.error(e);
    return Promise.reject(errorMessage);
  }

  return cleanedGeoJSON;
}

function cleanupGeoJSON(geoJSON) {
  let collection;
  if (geoJSON.type === 'Feature') {
    collection = featureCollection([geoJSON]);
  } else if (geoJSON.type === 'FeatureCollection') {
    collection = geoJSON;
  } else {
    return;
  }

  const features = collection.features.filter(
    (f) =>
      f.geometry?.type === 'MultiPolygon' ||
      f.geometry?.type === 'Polygon' ||
      f.geometry?.type === 'GeometryCollection'
  );

  // NOTE: Only the first feature is imported
  const feature = features[0];
  if (!feature) {
    // No feature with polygon or multipolygon found in geojson
    throw new Error();
  }

  return feature;
}
