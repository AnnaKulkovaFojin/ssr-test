import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import { routes } from '../src/routes';
import createFetchRequest from './fetchRequest';
import fs from 'fs';

const app = express();
const port = 8000;

const handler = createStaticHandler(routes);

app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, '../dist'))
);

// в ответ на любые другие запросы отправляем 'index.html'
app.use('*', async (req, res) => {
  const fetchRequest = createFetchRequest(req);
  const context = await handler.query(fetchRequest);

  const router = createStaticRouter(handler.dataRoutes, context);

  const indexHTML = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    { encoding: 'utf8' }
  );

  const appHTML = renderToString(
    <StaticRouterProvider router={router} context={context} />
  );

  const fullHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );

  return res.send('<!DOCTYPE html>' + fullHTML);
});

app.listen(port, () => {
  console.log(`Express server started at <http://localhost:${port}>`);
});
