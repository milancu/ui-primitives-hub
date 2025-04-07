import * as React from 'react';
import {App} from './App';
import 'react-figma/rpc';
import {render} from 'react-figma';
import {ClientApp} from './ClientApp';
import {createRoot} from "react-dom/client";


render(
  <App/>
);

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('react-page');
  if (container) {
    const root = createRoot(container);
    root.render(<ClientApp/>);
  }
});