import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';

// COMPONENT
import SimpleMap from './index';

/**
 * STANDARD TESTS
*/
test('Should render default map and styles', async () => {
  // Render
  const { container } = render(
    <SimpleMap
      data-testid='my-field'
    />
  );
  // Assert
  expect(container.firstChild).toMatchSnapshot();
});