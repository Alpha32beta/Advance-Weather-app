import { useContext } from "react";
import { imperialContext } from "../context/imperialContext";
import Button from "./Button";
import checkmark from "/src/assets/images/icon-checkmark.svg";

const Dropdown = () => {
  const { imperial, setImperial } = useContext(imperialContext);

  const handleImperialToggle = () => {
    setImperial(!imperial);
  };

  return (
    <div className="absolute top-12 right-0 z-10 bg-transparent-bg rounded-md w-[220px] dm-sans-light">
      <div className="p-1">
       
        <Button onClick={handleImperialToggle}>
          {imperial ? <p>Switch to Metric</p> : <p>Switch to Imperial</p>}
        </Button>

        
        <div className="border-b border-gray-500 px-1 py-2 flex flex-col gap-2">
          <label className="text-sm text-gray-400 px-2">Temperature</label>
          <p
            onClick={() => setImperial(false)}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer ${
              !imperial ? "bg-transparent-bg-hover rounded-md" : ""
            }`}
          >
            Celsius (°C) {!imperial && <img src={checkmark} alt="checkmark" />}
          </p>
          <p
            onClick={() => setImperial(true)}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer ${
              imperial ? "bg-transparent-bg-hover rounded-md" : ""
            }`}
          >
            Fahrenheit (°F) {imperial && <img src={checkmark} alt="checkmark" />}
          </p>
        </div>

       
        <div className="border-b border-gray-500 px-1 py-2 flex flex-col gap-2">
          <label className="text-sm text-gray-400 px-2">Wind Speed</label>
          <p
            onClick={() => setImperial(false)}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer ${
              !imperial ? "bg-transparent-bg-hover rounded-md" : ""
            }`}
          >
            km/h {!imperial && <img src={checkmark} alt="checkmark" />}
          </p>
          <p
            onClick={() => setImperial(true)}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer ${
              imperial ? "bg-transparent-bg-hover rounded-md" : ""
            }`}
          >
            mph {imperial && <img src={checkmark} alt="checkmark" />}
          </p>
        </div>

       
        <div className="px-1 py-2 flex flex-col gap-2">
          <label className="text-sm text-gray-400 px-2">Precipitation</label>
          <p
            onClick={() => setImperial(false)}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer ${
              !imperial ? "bg-transparent-bg-hover rounded-md" : ""
            }`}
          >
            Millimeters (mm) {!imperial && <img src={checkmark} alt="checkmark" />}
          </p>
          <p
            onClick={() => setImperial(true)}
            className={`flex justify-between items-center px-2 py-2 cursor-pointer ${
              imperial ? "bg-transparent-bg-hover rounded-md" : ""
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
