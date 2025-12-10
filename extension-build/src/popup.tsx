import React from 'react';
import { createRoot } from 'react-dom/client';
import ExtensionPanel from '../../app/components/Extension_Panel_alven';

// Mount the extension panel
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <ExtensionPanel />
        </React.StrictMode>
    );
}
