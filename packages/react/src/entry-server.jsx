import React from 'react'
import App from './App';
import { renderToString } from 'react-dom/server';

export async function render() {
  const html = renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  return html;
}
