import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ClientApp } from './ClientApp';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-page');
  if (container) {
    const root = createRoot(container);
    root.render(<ClientApp />);
  }
});
