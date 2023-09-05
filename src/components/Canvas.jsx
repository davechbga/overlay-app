import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Define a function to handle image download.
function handleDownload() {
  const canvas = document.querySelector("canvas");
  const imageDataURL = canvas.toDataURL("image/png");
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = imageDataURL;
}

// Define the Canvas component as a function.
function Canvas({
  // Define the props and their types.
  backgroundImage,
  vectorImage,
  overlayX,
  overlayY,
  overlayWidth,
  overlayHeight,
  overlayTransparency,
  filterType,
}) {
  // Create a mutable reference to the canvas element using useRef.
  const canvasRef = useRef(null);

  // useEffect is used to run code when certain dependencies change
  useEffect(() => {
    // Check if backgroundImage or vectorImage is not defined and return if so.
    if (!backgroundImage || !vectorImage) return;

    // Get the 2D context of the canvas using the reference.
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the current content of the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load the background image into an Image object and set an onload event.
    const background = new Image();
    background.src = URL.createObjectURL(backgroundImage);

    background.onload = () => {
      // Load the vector image in a similar way.
      const vector = new Image();
      vector.src = URL.createObjectURL(vectorImage);
      vector.onload = () => {
        // Create a temporary canvas to apply filters.
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        // Draw the background image on the temporary canvas.
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Apply a filter (grayscale or sepia) based on filterType.
        if (filterType === "grayscale") {
          const imageData = tempCtx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            const average = (red + green + blue) / 3;
            data[i] = average;
            data[i + 1] = average;
            data[i + 2] = average;
          }
          tempCtx.putImageData(imageData, 0, 0);
        } else if (filterType === "sepia") {
          const imageData = tempCtx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            const sepiaRed = Math.min(
              255,
              0.393 * red + 0.769 * green + 0.189 * blue
            );
            const sepiaGreen = Math.min(
              255,
              0.349 * red + 0.686 * green + 0.168 * blue
            );
            const sepiaBlue = Math.min(
              255,
              0.272 * red + 0.534 * green + 0.131 * blue
            );
            data[i] = sepiaRed;
            data[i + 1] = sepiaGreen;
            data[i + 2] = sepiaBlue;
          }
          tempCtx.putImageData(imageData, 0, 0);
        }

        // Draw the temporary canvas on the main canvas.
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

        // Apply transparency and overlay the vector image.
        ctx.globalAlpha = overlayTransparency / 100;
        ctx.drawImage(vector, overlayX, overlayY, overlayWidth, overlayHeight);
        ctx.globalAlpha = 1;
      };
    };
  }, [
    // Set the dependencies for the effect.
    backgroundImage,
    vectorImage,
    overlayX,
    overlayY,
    overlayWidth,
    overlayHeight,
    overlayTransparency,
    filterType,
  ]);

  return (
    <div className="row justify-content-center">
      <canvas
        className="p-5"
        ref={canvasRef}
        width={1280}
        height={1280}
      ></canvas>

      <div className="text-center mb-5">
        <a
          className="btn btn-success"
          id="downloadLink"
          download="overlayed_image.png"
          onClick={handleDownload}
        >
          Download image
        </a>
      </div>
    </div>
  );
}

// Define the expected properties and their types using PropTypes.
Canvas.propTypes = {
  backgroundImage: PropTypes.object,
  vectorImage: PropTypes.object,
  overlayX: PropTypes.number,
  overlayY: PropTypes.number,
  overlayWidth: PropTypes.number,
  overlayHeight: PropTypes.number,
  overlayTransparency: PropTypes.number,
  filterType: PropTypes.string,
};
export default Canvas;
