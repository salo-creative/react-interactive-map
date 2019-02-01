
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, object, boolean, text, number } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import withReadme from 'storybook-readme/with-readme';
import { H2, Column, P, Row, colours } from '@salocreative/ui';
import { indexOf } from 'lodash';

import results from '../../.storybook/jest-test-results.json';
import MercatorMap from './index';

// README //
import README from '../../README_MERCATOR.md';
import locations from '../../locations.json';

const calculateGroupPosition = (group) => {
  const lat = group.reduce((acc, item) => acc + item.lat, 0) / group.length;
  const lon = group.reduce((acc, item) => acc + item.lon, 0) / group.length;
  return { lat, lon };
};

const cleanedLocations = (zoom = 1) => {
  const mappedLocations = [];
  const latResolution = zoom ? (2.5 / zoom) : 2.5;
  const lonResolution = zoom ? (5 / zoom) : 5;

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
      return {
        lat,
        lon,
        name: location.name,
        locations: groupedLocations
      };
    }
    return null;
  }).filter(i => i);
};

const stories = storiesOf('Mercator Map', module);
stories.addDecorator(withReadme(README));
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results })('mercatormap'));

// STYLES
const Wrapper = styled.div`
  padding: 40px 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${ colours.paleGrey };
`;


const StyledP = styled(P)`
  text-align: center;
  font-weight: 700;
  padding: 5px 0;
  margin: 30px 0 10px;
  background: #fff;
`;

stories.add(
  'Basic',
  () => {
    const hideAntarctica = boolean('Hide Antarctica', true);
    const baseColor = text('Base color', '#cccccc');
    // const locations = object('Locations', [
    //   { label: 'LDN', lat: 51.5074, lon: -0.1278 },
    //   { label: 'NY', lat: 40.7128, lon: -74.0060 },
    //   { label: 'AUK', lat: -36.848, lon: 174.7633 },
    //   { label: 'AMS', lat: 52.3680, lon: 4.9036 },
    //   { label: 'CAT', lat: -33.9249, lon: 18.4241 },
    //   { label: 'PAN', lat: 8.5380, lon: -80.7821 },
    //   { label: 'RIO', lat: -22.9068, lon: -43.1729 }
    // ]);
    const center = object('Center', { lat: 51.5074, lon: -0.1278 });
    const zoom = number('Zoom', 1);
    return (
      <React.Fragment>
        <Row>
          <Column>
            <MercatorMap
              hideAntarctica={ hideAntarctica }
              baseColor={ baseColor }
              zoom={ zoom }
              center={ center }
            >
              { ({ evalCoordinates }) => cleanedLocations(zoom).map(location => {
                const { lat, lon, name, locations } = location;
                const coords = evalCoordinates({ lat, lon });
                return (
                  <span
                    key={ name }
                    style={ {
                      height: '15px',
                      width: '15px',
                      borderRadius: '50%',
                      background: 'red',
                      position: 'absolute',
                      left: `calc(${ coords.x }% - 7.5px)`,
                      top: `calc(${ coords.y }% - 7.5px)`,
                      color: '#fff',
                      fontSize: '9px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    } }
                  >
                    { locations.length }
                  </span>
                );
              }) }
            </MercatorMap>
          </Column>
        </Row>
      </React.Fragment>
    );
  },
  { info: { propTablesExclude: [StyledP, Wrapper, Column, H2, Row, React.Fragment] } }
);