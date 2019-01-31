# Mercator Map

This map is an SVG mercator projection (the accuracy is not 100% but its pretty darn close!) of the globe. This allows us to plot latitude and longitudes directly on it. In order to keep the implementation straightforward and easy to customise this component simply exposes a render prop with the calculation required to perform the conversion for you. You can then position your child elements as you require based on the X & Y coordinates. If you need to simply handle countries and interaction at that level please see the SimpleMap implementation.

- Latitude and longitude conversion to % positioning for responsive maps markers
- SVG for crisp scaling
- Pan and zoom functionality as requiresd

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

The implementation in the basic storybook is as follows. As the component is only giving you a realtive positioned container and then allowing you the flexibility to render what you need the possibile use cases are huge. I'm hoping to add more examples in the future.

```javascript
const locations = object('Locations', [
  { label: 'LDN', lat: 51.5074, lon: -0.1278 },
  { label: 'NY', lat: 40.7128, lon: -74.0060 },
  { label: 'AUK', lat: -36.848, lon: 174.7633 },
  { label: 'AMS', lat: 52.3680, lon: 4.9036 },
  { label: 'CAT', lat: -33.9249, lon: 18.4241 },
  { label: 'PAN', lat: 8.5380, lon: -80.7821 },
  { label: 'RIO', lat: -22.9068, lon: -43.1729 }
]);
```

```javascript
<MercatorMap>
  { ({ evalCoordinates }) => locations.map(location => {
    const { lat, lon, label } = location;
    const coords = evalCoordinates({ lat, lon });
    return (
      <span
        key={ label }
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

### Zoom example

COMING SOON

## API

**`hideAntarctica: Bool` -** Determine whether to show or hide antarctica. Only removes the path, the SVG will remain the same height otherwise the projection is incorrect. This whitespace can be hidden by the parent of the map.

**`baseColor: String` -** What colour the map regions should be

**`zoom: Float` -** factor the map should be zoomed in by. default is 1

**`center: Object` -** e.g `center={ { lat: 51.5074, lon: -0.1278 } }` where the map focus is and therefore zoom origin. The default is `0 0`. Prop takes a latitude and longitude and then calculates the coordinates for focus. At zoom 1 or lower the map will be centered on the screen