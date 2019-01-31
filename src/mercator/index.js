import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// COMPONENTS
import Map from './_map';

const Wrapper = styled.div`
  position: relative;
  padding: 0 0 56%;
  width: 100%;
  max-width: ${ ({ maxWidth }) => maxWidth };
  margin: 0 auto;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 0 75%;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  position: absolute;
  top: ${ ({ top }) => top };
  left: ${ ({ left }) => left };
  width: ${ ({ zoom }) => zoom };
  height: ${ ({ zoom }) => zoom };
  transition: all 0.3s ease-in-out;
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

  calculatePosition = (size) => {
    const { zoomOrigin, zoom, hideAntarctica } = this.props;
    const [x, y] = zoomOrigin.split(',');
    const factor = 100 - parseInt(size, 10);

    // HANDLE NO ZOOM
    if (factor === 0) {
      return {
        left: '0',
        top: '0'
      };
    }

    // KEEP CENTERED IF ZOOMED OUT
    if (factor > 0) {
      const position = `${ factor / 2 }%`;
      return {
        left: position,
        top: position
      };
    }

    // HANDLE ORIGIN ON ZOOM IN
    let left = parseInt(x, 10);
    let top = parseInt(y, 10);

    // EVALUATE LEFT POS
    if (left >= 0 && left <= 100) {
      left *= (zoom - 1);
    } else if (left > 100) {
      left = (zoom - 1) * 100;
    } else {
      left = 0;
    }

    // EVALUATE TOP POS
    if (top >= 0 && top <= 100) {
      top = (top * (zoom - 1)) - (hideAntarctica ? (25 * (zoom - 1)) : 0);
    } else if (top > 100) {
      top = (zoom - 1) * (hideAntarctica ? 75 : 100);
    } else {
      top = 0;
    }

    return {
      left: `-${ left }%`,
      top: `-${ top }%`
    };
  }

  render() {
    const { children, hideAntarctica, baseColor } = this.props;
    const size = this.calculateZoomSize();
    const { left, top } = this.calculatePosition(size);
    return (
      <Wrapper>
        <InnerWrapper>
          <MapWrapper
            zoom={ size }
            left={ left }
            top={ top }
          >
            <Map
              hideAntarctica={ hideAntarctica }
              baseColor={ baseColor }
            />
            { children({ evalCoordinates: this.evalCoordinates }) }
          </MapWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

MercatorMap.defaultProps = {
  hideAntarctica: true,
  baseColor: '#cccccc',
  zoom: 1,
  zoomOrigin: '50,50'
};

MercatorMap.propTypes = {
  children: PropTypes.any.isRequired,
  hideAntarctica: PropTypes.bool,
  baseColor: PropTypes.string,
  zoom: PropTypes.number,
  zoomOrigin: PropTypes.string
};

export default MercatorMap;