import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import CatFact from '../cat-fact';
import CatsList from '../cats-list';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: '/',
    async loader() {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?limit=9'
      );
      return response.data.slice(0, 9);
    },
    element: <CatsList />,
  },
  {
    path: 'cat-fact/:catId',
    async loader({ params }) {
      const catImgResponse = await axios.get(
        `https://api.thecatapi.com/v1/images/${params.catId}`
      );
      const catFactResponse = await axios.get(
        'https://meowfacts.herokuapp.com?lang=rus-ru'
      );

      return {
        catImage: catImgResponse.data.url,
        catFact: catFactResponse.data.data,
      };
    },
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
