import express, { Request, Response } from 'express';
import mainRoutes from './routes/routes';
import resizeRoute from './routes/api/resize';

const app = express();
const port = 3036;

app.get('/', (req: Request, res: Response): void => {
  console.log('main route');
  res.send('test');
});

app.use('/api', mainRoutes);
app.use('/api/resize', resizeRoute);

app.listen(port, () => {
  console.log(
    `Server is running successfully at http://localhost:${port} or http://127.0.0.1:${port}!`
  );
});

export default app;
