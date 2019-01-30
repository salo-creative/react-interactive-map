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
  top: ${ ({ top }) => top };
  left: ${ ({ left }) => left };
  width: ${ ({ zoom }) => zoom };
  height: ${ ({ zoom }) => zoom };
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

  calculateZoomSize = () => {
    const { zoom } = this.props;
    if (!isNaN(parseFloat(zoom))) {
      return `${ parseFloat(zoom) * 100 }%`;
    }
    return '100%';
  }

  render() {
    const { children, hideAntarctica, baseColor, top, left } = this.props;
    return (
      <Wrapper>
        <MapWrapper
          zoom={ this.calculateZoomSize() }
          left={ left }
          top={ top }
        >
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
  baseColor: '#cccccc',
  zoom: 1,
  top: '0',
  left: '0'
};

MercatorMap.propTypes = {
  children: PropTypes.any.isRequired,
  hideAntarctica: PropTypes.bool,
  baseColor: PropTypes.string,
  zoom: PropTypes.number,
  top: PropTypes.string,
  left: PropTypes.string
};

export default MercatorMap;