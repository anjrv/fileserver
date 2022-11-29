import express from 'express';

import { router } from './api/index.js';

const { PORT: port = 3003 } = process.env;

const app = express();

/**
 * CORS policy definitions
 */
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(router);

app.use((_req, res, _next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
