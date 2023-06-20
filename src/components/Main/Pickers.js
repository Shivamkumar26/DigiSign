import React from "react";

const Pickers = ({
  penColor,
  handleColorChange,
  backgroundColor,
  handleBackgroundChange,
  pixelWidth,
  handlePixelWidthChange
}) => {
  return (
    <div className="color-picker">
      <label htmlFor="color">Color</label>
      <input
        type="color"
        id="color"
        value={penColor}
        onChange={handleColorChange}
      />

      <label htmlFor="background">Background</label>
      <input
        type="color"
        id="background"
        value={backgroundColor}
        onChange={handleBackgroundChange}
      />

      <label htmlFor="pixelWidth">Width</label>
      <input
        type="number"
        id="pixelWidth"
        min="1"
        value={pixelWidth}
        onChange={handlePixelWidthChange}
      />
    </div>
  );
};

export default Pickers;
