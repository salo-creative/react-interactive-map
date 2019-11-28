# interactive-map

DEMO here [https://salo-creative.github.io/react-interactive-map](https://salo-creative.github.io/react-interactive-map)

## Usage

Install

```
yarn add @salo/interactive-map
```

### Simple country level map

The simple will render an `<svg>` based world map that can have active/disabled countries as well as handling user clicks on a given country. This is not an accurate mercator projection so should only be used if the level of granularity required is at the country level. If you need to use point locations based on lat and long coordinates please see the MercatorMap implementation

```javascript
import { SimpleMap } from '@salo/interactive-map';
```

Implement as follows

```javascript
<SimpleMap />
```

for full documentation see [README_SIMPLE.md](https://github.com/salo-creative/react-interactive-map/blob/master/README_SIMPLE.md)

### Mercator projection with lat/long support

This map is an SVG mercator projection of the globe. This allows us to plot latitude and longitudes directly on it. In order to keep the implementation straightforward and easy to customise this component simply exposes a render prop with the calculation required to perform the conversion for you. You can then position your child elements as you require based on the X & Y coordinates. If you need to simply handle countries and interaction at that level please see the SimpleMap implementation.

```javascript
import { MercatorMap } from '@salo/interactive-map';
```

Implement as follows

```javascript
<MercatorMap />
```

for full documentation see [README_MERCATOR.md](https://github.com/salo-creative/react-interactive-map/blob/master/README_MERCATOR.md)

## Development

The project uses storybook for local, abstracted development. All components must have README.s and appropriate stories with knobs.

To get started run the following to install the dependencies
```bash
yarn
```

Then run the demo command to run the initial unit tests and boot up the development server
```bash
yarn demo
```


## Publishing

1. Before opening a PR, run `yarn release:prep` locally to add changelog and increment version number on your branch
2. Open a PR from your feature back to master
3. When development pipeline completes, hit merge and the publish pipeline will release your changes
4. If you want to deploy to GitHub pages then run `yarn release:ghp`. This should only be run from master so not before a PR is merged
