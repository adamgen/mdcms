import { getBackendUrl } from './shared-env';

describe('getBackendUrl', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  it('should throw and error if MD_SERVER_PORT is missing', () => {
    process.env['MD_SERVER_PORT'] = undefined;
    expect(() => getBackendUrl()).toThrow('Env var MD_SERVER_PORT is missing.');
  });

  it('should throw and error if MD_SERVER_BASE_URL is missing', () => {
    process.env['MD_SERVER_BASE_URL'] = undefined;
    expect(() => getBackendUrl()).toThrow(
      'Env var MD_SERVER_BASE_URL is missing.'
    );
  });

  it('should build successfully a backend URL with non 80 port', () => {
    process.env['MD_SERVER_BASE_URL'] = 'https://example.com';
    process.env['MD_SERVER_PORT'] = '8080';
    expect(getBackendUrl()).toBe('https://example.com:8080');

    process.env['MD_SERVER_BASE_URL'] = 'https://localhost';
    process.env['MD_SERVER_PORT'] = '8080';
    expect(getBackendUrl()).toBe('https://localhost:8080');

    process.env['MD_SERVER_BASE_URL'] = 'http://localhost';
    process.env['MD_SERVER_PORT'] = '8080';
    expect(getBackendUrl()).toBe('http://localhost:8080');
  });


  it('should build successfully a backend URL with an 80 port', () => {
    process.env['MD_SERVER_BASE_URL'] = 'https://example.com';
    process.env['MD_SERVER_PORT'] = '80';
    expect(getBackendUrl()).toBe('https://example.com');

    process.env['MD_SERVER_BASE_URL'] = 'https://localhost';
    process.env['MD_SERVER_PORT'] = '80';
    expect(getBackendUrl()).toBe('https://localhost');

    process.env['MD_SERVER_BASE_URL'] = 'http://localhost';
    process.env['MD_SERVER_PORT'] = '80';
    expect(getBackendUrl()).toBe('http://localhost');
  });
});
