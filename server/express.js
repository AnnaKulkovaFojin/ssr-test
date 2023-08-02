import React from 'react';
import App from '../src/components/app';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';

const app = express();
// обслуживание статических ресурсов

const port = 8000;

app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, '../dist'))
);

// в ответ на любые другие запросы отправляем 'index.html'
app.use('*', (_req, res) => {
  // читаем файл `index.html`
  const indexHTML = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    { encoding: 'utf8' }
  );
  const appHTML = renderToString(<App />);

  console.log(appHTML);

  const fullHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );
  // устанавливаем заголовок и статус
  res.contentType('text/html');
  res.status(200);

  return res.send(fullHTML);
});
// запускаем сервер на порту 9000
app.listen(port, () => {
  console.log(`Express server started at <http://localhost:${port}>`);
});
