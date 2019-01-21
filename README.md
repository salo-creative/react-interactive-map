# interactive-map

This library will render an `<svg>` based world map that can have active/disabled countries as well as handling user clicks on a given country

-------

## Usage

Install

```
yarn add @salocreative/interactive-map
```

Include

```javascript
import Map from '@salocreative/interactive-map';
```

Implement as follows

```javascript
<Map />
```

## API

**`onClickRegion: Func` -** handle click events on a given region. This will return an object of : -

```javacript
  {
    id: String // The id of the clicked region,
    active: Boolean // If the region is currently active,
    disabled: Boolean // If the region is currently disabled
  }
```

**`active: [String]` -** The active prop allows you to tell the map what regions are active. This expects an array of string corresponding to the ID's assigned for wach given country. If a country is active then it will be highlighted.

**`disabled: 'all' | 'none' | [String]` -** The disabled prop allows map regions to be disabled. This does not prevent click events but will show a visual style to a user highlighting a region is disabled. This prop is similar to the active one above but will also accept two strings, `all` to disable all regions and `none` (default) to not disable any region. Please note regions can be both active and disabled

**`baseColor: String` -** What colour the in-active map regions should be

**`highlightColour: String` -** What colour the active map regions shpould be

**`maxWidth: String` -** the maximum width the map can be
