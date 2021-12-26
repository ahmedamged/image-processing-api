import imageResize from '../utilities/imageResizer';
import sizeOf from 'image-size';

describe('Test the resize functionality', () => {
  it('Should resize the image with the right width and height', () => {
    const filename = 'palmtunnel';
    const imageWidth = 900;
    const imageHeight = 900;
    const fullImagePath = `./images/${filename}.jpg`;
    const fullResizedPath = `./resized-images/${filename}-${imageWidth}x${imageHeight}.png`;
    imageResize(fullImagePath, fullResizedPath, imageWidth, imageHeight)
      .then((res) => {
        console.log(res);
        const resizedImageDimensions = sizeOf(fullResizedPath);
        expect(resizedImageDimensions.width).toEqual(imageWidth);
        expect(resizedImageDimensions.height).toEqual(imageHeight);
      })
      .catch((err) => console.log(err));
  });
});
