import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// COMPONENTS
import Map from './_map';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${ ({ maxWidth }) => maxWidth };
  margin: 0 auto;
`;

class MercatorMap extends React.Component {
  evalCoordinates = ({ lat, lon }) => {
    // lat = N - S
    // lon = W - E
    let x = 0;
    let y = 0;
    const mapWidth = 1717;
    const mapHeight = 1291;
    // get x value
    x = ((((lon + 180) * (mapWidth / 360)) / mapWidth) * 100) - 2.8;
    // convert from degrees to radians
    const latRad = (lat * Math.PI) / 180;
    // get y value
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    y = ((((mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI))) / mapHeight) * 100) - 1.1;
    return { x, y };
  }

  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <Map />
        { children({ evalCoordinates: this.evalCoordinates }) }
      </Wrapper>
    );
  }
}

MercatorMap.propTypes = {
  children: PropTypes.any.isRequired
};

export default MercatorMap;