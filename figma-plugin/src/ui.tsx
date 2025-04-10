import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ClientApp} from './ClientApp';

function AppWrapper() {
  const [currentUser, setCurrentUser] = React.useState<any | null>(null);

  React.useEffect(() => {
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;
      if (message?.type === 'INIT_DATA') {
        setCurrentUser(message.payload.foo);
      }
    };
  }, []);

  if (currentUser === null) return <div>Loading…</div>;

  return <ClientApp currentUser={currentUser} />;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-page');
  if (container) {
    const root = createRoot(container);
    root.render(<AppWrapper />);
  }
});
