const DailyForecast = ({ loading, day, weatherIcon, actualtemp, feelsliketemp }) => {
    return (
        <div className="bg-transparent-bg border border-transparent-bg-hover rounded-xl h-[150px] px-2 py-3 flex flex-col items-center justify-between">
            {
                loading ? <></> : <>
                    <h4>{day}</h4>
                    <img className="w-12 my-3" src={weatherIcon} alt="" />
                    <div className="flex items-center justify-between w-full">
                        <p className="text-gray-200 text-sm dm-sans-regular">{actualtemp}°</p>
                        <p className="text-gray-300 text-sm dm-sans-regular">{feelsliketemp}°</p>
                    </div>
                </>
            }
        </div>
    )
}

export default DailyForecast