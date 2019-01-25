import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// COMPONENTS
import Map from './_map';

const Wrapper = styled.div`
  position: relative;
  padding: 0 0 75%;
  width: 100%;
  max-width: ${ ({ maxWidth }) => maxWidth };
  margin: 0 auto;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    y = ((((mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI))) / mapHeight) * 100) - 0.7;
    return { x, y };
  }

  render() {
    const { children, hideAntarctica, baseColor } = this.props;
    return (
      <Wrapper>
        <MapWrapper>
          <Map
            hideAntarctica={ hideAntarctica }
            baseColor={ baseColor }
          />
          { children({ evalCoordinates: this.evalCoordinates }) }
        </MapWrapper>
      </Wrapper>
    );
  }
}

MercatorMap.defaultProps = {
  hideAntarctica: true,
  baseColor: '#cccccc'
};

MercatorMap.propTypes = {
  children: PropTypes.any.isRequired,
  hideAntarctica: PropTypes.bool,
  baseColor: PropTypes.string
};

export default MercatorMap;