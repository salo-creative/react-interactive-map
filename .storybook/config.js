import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon, { setDefaults, withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles, Normalise, Theme } from '@salo/core-ui';

import './storybook.scss';

addDecorator(
  withOptions({
    name: 'Interactive Map',
    hierarchyRootSeparator: /\|/,
    url: 'https://github.com/salo-creative/react-interactive-map',
    showAddonPanel: true,
    addonPanelInRight: true
  })
)

addDecorator(withInfo({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
  styles: {
    infoBody: {
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      padding: '0 20px',
      margin: 0
    },
    infoStory: {
      padding: '40px 20px'
    }
  },
  components: {
    p({ children }) {
      return <p>{children}</p>;
    },
  }
}))

addDecorator(story => (
  <BrowserRouter>
    <Theme>
      <div>
        <Normalise />
        <GlobalStyles />
        { story() }
      </div>
    </Theme>
  </BrowserRouter>
));


function loadStories() {
  require('../src/simple/_story');
  require('../src/mercator/_story');
}

setAddon(infoAddon);

configure(loadStories, module);