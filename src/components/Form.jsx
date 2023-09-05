import { useState } from "react";
import PropTypes from "prop-types";

function Form({ onOverlay }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [vectorImage, setVectorImage] = useState(null);
  const [overlayX, setOverlayX] = useState(35);
  const [overlayY, setOverlayY] = useState(35);
  const [overlayWidth, setOverlayWidth] = useState(150);
  const [overlayHeight, setOverlayHeight] = useState(150);
  const [overlayTransparency, setOverlayTransparency] = useState(100);
  const [filterType, setFilterType] = useState("none");

  return (
    <main className="container">
      <div className="row justify-content-center">
        <form className="col-md-6 col-lg-4">
          <div className="form-group mt-3">
            <label htmlFor="vectorImage">Upload vector file:</label>
            <input
              className="form-control mb-2"
              type="file"
              id="vectorImage"
              accept=".png,.svg"
              onChange={(e) => setVectorImage(e.target.files[0])}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="backgroundImage">Upload image file</label>
            <input
              className="form-control mb-2"
              type="file"
              id="backgroundImage"
              accept="image/*"
              onChange={(e) => setBackgroundImage(e.target.files[0])}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="overlayX">Overlay Position X:</label>
            <input
              className="form-control mb-2"
              type="number"
              id="overlayX"
              value={overlayX}
              onChange={(e) => setOverlayX(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="overlayY">Overlay Position Y:</label>
            <input
              className="form-control mb-2"
              type="number"
              id="overlayY"
              value={overlayY}
              onChange={(e) => setOverlayY(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="overlayWidth">Overlay Width:</label>
            <input
              className="form-control mb-2"
              type="number"
              id="overlayWidth"
              value={overlayWidth}
              onChange={(e) => setOverlayWidth(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="overlayHeight">Overlay Height:</label>
            <input
              className="form-control mb-2"
              type="number"
              id="overlayHeight"
              value={overlayHeight}
              onChange={(e) => setOverlayHeight(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="overlayTransparency">
              Overlay Transparency (0-100):
            </label>
            <input
              className="form-control-range mb-2"
              type="range"
              id="overlayTransparency"
              min={0}
              max={100}
              value={overlayTransparency}
              onChange={(e) => setOverlayTransparency(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="filterType">Apply Filter/Effect:</label>
            <select
              className="form-control mb-2"
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="none">None</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
            </select>
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={() =>
              onOverlay({
                backgroundImage,
                vectorImage,
                overlayX,
                overlayY,
                overlayWidth,
                overlayHeight,
                overlayTransparency,
                filterType,
              })
            }
            type="button"
          >
            Overlay
          </button>
        </form>
      </div>
    </main>
  );
}

Form.propTypes = {
  onOverlay: PropTypes.func.isRequired,
};

export default Form;
