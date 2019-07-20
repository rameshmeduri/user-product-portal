import express from 'express';
import setupUserRoutes from './user';
import setupProductRoutes from './product';

function setupRoutes(app) {
  // User Routes
  const userRouter = express.Router();
  setupUserRoutes(userRouter);
  app.use('/api/user', userRouter);

  // Product Routes
  const productRouter = express.Router();
  setupProductRoutes(productRouter);
  app.use('/api/product', productRouter);
}

export default setupRoutes;
