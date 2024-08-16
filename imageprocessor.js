const ImageProcessor = require('./imageProcessor');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const testImagePath = path.join(__dirname, 'testImages');
const tolerance = 0.1; // Adjust tolerance as needed

function compareImages(img1, img2, options = {}) {
  const img1Data = PNG.sync.read(img1);
  const img2Data = PNG.sync.read(img2);

  const { width, height } = img1Data;
  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(img1Data.data, img2Data.data, diff.data, width, height, options);

  return numDiffPixels;
}

describe('ImageProcessor', () => {
  it('should convert image to grayscale', async () => {
    const inputImagePath = path.join(testImagePath, 'input.jpg');
    const outputImagePath = path.join(testImagePath, 'output_grayscale.png');

    await ImageProcessor.applyFilter(inputImagePath, 'grayscale', outputImagePath);

    const numDiffPixels = compareImages(inputImagePath, outputImagePath, { threshold: tolerance });

    expect(numDiffPixels).to.be.below(100); // Adjust threshold as needed
  });

  // Add more test cases for other filters
});
