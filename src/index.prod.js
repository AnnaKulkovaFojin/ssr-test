import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './components/app';

const container = document.getElementById('app');
hydrateRoot(container, <App />);
