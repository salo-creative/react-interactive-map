import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon, { withInfo } from '@storybook/addon-info';
import { BrowserRouter } from 'react-router-dom';
import { addParameters } from '@storybook/react';

import { GlobalStyles, Normalise, Theme } from '@salo/core-ui';

import './storybook.scss';

addParameters({
  options: {
    name: 'Interactive Map',
    showRoots: true,
    showAddonPanel: true,
    addonPanelInRight: true,
    url: 'https://github.com/salo-creative/react-interactive-map'
  },
});

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

addDecorator(story => {
  return (
    <BrowserRouter>
      <Theme>
          <Normalise />
          <GlobalStyles />
            { story() }
        </Theme>
    </BrowserRouter>
  );
} );

setAddon(infoAddon);

configure([
  require.context('../src', true, /_story\.js$/)
], module);