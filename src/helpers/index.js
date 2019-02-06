import { indexOf } from 'lodash';

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
 * CALCULATE GROUPED POINTS CENTER
 *
 * @param {*} group
 * @returns
 */
const calculateGroupPosition = (group) => {
  const lat = group.reduce((acc, item) => acc + item.lat, 0) / group.length;
  const lon = group.reduce((acc, item) => acc + item.lon, 0) / group.length;
  return { lat, lon };
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

      const { lat, lon } = calculateGroupPosition(groupedLocations);
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