import {setupMainThread} from 'react-figma/rpc';

figma.showUI(__html__);

figma.ui.postMessage({type: 'INIT_DATA', payload: {foo: figma.currentUser}});

setupMainThread();