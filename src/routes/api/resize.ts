import express, { Request, Response } from 'express';
import fs from 'fs';
import imageResize from '../../utilities/imageResizer';

const resizeRoute = express.Router();

resizeRoute.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as unknown as string;
  const imageWidth = parseInt(req.query.width as unknown as string);
  const imageHeight = parseInt(req.query.height as unknown as string);
  const fullImagePath = `./images/${filename}.jpg`;
  const fullResizedPath = `./resized-images/${filename}-${imageWidth}x${imageHeight}.png`;
  const originalImageExists = fs.existsSync(fullImagePath);
  const cachedImageExists = fs.existsSync(fullResizedPath);

  if (!originalImageExists) {
    res.status(404).send("Image doesn't exist!");
  } else if (Number.isNaN(imageWidth) || Number.isNaN(imageHeight)) {
    res.status(400).send('You need to provide numeric width and height!');
  } else {
    if (cachedImageExists) {
      try {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream(fullResizedPath).pipe(res);
      } catch (error) {
        throw new Error(
          JSON.stringify({
            message: "Image couldn't be retrieved!",
          })
        );
      }
    } else {
      await imageResize(
        fullImagePath,
        fullResizedPath,
        imageWidth,
        imageHeight
      );
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(fullResizedPath).pipe(res);
    }
  }
});

export default resizeRoute;
