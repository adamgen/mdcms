import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { render } from '../test-utils';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
