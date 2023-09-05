import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function handleDownload() {
  const canvas = document.querySelector("canvas");
  const imageDataURL = canvas.toDataURL("image/png");
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = imageDataURL;
}

function Canvas({
  backgroundImage,
  vectorImage,
  overlayX,
  overlayY,
  overlayWidth,
  overlayHeight,
  overlayTransparency,
  filterType,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!backgroundImage || !vectorImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const background = new Image();
    background.src = URL.createObjectURL(backgroundImage);

    background.onload = () => {
      const vector = new Image();
      vector.src = URL.createObjectURL(vectorImage);
      vector.onload = () => {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");

        tempCtx.drawImage(background, 0, 0, canvas.width, canvas.height);

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

        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = overlayTransparency / 100;
        ctx.drawImage(vector, overlayX, overlayY, overlayWidth, overlayHeight);
        ctx.globalAlpha = 1;
      };
    };
  }, [
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
        height={720}
      ></canvas>
      <div className="text-center p-4">
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
