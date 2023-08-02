import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../../routes';
import './App.css';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <main className="main">
      <RouterProvider router={router} />
    </main>
  );
}
