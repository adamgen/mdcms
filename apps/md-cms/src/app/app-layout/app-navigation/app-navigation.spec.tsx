import {AppNavigation} from './app-navigation';
import {render} from '../../../test-utils';

describe('AppNavigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
