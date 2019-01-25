# interactive-map

DEMO here [https://salocreative.github.io/react-interactive-map](https://salocreative.github.io/react-interactive-map)

## Usage

Install

```
yarn add @salocreative/interactive-map
```

### Simple country level map

The simple will render an `<svg>` based world map that can have active/disabled countries as well as handling user clicks on a given country. This is not an accurate mercator projection so should only be used if the level of granularity required is at the country level. If you need to use point locations based on lat and long coordinates please see the MercatorMap implementation

```javascript
import { SimpleMap } from '@salocreative/interactive-map';
```

Implement as follows

```javascript
<SimpleMap />
```

for full documentation see [README_SIMPLE.md](https://github.com/SaloCreative/react-interactive-map/blob/master/README_SIMPLE.md)

### Mercator projection with lat/long support

This map is an SVG mercator projection of the globe. This allows us to plot latitude and longitudes directly on it. In order to keep the implementation straightforward and easy to customise this component simply exposes a render prop with the calculation required to perform the conversion for you. You can then position your child elements as you require based on the X & Y coordinates. If you need to simply handle countries and interaction at that level please see the SimpleMap implementation.

```javascript
import { MercatorMap } from '@salocreative/interactive-map';
```

Implement as follows

```javascript
<MercatorMap />
```

for full documentation see [README_MERCATOR.md](https://github.com/SaloCreative/react-interactive-map/blob/master/README_MERCATOR.md)