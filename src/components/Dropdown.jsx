import { imperialContext } from "../context/imperialContext";
import { useContext } from "react"
import Button from "./Button";
import checkmark from "/src/assets/images/icon-checkmark.svg"

const Dropdown = () => {
    const value = useContext(imperialContext);
    function handleImperialToggle() {
        value.setImperial(!value.imperial);
        console.log(value.imperial);
    }

    return (
        <div className="absolute top-12 z-10 right-0 bg-transparent-bg rounded-md w-[220px] dm-sans-light">
            <div className="p-1">
                <Button onClick={handleImperialToggle}>
                    {value.imperial ? <p>Switch to Imperial</p> : <p>Switch to Metric</p>}
                </Button>
                <div className="border-b border-gray-500 px-1 py-2 flex flex-col gap-2">
                    <label className="text-sm text-gray-400 px-2">Temperature</label>
                    <p className={`flex justify-between items-center px-2 py-2 ${value.imperial ? "" : "bg-transparent-bg-hover rounded-md"} `}>
                        Celsius (°C) {value.imperial ? '' : <img src={checkmark} alt="checkmark" />}
                    </p>
                    <p className={`flex justify-between items-center px-2 py-2 ${value.imperial ? "bg-transparent-bg-hover rounded-md" : ""} `}>
                        Fahrenheit (°F) {value.imperial ? <img src={checkmark} alt="checkmark" /> : ''}
                    </p>
                </div>
                <div className="border-b border-gray-500 px-1 py-2 flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Wind Speed</label>
                    <p className={`flex justify-between items-center px-2 py-2 ${value.imperial ? "" : "bg-transparent-bg-hover rounded-md"} `}>
                        km/h {value.imperial ? '' : <img src={checkmark} alt="checkmark" />}
                    </p>
                    <p className={`flex justify-between items-center px-2 py-2 ${value.imperial ? "bg-transparent-bg-hover rounded-md" : ""} `}>
                        mph {value.imperial ? <img src={checkmark} alt="checkmark" /> : ''}
                    </p>
                </div>
                <div className="px-1 py-2 flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Precipitation</label>
                    <p className={`flex justify-between items-center px-2 py-2 ${value.imperial ? "" : "bg-transparent-bg-hover rounded-md"} `}>
                        Millimeters (mm) {value.imperial ? '' : <img src={checkmark} alt="checkmark" />}
                    </p>
                    <p className={`flex justify-between items-center px-2 py-2 ${value.imperial ? "bg-transparent-bg-hover rounded-md" : ""} `}>
                        Inches (in) {value.imperial ? <img src={checkmark} alt="checkmark" /> : ''}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Dropdown