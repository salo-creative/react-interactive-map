import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// add some helpful assertions
import 'jest-dom/extend-expect';

// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

Enzyme.configure({ adapter: new Adapter() });

console.error = jest.fn();
console.warn = jest.fn();

beforeEach(() => {
  console.error.mockClear();
  console.warn.mockClear();
});