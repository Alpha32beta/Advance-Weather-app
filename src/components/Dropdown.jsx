import { useContext } from "react";
import { imperialContext } from "../context/imperialContext";
import Button from "./Button";
import checkmark from "/src/assets/images/icon-checkmark.svg";

const Dropdown = ({ onClose }) => {
  const { imperial, setImperial } = useContext(imperialContext);

  const handleImperialToggle = () => {
    setImperial(!imperial);
    if (onClose) onClose();
  };

  const handleMetricSelect = () => {
    setImperial(false);
    if (onClose) onClose();
  };

  const handleImperialSelect = () => {
    setImperial(true);
    if (onClose) onClose();
  };

  return (
    <div className="absolute top-12 right-0 z-10 bg-transparent-bg rounded-md w-[220px] dm-sans-light border border-transparent-bg-hover">
      <div className="p-1">
        <Button onClick={handleImperialToggle}>
          {imperial ? <p>Switch to Metric</p> : <p>Switch to Imperial</p>}
        </Button>

        <div className="border-b border-gray-500 px-1 py-2 flex flex-col gap-2">
          <label className="text-sm text-gray-400 px-2">Temperature</label>
          <p
            onClick={handleMetricSelect}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded-md ${
              !imperial ? "bg-transparent-bg-hover" : "hover:bg-transparent-bg-hover"
            }`}
          >
            Celsius (°C) {!imperial && <img src={checkmark} alt="checkmark" />}
          </p>
          <p
            onClick={handleImperialSelect}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded-md ${
              imperial ? "bg-transparent-bg-hover" : "hover:bg-transparent-bg-hover"
            }`}
          >
            Fahrenheit (°F) {imperial && <img src={checkmark} alt="checkmark" />}
          </p>
        </div>

        <div className="border-b border-gray-500 px-1 py-2 flex flex-col gap-2">
          <label className="text-sm text-gray-400 px-2">Wind Speed</label>
          <p
            onClick={handleMetricSelect}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded-md ${
              !imperial ? "bg-transparent-bg-hover" : "hover:bg-transparent-bg-hover"
            }`}
          >
            km/h {!imperial && <img src={checkmark} alt="checkmark" />}
          </p>
          <p
            onClick={handleImperialSelect}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded-md ${
              imperial ? "bg-transparent-bg-hover" : "hover:bg-transparent-bg-hover"
            }`}
          >
            mph {imperial && <img src={checkmark} alt="checkmark" />}
          </p>
        </div>

        <div className="px-1 py-2 flex flex-col gap-2">
          <label className="text-sm text-gray-400 px-2">Precipitation</label>
          <p
            onClick={handleMetricSelect}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded-md ${
              !imperial ? "bg-transparent-bg-hover" : "hover:bg-transparent-bg-hover"
            }`}
          >
            Millimeters (mm) {!imperial && <img src={checkmark} alt="checkmark" />}
          </p>
          <p
            onClick={handleImperialSelect}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded-md ${
              imperial ? "bg-transparent-bg-hover" : "hover:bg-transparent-bg-hover"
            }`}
          >
            Inches (in) {imperial && <img src={checkmark} alt="checkmark" />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
