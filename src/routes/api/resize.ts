import express, { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

const resizeRoute = express.Router();

resizeRoute.get('/', (req: Request, res: Response): void => {
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
        console.log('Image already exists!');
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
      try {
        sharp(fullImagePath)
          .resize(imageWidth, imageHeight, {
            kernel: sharp.kernel.nearest,
            fit: 'cover',
            position: 'right top',
            background: { r: 255, g: 255, b: 255, alpha: 0.5 },
          })
          .toFile(fullResizedPath)
          .then(() => {
            console.log('Image is resized successfully!');
            res.writeHead(200, { 'Content-Type': 'image/png' });
            fs.createReadStream(fullResizedPath).pipe(res);
          });
      } catch (error) {
        throw new Error(
          JSON.stringify({
            message: "Image couldn't be resized!",
          })
        );
      }
    }
  }
});

export default resizeRoute;
