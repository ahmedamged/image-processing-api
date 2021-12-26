import sharp from 'sharp';

async function imageResize(
  fullImagePath: string,
  fullResizedPath: string,
  imageWidth: number,
  imageHeight: number
): Promise<void> {
  try {
    await sharp(fullImagePath)
      .resize(imageWidth, imageHeight, {
        kernel: sharp.kernel.nearest,
        fit: 'cover',
        position: 'right top',
        background: { r: 255, g: 255, b: 255, alpha: 0.5 },
      })
      .toFile(fullResizedPath);
  } catch (error) {
    throw new Error(
      JSON.stringify({
        message: "Image couldn't be resized!",
      })
    );
  }
}

export default imageResize;
