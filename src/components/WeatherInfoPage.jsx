import { useState } from "react"
import iconloading from "/src/assets/images/icon-loading.svg"
import Units from "./Units";
import sunny from "/src/assets/images/icon-sunny.webp"
import snowicon from "/src/assets/images/icon-snow.webp"
import drizzleicon from "/src/assets/images/icon-drizzle.webp"
import fogicon from "/src/assets/images/icon-fog.webp"
import overcasticon from "/src/assets/images/icon-overcast.webp"
import partlycloudyicon from "/src/assets/images/icon-partly-cloudy.webp"
import rainyicon from "/src/assets/images/icon-rain.webp"
import stormicon from "/src/assets/images/icon-storm.webp"
import downicon from '/src/assets/images/icon-dropdown.svg'
import DailyForecast from "./DailyForecast";
import Button from "./Button";
import HourlyForecast from "./HourlyForecast";

const WeatherInfoPage = ({ loading, weatherData }) => {
  const [daysDropdown, setDaysDropdown] = useState(false);
  const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const allDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const [days, setDays] = useState(allDays[new Date().getDay()]);

  const todayWeatherCodeToIcon = (code) => {
    if (code === 0) return sunny;
    if (code === 1 || code === 2) return partlycloudyicon;
    if (code === 3) return overcasticon;
    if (code === 45 || code === 48) return fogicon;
    if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return drizzleicon;
    if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) return rainyicon;
    if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return snowicon;
    if (code === 95 || code === 96 || code === 99) return stormicon;

    return sunny;
  }
  const today_weather_icon = todayWeatherCodeToIcon(weatherData.weathercode);

  function handleDaysClick() {
    setDaysDropdown(!daysDropdown);
  }
  function getDaySlice(day) {
    const dayIndex = allDays.indexOf(day);
    const start = dayIndex * 24;
    const end = start + 24;
    return {
      hourlyTime: weatherData.hourlyTime.slice(start, end),
      hourlyweathercode: weatherData.hourlyweathercode.slice(start, end),
      hourlyTemp: weatherData.hourlyTemp.slice(start, end)
    }
  }

  function handleSelectDay(day) {
    setDays(day);
    setDaysDropdown(false);
  }
  return (
    <div className="my-4 md:flex justify-between gap-6 w-full">
      <div className="md:w-[68%]">
        <div className={`mb-5 md:mb-7 p-7 rounded-2xl h-[270px] w-full bg-cover bg-no-repeat ${loading ? 'bg-transparent-bg' : 'bg-[url(/src/assets/images/bg-today-small.svg)] md:bg-[url(/src/assets/images/bg-today-large.svg)]'}`}>
          {
            loading ?
              <div className="flex flex-col items-center justify-center h-full">
                <img className="animate-spin w-6" src={iconloading} alt="" />
                <p>Loading...</p>
              </div> : <div className="h-full flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-start">
                  <h2 className="text-3xl dm-sans-semibold mb-2">{weatherData?.cityName}, {weatherData?.cityCountry}</h2>
                  <p className="text-base text-gray-300">{allDays[new Date().getDay()]}, {allMonths[new Date().getMonth()]} {new Date().getDay()}, {new Date().getFullYear()}</p>
                </div>
                <div className="flex items-center gap-8">
                  <img className="w-24" src={today_weather_icon} alt="sunny" />
                  <h3 className="text-7xl md:text-8xl dm-sans-semibold-italic">{weatherData?.temperature}°</h3>
                </div>
              </div>
          }
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Units loading={loading} unitname="Feels Like" unitValue={weatherData?.feelsLike} unit="°" />
          <Units loading={loading} unitname="Humidity" unitValue={weatherData?.humidity} unit="%" />
          <Units loading={loading} unitname="Wind" unitValue={weatherData?.windSpeed} unit={weatherData?.windUnit} />
          <Units loading={loading} unitname="Precipitation" unitValue={weatherData?.precipitation} unit={weatherData?.precipUnit} />
        </div>
        <div className="mt-7">
          <h2 className="text-base dm-sans-semibold mb-3">Daily forecast</h2>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[0]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[0])} actualtemp={weatherData?.dailytemp[0]} feelsliketemp={weatherData?.dailyfeelslike[0]} />
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[1]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[1])} actualtemp={weatherData?.dailytemp[1]} feelsliketemp={weatherData?.dailyfeelslike[1]} />
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[2]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[2])} actualtemp={weatherData?.dailytemp[2]} feelsliketemp={weatherData?.dailyfeelslike[2]} />
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[3]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[3])} actualtemp={weatherData?.dailytemp[3]} feelsliketemp={weatherData?.dailyfeelslike[3]} />
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[4]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[4])} actualtemp={weatherData?.dailytemp[4]} feelsliketemp={weatherData?.dailyfeelslike[4]} />
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[5]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[5])} actualtemp={weatherData?.dailytemp[5]} feelsliketemp={weatherData?.dailyfeelslike[5]} />
            <DailyForecast loading={loading} day={allDaysShort[new Date(weatherData?.dailyday[6]).getDay()]} weatherIcon={todayWeatherCodeToIcon(weatherData?.dailyweathercode[6])} actualtemp={weatherData?.dailytemp[6]} feelsliketemp={weatherData?.dailyfeelslike[6]} />
          </div>

        </div>
      </div>
      <div className="md:w-[30%] md:mt-0 mt-5 bg-transparent-bg p-4 rounded-xl">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base dm-sans-semibold mb-3">Hourly forecast</h2>
          <div className="relative">
            <Button onClick={handleDaysClick} value={days}>
              {
                loading ? '-' : days
              }
              <img src={downicon} alt="down" />
            </Button>
            {
              daysDropdown &&
              <ul className="absolute top-12 right-0 bg-transparent-bg border-2 border-transparent-bg-hover p-2 rounded-md w-[180px] dm-sans-light">
                {
                  allDays.map((day) => (
                    <li key={day} className="p-2 rounded-md cursor-pointer hover:bg-transparent-bg-hover" value={day} onClick={() => handleSelectDay(day)}>
                      {day}
                    </li>
                  ))
                }
              </ul>
            }
          </div>
        </div>
        <div className="h-[547px] overflow-y-scroll flex flex-col justify-between gap-[9px]">
          {(() => {
            const selectedDay = getDaySlice(days);
            
            return selectedDay.hourlyTime.map((time, index) => (
              <HourlyForecast
                key={index}
                loading={loading}
                hourlyweatherIcon={todayWeatherCodeToIcon(selectedDay.hourlyweathercode[index])}
                time={new Date(time).toLocaleTimeString([], {hour: 'numeric', hour12: true})}
                actualtemperature={selectedDay.hourlyTemp[index]} />
            ))
          })()}
        </div>
      </div>
    </div>
  )
}

export default WeatherInfoPage