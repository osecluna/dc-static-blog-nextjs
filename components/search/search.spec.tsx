/* eslint-env jest */
import renderer from 'react-test-renderer';

import Search from './search';

describe('Search', () => {
  test('renders search', async () => {
    const component = await renderer.create(<Search />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
