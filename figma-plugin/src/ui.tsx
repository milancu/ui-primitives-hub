import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ClientApp } from './ClientApp';
import './index.css';

function AppWrapper() {
  const [currentUser, setCurrentUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    const handler = (event: MessageEvent) => {
      const message = event.data.pluginMessage;
      if (message?.type === 'INIT_DATA') {
        setCurrentUser(message.payload.foo);
      }
    };

    window.addEventListener('message', handler);

    // check if the message already exists on window (fallback)
    if ((window as any).__INIT_DATA__) {
      setCurrentUser((window as any).__INIT_DATA__);
    }

    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

  if (currentUser === null) return <div>Loading…</div>;

  return <ClientApp currentUser={currentUser} />;
}

document.addEventListener('DOMContentLoaded', () => {
  window.parent.postMessage({ pluginMessage: { type: 'READY_FOR_DATA' } }, '*');

  const container = document.getElementById('react-page');
  if (container) {
    const root = createRoot(container);
    root.render(<AppWrapper />);
  }
});