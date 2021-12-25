import express, { Request, Response } from 'express';
import resizeRoute from './api/resize';

const mainRoutes = express.Router();

mainRoutes.get('/', (req: Request, res: Response): void => {
  res.send('Main API Route');
});

mainRoutes.use('/resize', resizeRoute);

export default mainRoutes;
