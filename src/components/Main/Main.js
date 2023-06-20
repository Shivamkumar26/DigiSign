import React, { useRef, useState, useEffect } from "react";
import Mobileview from "./Mobileview.js";
import Pickers from "./Pickers.js";
import "./main.css";

const Main = ({ isDarkMode }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [pixelWidth, setPixelWidth] = useState(2);
  const canvasRef = useRef(null);
  const layersRef = useRef([]);
  const currentLayerRef = useRef(null);
  const pathRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    layersRef.current.push(ctx);
    currentLayerRef.current = ctx;
  }, []);

  const handleColorChange = (event) => {
    setPenColor(event.target.value);
  };

  const handleBackgroundChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handlePixelWidthChange = (event) => {
    setPixelWidth(event.target.value);
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
    pathRef.current = [];
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(currentLayerRef.current.canvas, 0, 0);
    pathRef.current = [];
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = currentLayerRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    pathRef.current.push({ x, y });

    ctx.lineJoin = "round";
    ctx.strokeStyle = penColor;
    ctx.lineWidth = pixelWidth;
    drawPath(ctx);
  };

  const drawPath = (ctx) => {
    if (pathRef.current.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(pathRef.current[0].x, pathRef.current[0].y);

    for (let i = 1; i < pathRef.current.length; i++) {
      const { x, y } = pathRef.current[i];
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    layersRef.current = [];
    currentLayerRef.current = ctx;
    // setBackgroundColor("#ffffff");
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "signature.png";
    link.click();
  };

  const signaturePadStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 0px 0px 0px",
    backgroundColor: isDarkMode ? " #442D49" : "#fcf3f0"
  };

  return (
    <div className="footer">
      <div className="signature-pad" style={signaturePadStyle}>
        <Pickers
          penColor={penColor}
          handleColorChange={handleColorChange}
          backgroundColor={backgroundColor}
          handleBackgroundChange={handleBackgroundChange}
          pixelWidth={pixelWidth}
          handlePixelWidthChange={handlePixelWidthChange}
        />

        <div className="canvas-container">
          <canvas
            className="canvas"
            id="signature"
            width="700"
            height="400"
            ref={canvasRef}
            style={{ background: backgroundColor, cursor: "crosshair" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          ></canvas>
        </div>

        <div className="button-container">
          <button className="clearBtn" onClick={handleClear}>
            Clear
          </button>
          <button className="saveBtn" onClick={handleSave}>
            Save and Download
          </button>
        </div>
        <Mobileview />
      </div>
    </div>
  );
};

export default Main;
