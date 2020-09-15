import express from 'express';
import createError from 'http-errors';

import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// default error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });

  next();
});

export default app;
