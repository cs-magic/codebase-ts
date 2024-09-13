export function svg2png(svgString, fileName, ppi = 320) {
  return new Promise((resolve, reject) => {
    // Create a DOM parser
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = svgDoc.documentElement;

    // Get SVG dimensions in pixels
    const widthPx = parseInt(
      svg.getAttribute("width") || svg.viewBox.baseVal.width,
    );
    const heightPx = parseInt(
      svg.getAttribute("height") || svg.viewBox.baseVal.height,
    );

    // Calculate dimensions for the desired PPI
    const scaleFactor = ppi / 96; // Standard screen PPI is 96
    const width = Math.round(widthPx * scaleFactor);
    const height = Math.round(heightPx * scaleFactor);

    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Create an image from the SVG string
    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Set the canvas to render at high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw the image on the canvas, scaling it up
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to PNG
      canvas.toBlob((blob) => {
        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;

        // Trigger the download
        downloadLink.click();

        // Clean up
        URL.revokeObjectURL(downloadLink.href);
        resolve();
      }, "image/png");
    };

    img.onerror = reject;
    img.src = url;
  });
}
