const HourlyForecast = ({ loading, hourlyweatherIcon, time, actualtemperature }) => {
    return (
        <div className="flex justify-between items-center h-[60px] px-3 bg-transparent-bg-hover rounded-xl ">
            {
                loading ? <></> : <>
                    <div className='flex items-center justify-between gap-3'>
                        <img className="w-8 my-3" alt="hourly" src={hourlyweatherIcon} />
                        <h4 className='text-gray-200 text-md dm-sans-regular'>{time}</h4>
                    </div>
                    <p className="text-gray-200 text-sm dm-sans-regular">{actualtemperature}°</p>
                </>
            }
        </div>
    )
}

export default HourlyForecast