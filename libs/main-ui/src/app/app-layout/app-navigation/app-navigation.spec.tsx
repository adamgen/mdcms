import { AppNavigation } from './app-navigation';
import { render } from '../../../../../../apps/fscms-dev-ui/src/test-utils';

describe('AppNavigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
