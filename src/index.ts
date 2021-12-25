import express from 'express';
import { promises as fsPromises } from 'fs';

const app = express();
const port = 3000;

app.get('/', (req, res)=>{
  console.log('main route');
  res.send('test');
});

app.listen(port, ()=>{
    console.log('Server is running successfully!');
});
