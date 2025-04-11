import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ClientApp } from './ClientApp';

function AppWrapper() {
  const [data, setData] = React.useState<any | null>(null);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data.pluginMessage;
      if (msg?.type === 'INIT_DATA') {
        setData(msg.payload.foo);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (data === null) return <div>Loading...</div>;

  return <ClientApp currentUser={data} />;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-page');
  if (container) {
    const root = createRoot(container);
    root.render(<AppWrapper />);
  }
});
