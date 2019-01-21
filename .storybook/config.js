import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon, { setDefaults, withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles, Normalise } from '@salocreative/ui';

import './storybook.scss';

setDefaults({
  inline: false,
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
});

addDecorator(
  withOptions({
    name: 'Interactive Map',
    hierarchyRootSeparator: /\|/,
    url: 'https://github.com/salocreative/react-interactive-map',
    showAddonPanel: true,
    addonPanelInRight: true
  })
)

addDecorator(withInfo)

addDecorator(story => (
  <BrowserRouter>
    <div>
      <Normalise />
      <GlobalStyles />
      { story() }
    </div>
  </BrowserRouter>
));


function loadStories() {
  require('../src/_story');
}

setAddon(infoAddon);

configure(loadStories, module);