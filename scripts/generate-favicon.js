const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
    
    // Convert SVG to PNG with different sizes
    const sizes = [16, 32, 64];
    
    const pngBuffers = await Promise.all(
      sizes.map(size =>
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Write the ICO file
    const ico = require('png-to-ico');
    const icoBuffer = await ico(pngBuffers);
    
    fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();