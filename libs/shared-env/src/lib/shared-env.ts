export function getBackendUrl(): string {
  const port = process.env['MD_SERVER_PORT'];
  const baseUrl = process.env['MD_SERVER_BASE_URL'];
  if (!port) {
    throw new Error('Env var MD_SERVER_PORT is missing.');
  }
  if (!baseUrl) {
    throw new Error('Env var MD_SERVER_BASE_URL is missing.');
  }
  return port === '80' ? baseUrl : `${baseUrl}:${port}`;
}
