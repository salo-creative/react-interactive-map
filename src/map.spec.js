import React from 'react';
import 'jest-styled-components';
import { render } from 'react-testing-library';

// COMPONENT
import Map from './index';

/**
 * STANDARD TESTS
*/
test('Should render default map and styles', async () => {
  // Render
  const { container } = render(
    <Map
      data-testid='my-field'
    />
  );
  // Assert
  expect(container.firstChild).toMatchSnapshot();
});