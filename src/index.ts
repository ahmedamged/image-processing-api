import express from 'express';
import mainRoutes from './routes/routes';

const app = express();
const port = 3036;

app.use('/', mainRoutes);

app.listen(port, () => {
  console.log(
    `Server is running successfully at http://localhost:${port} or http://127.0.0.1:${port}!`
  );
});

export default app;
