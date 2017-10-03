import fetch from 'node-fetch';
import config from './config';

export default function(endpoint, method = 'GET', data = {}) {
  const url = `${config.apiHost}${endpoint}`;
  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json());
}
