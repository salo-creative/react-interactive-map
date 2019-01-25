# Mercator Map

This map is an SVG mercator projection of the globe. This allows us to plot latitude and longitudes directly on it. In order to keep the implementation straightforward and easy to customise this component simply exposes a render prop with the calculation required to perform the conversion for you. You can then position your child elements as you require based on the X & Y coordinates. If you need to simply handle countries and interaction at that level please see the SimpleMap implementation.

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
  { label: 'PAN', lat: 8.5380, lon: -80.7821 }
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
          height: '10px',
          width: '10px',
          borderRadius: '50%',
          background: 'red',
          position: 'absolute',
          left: `calc(${ coords.x }% - 5px)`,
          top: `calc(${ coords.y }% - 5px)`
        } }
      />
    );
  }) }
</MercatorMap>
```