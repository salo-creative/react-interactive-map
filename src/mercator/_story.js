
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, object, boolean, text, number } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import withReadme from 'storybook-readme/with-readme';
import { H2, Column, P, Row, colours } from '@salocreative/ui';

import results from '../../.storybook/jest-test-results.json';
import MercatorMap from './index';

// README //
import README from '../../README_MERCATOR.md';

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
    const locations = object('Locations', [
      { label: 'LDN', lat: 51.5074, lon: -0.1278 },
      { label: 'NY', lat: 40.7128, lon: -74.0060 },
      { label: 'AUK', lat: -36.848, lon: 174.7633 },
      { label: 'AMS', lat: 52.3680, lon: 4.9036 },
      { label: 'CAT', lat: -33.9249, lon: 18.4241 },
      { label: 'PAN', lat: 8.5380, lon: -80.7821 },
      { label: 'RIO', lat: -22.9068, lon: -43.1729 }
    ]);
    const zoom = number('Zoom', 1);
    const top = text('Top', '0%');
    const left = text('left', '0%');
    return (
      <React.Fragment>
        <Row>
          <Column>
            <MercatorMap
              hideAntarctica={ hideAntarctica }
              baseColor={ baseColor }
              zoom={ zoom }
              top={ top }
              left={ left }
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
            </MercatorMap>
          </Column>
        </Row>
      </React.Fragment>
    );
  },
  { info: { propTablesExclude: [StyledP, Wrapper, Column, H2, Row, React.Fragment] } }
);