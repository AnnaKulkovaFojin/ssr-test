import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import CatFact from '../cat-fact';
import CatsList from '../cats-list';
import './App.css';
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CatsList />,
  },
  {
    path: 'cat-fact/:catId',
    element: <CatFact />,
  },
]);

export default function App() {
  return (
    <main className="main">
      <RouterProvider router={router} />
    </main>
  );
}
