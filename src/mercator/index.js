import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// COMPONENTS
import Map from './_map';

// HELPERS
import { evalCoordinates, groupPoints } from '../helpers';

const Wrapper = styled.div`
  position: relative;
  padding: ${ ({ hideAntarctica }) => (hideAntarctica ? '0 0 56%' : '0 0 75%') };
  width: 100%;
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
  calculateZoomSize = () => {
    const { zoom } = this.props;
    if (!isNaN(parseFloat(zoom))) {
      return `${ parseFloat(zoom) * 100 }%`;
    }
    return '100%';
  }

  calculatePosition = (size) => {
    const { zoom, hideAntarctica, center } = this.props;
    const factor = 100 - parseInt(size, 10);
    const { x, y } = evalCoordinates(center);

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

    // Eval left position
    if (left >= 0 && left <= 100) {
      left *= (zoom - 1);
    } else if (left > 100) {
      left = (zoom - 1) * 100;
    } else {
      left = 0;
    }

    // Eval top pos
    if (top >= 0 && top <= 100) {
      top = (top * (zoom - 1)) - (hideAntarctica && top > 50 ? (25 * (zoom - 1)) : 0);
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
    const { children, hideAntarctica, baseColor, zoom } = this.props;
    const size = this.calculateZoomSize();
    const { left, top } = this.calculatePosition(size);
    return (
      <Wrapper
        hideAntarctica={ hideAntarctica }
      >
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
            { children({ evalCoordinates, groupPoints: (locations, radius) => groupPoints({ locations, radius, zoom }) }) }
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
  center: {
    lat: 0,
    lon: 0
  }
};

MercatorMap.propTypes = {
  children: PropTypes.any.isRequired,
  hideAntarctica: PropTypes.bool,
  baseColor: PropTypes.string,
  zoom: PropTypes.number,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  })
};

export default MercatorMap;