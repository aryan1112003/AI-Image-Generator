export function addWatermark(imageUrl: string, text: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(imageUrl);

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Add watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '20px Arial';
      ctx.rotate(-45 * Math.PI / 180);
      
      // Repeat watermark pattern
      for (let i = -canvas.height; i < canvas.width * 2; i += 200) {
        for (let j = -canvas.width; j < canvas.height * 2; j += 200) {
          ctx.fillText(text, i, j);
        }
      }

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => resolve(imageUrl);
  });
}