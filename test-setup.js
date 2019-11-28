import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({
  adapter: new Adapter()
});

console.error = jest.fn();
console.warn = jest.fn();

beforeEach(() => {
  console.error.mockClear();
  console.warn.mockClear();
});

beforeAll(() => {
  global.webpackVars = {
    ENV: 'test'
  };
});