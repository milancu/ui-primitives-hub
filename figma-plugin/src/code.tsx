import {setupMainThread} from 'react-figma/rpc';

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.postMessage({type: 'INIT_DATA', payload: {foo: figma.currentUser}});

setupMainThread();