import React from 'react';
import CatFact from './components/cat-fact';
import CatsList from './components/cats-list';
import axios from 'axios';
import { json } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    async loader() {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?limit=9'
      );
      return json(response.data.slice(0, 9));
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

      return json({
        catImage: catImgResponse.data.url,
        catFact: catFactResponse.data.data,
      });
    },
    element: <CatFact />,
  },
];
