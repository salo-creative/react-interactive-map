import { indexOf, isEmpty } from 'lodash';

/**
 * EVALUATE COORDINATES FROM LATITUDE & LONGITUDE
 *
 * @param {*} { lat, lon }
 * @returns
 */
export const evalCoordinates = ({ lat, lon }) => {
  // lat = N - S
  // lon = W - E
  let x = 0;
  let y = 0;
  const mapWidth = 1717;
  const mapHeight = 1291;
  // get x value
  x = ((((lon + 180) * (mapWidth / 360)) / mapWidth) * 100) - 2.75;
  // convert from degrees to radians
  const latRad = (lat * Math.PI) / 180;
  // get y value
  const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
  y = ((((mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI))) / mapHeight) * 100) - 0.85;
  return { x, y };
};

/**
 * EVALUATE CENTER OF AN ARRAY OF COORDINATES
 *
 * @param {*} { locations: [{ lat: Float, lon: Float }] }
 * @returns
 */
export const evalCenter = ({ locations }) => {
  if (isEmpty(locations)) return null;
  // Reduce lats and longs to get array of all location coords
  const aggData = locations.reduce((acc, item) => {
    return {
      lats: [...acc.lats, item.lat].sort(), // sort so they are in order
      lons: [...acc.lons, item.lon].sort()
    };
  }, { lats: [], lons: [] });
 
  const centerLat = (aggData.lats[0] + aggData.lats[aggData.lats.length - 1]) / 2; // take limits and calculate the range
  const centerLon = (aggData.lons[0] + aggData.lons[aggData.lons.length - 1]) / 2;

  return {
    lat: centerLat,
    lon: centerLon
  };
};

/**
 * GROUP LOCATIONS BY LATITUDE
 *
 * @param {*} { locations, radius = 5, zoom = 1 }
 * @returns
 */
export const groupPoints = ({ locations, radius = 5, zoom = 1 }) => {
  const mappedLocations = [];
  const latResolution = zoom ? ((radius / 2) / zoom) : 2.5;
  const lonResolution = zoom ? (radius / zoom) : 5;

  return locations.map(location => {
  // Check if location already grabbed as part of an
  // earlier grouping and only proceed if not grouped
    const alreadyMapped = indexOf(mappedLocations, location);

    if (alreadyMapped === -1) {
      mappedLocations.push(location);
      const groupedLocations = [location];
      const remainingLocations = locations.filter(item => indexOf(mappedLocations, item) === -1);
      remainingLocations.forEach(item => {
      // CHECK IF LOCATION COLLIDES WITH ANOTHER
        const latCollision = location.lat - item.lat < latResolution && location.lat - item.lat > -latResolution;
        const lonCollision = location.lon - item.lon < lonResolution && location.lon - item.lon > -lonResolution;
        if (latCollision && lonCollision) {
          // EXCLUDE FROM A LATER MAP AND STORE
          mappedLocations.push(item);
          groupedLocations.push(item);
        }
      });

      const { lat, lon } = evalCenter({ locations: groupedLocations });
      const { x, y } = evalCoordinates({ lat, lon });
      return {
        lat,
        lon,
        x,
        y,
        points: groupedLocations
      };
    }
    return null;
  }).filter(i => i);
};