
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';
import { withTests } from '@storybook/addon-jest';
import withReadme from 'storybook-readme/with-readme';
import { H2, Column, P, Row, colours } from '@salocreative/ui';

import results from '../../.storybook/jest-test-results.json';
import SimpleMap from './index';

// README //
import README from '../../README_SIMPLE.md';

const stories = storiesOf('Simple Map', module);
stories.addDecorator(withReadme(README));
stories.addDecorator(withKnobs);
stories.addDecorator(withTests({ results })('simplemap'));

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
    return (
      <React.Fragment>
        <Row>
          <Column>
            <SimpleMap />
          </Column>
        </Row>
      </React.Fragment>
    );
  },
  { info: { propTablesExclude: [StyledP, Wrapper, Column, H2, Row, React.Fragment] } }
);