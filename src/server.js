import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match,StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import dvaApp from "./index_server"

const app = express();

function renderFullPage(html) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" media="screen" href="http://localhost:8080/packs/application.css" />
    </head>
    <body>
      <div id="root">
        ${html}
      </div>
      <script src="http://localhost:8080/packs/application.js"></script>
    </body>
    </html>
  `;
}

let App = dvaApp.start()

app.use((req, res) => {
  const html = renderToString(
    <App />
  );
  res.end(renderFullPage(html));
});

console.log('Listening http://localhost:4000')
app.listen(4000);
