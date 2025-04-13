import {setupMainThread} from 'react-figma/rpc';

figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.on('message', (msg) => {
    if (msg.type === 'READY_FOR_DATA') {
        figma.ui.postMessage({
            type: 'INIT_DATA',
            payload: { foo: figma.currentUser }
        });
    }
});
setupMainThread();