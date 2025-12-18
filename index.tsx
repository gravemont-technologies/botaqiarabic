import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root')!;
if (!(container as any)._root) {
  (container as any)._root = createRoot(container);
}
(container as any)._root.render(<App />);