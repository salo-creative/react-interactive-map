import React from 'react';
import 'jest-styled-components';
import { render } from 'react-testing-library';

// COMPONENT
import MeracatorMap from './index';

/**
 * STANDARD TESTS
*/
test('Should render default map and styles', async () => {
  const locations = [
    { label: 'LDN', lat: 51.5074, lon: -0.1278 },
    { label: 'NY', lat: 40.7128, lon: -74.0060 },
    { label: 'AUK', lat: -36.848, lon: 174.7633 },
    { label: 'AMS', lat: 52.3680, lon: 4.9036 },
    { label: 'CAT', lat: -33.9249, lon: 18.4241 },
    { label: 'PAN', lat: 8.5380, lon: -80.7821 },
    { label: 'RIO', lat: -22.9068, lon: -43.1729 }
  ];
  // Render
  const { container } = render(
    <MeracatorMap
      data-testid='my-field'
    >
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
    </MeracatorMap>
  );
  // Assert
  expect(container.firstChild).toMatchSnapshot();
});