import express, { Request, Response } from 'express';

const mainRoutes = express.Router();

mainRoutes.get('/', (req: Request, res: Response) => {
  res.send('Main API Route');
});

export default mainRoutes;
