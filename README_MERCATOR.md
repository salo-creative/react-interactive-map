# Mercator Map

This map is an SVG mercator projection (the accuracy is not 100% but its pretty darn close!) of the globe. This allows us to plot latitude and longitudes directly on it. In order to keep the implementation straightforward and easy to customise this component simply exposes a render prop with the calculation required to perform the conversion for you. You can then position your child elements as you require based on the X & Y coordinates. If you need to simply handle countries and interaction at that level please see the SimpleMap implementation.

- Latitude and longitude conversion to % positioning for responsive maps markers
- SVG for crisp scaling
- Zoom functionality as required
- Point grouping
-------

## Usage

Install
```
yarn add @salocreative/interactive-map
```

Include
```javascript
import MercatorMap from '@salocreative/interactive-map';
```

### Basic implementation

As the component is only giving you a relative positioned container and then allowing you the flexibility to render what you need the possibile use cases are huge.

In order to calculate the position for you points on the map you can use the render prop `evalCoordinates`. This function takes an object of `{ lat: 0.00000, lon: 0.00000 }` as an argument and returns an object of `{ x: 50%, y: 50% }`. This means in your render you can pass in the lat and lon for your points and be given a % coordinate for positiong within the component (rember to account for your marker size).

The implementation in the [basic storybook](https://salocreative.github.io/react-interactive-map/?selectedKind=Mercator%20Map&selectedStory=Basic) is as follows. 

```javascript
const locations = object('Locations', [
  { name: 'LDN', lat: 51.5074, lon: -0.1278 },
  { name: 'NY', lat: 40.7128, lon: -74.0060 },
  { name: 'AUK', lat: -36.848, lon: 174.7633 },
  { name: 'AMS', lat: 52.3680, lon: 4.9036 },
  { name: 'CAT', lat: -33.9249, lon: 18.4241 },
  { name: 'PAN', lat: 8.5380, lon: -80.7821 },
  { name: 'RIO', lat: -22.9068, lon: -43.1729 }
]);
```

```javascript
<MercatorMap>
  { ({ evalCoordinates }) => locations.map(location => {
    const { lat, lon, name } = location;
    const coords = evalCoordinates({ lat, lon });
    return (
      <span
        key={ name }
        style={ {
          height: '6px',
          width: '6px',
          borderRadius: '50%',
          background: 'red',
          position: 'absolute',
          left: `calc(${ coords.x }% - 3px)`,
          top: `calc(${ coords.y }% - 3px)`
        } }
      />
    );
  }) }
</MercatorMap>
```

### Grouped points example

With larger data sets it may be necessary to group data points at lower zooms and then un-group as a user is zoomed in. 

To do this we have another function exposed as render prop of `groupPoints()`. This function takes two arguments, the first is your array of locations and the second is the radius for your grouping. Your locations array needs to be comprised of objects which needs to have at least the following fields:

- `lat: Float`
- `lon: Float`

The function will return you an array of grouped locations with x & y coords already calculated and a nested array of all ypur original points in the group in case you need to perform other operations on them e.g.

```javascript
// CALL
const groups = groupPoints(locations, 5);

// RESULT
[{
  lat: 0.0000, 
  lon: 0.0000, 
  x: '50%', 
  y: '50%',
  points: [
    // Your original data
  ]
}]

```

The implementation in the [grouped points storybook](https://salocreative.github.io/react-interactive-map/?selectedKind=Mercator%20Map&selectedStory=Grouped%20points) is as follows. 

```javascript
const locations = object('Locations', [
  { name: 'LDN', lat: 51.5074, lon: -0.1278 },
  { name: 'BIR', lat: 52.4862, lon: -1.8904 },
  { name: 'NY', lat: 40.7128, lon: -74.0060 },
  { name: 'AUK', lat: -36.848, lon: 174.7633 },
  { name: 'AMS', lat: 52.3680, lon: 4.9036 },
  { name: 'CAT', lat: -33.9249, lon: 18.4241 },
  { name: 'PAN', lat: 8.5380, lon: -80.7821 },
  { name: 'RIO', lat: -22.9068, lon: -43.1729 }
]);
```

```javascript
<MercatorMap>
  { ({ groupPoints }) => groupPoints(locations, radius).map(location => {
    const { x, y, lat, lon, points } = location;
    return (
      <span
        key={ `${ lat }-${ lon }` }
        style={ {
          height: '15px',
          width: '15px',
          borderRadius: '50%',
          background: 'red',
          position: 'absolute',
          left: `calc(${ x }% - 7.5px)`,
          top: `calc(${ y }% - 7.5px)`,
          color: '#fff',
          fontSize: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      } }
      >
        { points.length }
      </span>
    );
  }) }
</MercatorMap>
```

## API

**`hideAntarctica: Bool` -** Determine whether to show or hide antarctica.

**`baseColor: String` -** What colour the map regions should be

**`zoom: Float` -** factor the map should be zoomed in by. default is 1

**`center: Object` -** e.g `center={ { lat: 51.5074, lon: -0.1278 } }` where the map focus is and therefore zoom origin. The default is `0 0`. Prop takes a latitude and longitude and then calculates the coordinates for focus. At zoom 1 or lower the map will be centered on the screen

**`maxWidth: String` -** the maximum width the map can be