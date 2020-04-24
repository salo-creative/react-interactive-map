
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import {
  H2, Column, P, Row, colours
} from '@salo/core-ui';

import results from '../../.storybook/jest-test-results.json';
import SimpleMap from './index';

// README //
import README from '../../README_SIMPLE.md';

const stories = storiesOf('Simple Map', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({
  results
}));
stories.addParameters({
  jest: ['simplemap']
});

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

export const Basic = () => {
  const activeColor = text('Active color', '#00aced');
  const baseColor = text('Base color', '#cccccc');
  const active = ['CA', 'GB', 'AU'];
  const disabled = ['US'];
  return (
    <React.Fragment>
      <Row>
        <Column>
          <SimpleMap
            active={ active }
            disabled={ disabled }
            activeColor={ activeColor }
            baseColor={ baseColor }
          />
        </Column>
      </Row>
    </React.Fragment>
  );
};

Basic.story = {
  decorators: [
    withKnobs,
    withTests({
      results
    })
  ],
  parameters: {
    notes: README,
    jest: ['simplemap'],
    info: {
      propTablesExclude: [StyledP, Wrapper, Column, H2, Row, React.Fragment]
    }
  }
};

export default {
  title: 'Simple Map'
};