import { useContext, useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import WeatherInfoPage from './WeatherInfoPage';
import SavedLocations from './SavedLocations';
import searchicon from "/src/assets/images/icon-search.svg";
import { imperialContext } from '../context/imperialContext';
import { supabase } from '../supabaseClient';

const MainContent = ({ user, onShowAuth }) => {
    const [apiError, setApiError] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [savedLocations, setSavedLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationPermissionAsked, setLocationPermissionAsked] = useState(false);
    const [showLocationPrompt, setShowLocationPrompt] = useState(false);
    let suggestionDelay = 500;
    const value = useContext(imperialContext);
    const cityEndpoint = "https://geocoding-api.open-meteo.com/v1/search?name=";

    const defaultCity = {
        name: "Lagos",
        country: "Nigeria",
        latitude: 6.5244,
        longitude: 3.3792
    };

    useEffect(() => {
        if (user) {
            loadSavedLocations();
        }
    }, [user]);

    useEffect(() => {
        const asked = localStorage.getItem('locationPermissionAsked');
        if (!asked) {
            setShowLocationPrompt(true);
        } else {
            loadInitialWeather();
        }
    }, []);

    useEffect(() => {
        if (currentLocation && !loading) {
            fetchWeatherData(
                currentLocation.latitude,
                currentLocation.longitude,
                currentLocation.name,
                currentLocation.country
            );
        }
    }, [value.imperial]);

    const loadInitialWeather = () => {
        fetchWeatherData(defaultCity.latitude, defaultCity.longitude, defaultCity.name, defaultCity.country);
    };

    const getCityFromCoordinates = async (latitude, longitude) => {
        try {
            // Try BigDataCloud API first (no API key needed, more reliable)
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            
            console.log("Reverse geocoding result:", data);
            
            const city = data.city || data.locality || data.principalSubdivision || "Your Location";
            const country = data.countryName || "";
            
            console.log("Extracted city:", city, "country:", country);
            
            return { city, country };
        } catch (error) {
            console.error("Error reverse geocoding:", error);
            
            // Fallback: try to find nearest city using Open-Meteo
            try {
                const fallbackResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
                );
                const fallbackData = await fallbackResponse.json();
                
                if (fallbackData.results && fallbackData.results.length > 0) {
                    return {
                        city: fallbackData.results[0].name,
                        country: fallbackData.results[0].country
                    };
                }
            } catch (fallbackError) {
                console.error("Fallback geocoding failed:", fallbackError);
            }
            
            return { city: "Your Location", country: "" };
        }
    };

    const handleUseCurrentLocation = () => {
        if ("geolocation" in navigator) {
            setShowLocationPrompt(false);
            setLoading(true);
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    console.log("Got coordinates:", latitude, longitude);
                    
                    const { city, country } = await getCityFromCoordinates(latitude, longitude);
                    
                    console.log("Final city name:", city);
                    
                    setCurrentLocation({
                        latitude,
                        longitude,
                        name: city,
                        country
                    });
                    
                    await fetchWeatherData(latitude, longitude, city, country);
                    
                    localStorage.setItem('locationPermissionAsked', 'true');
                    setLocationPermissionAsked(true);
                    setLoading(false);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    loadInitialWeather();
                    localStorage.setItem('locationPermissionAsked', 'true');
                    setLocationPermissionAsked(true);
                    setLoading(false);
                }
            );
        } else {
            loadInitialWeather();
            localStorage.setItem('locationPermissionAsked', 'true');
            setShowLocationPrompt(false);
            setLocationPermissionAsked(true);
        }
    };

    const handleUseDefaultLocation = () => {
        loadInitialWeather();
        localStorage.setItem('locationPermissionAsked', 'true');
        setShowLocationPrompt(false);
        setLocationPermissionAsked(true);
    };

    async function loadSavedLocations() {
        if (!user) return;

        const { data, error } = await supabase
            .from('saved_locations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setSavedLocations(data);
        }
    }

    async function saveLocation(city, country, lat, lon) {
        if (!user) {
            return;
        }

        const { data, error } = await supabase
            .from('saved_locations')
            .upsert(
                {
                    user_id: user.id,
                    city_name: city,
                    country: country,
                    latitude: lat,
                    longitude: lon,
                },
                { onConflict: 'user_id,city_name' }
            )
            .select();

        if (!error) {
            loadSavedLocations();
        }
    }

    async function deleteLocation(id) {
        if (!user) return;
        await supabase.from('saved_locations').delete().eq('id', id);
        loadSavedLocations();
    }

    async function handleInputChange(e) {
        let valueInput = e.target.value;
        setSearchInput(valueInput);

        if (valueInput.length < 2) {
            setCitySuggestions([]);
            return;
        }

        clearTimeout(suggestionDelay);
        suggestionDelay = setTimeout(async () => {
            try {
                const cityResponse = await fetch(cityEndpoint + valueInput);
                const cityInfo = await cityResponse.json();

                if (cityInfo.results) {
                    setCitySuggestions(cityInfo.results.slice(0, 5));
                } else {
                    setCitySuggestions([]);
                }
            } catch (error) {
                console.error(error);
            }
        }, 500);
    }

    async function fetchWeatherData(lat, lon, city, country) {
        const windUnit = value.imperial ? "mph" : "kmh";
        const precipUnit = value.imperial ? "inch" : "mm";
        const tempUnit = value.imperial ? "fahrenheit" : "celsius";

        try {
            setLoading(true);
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weathercode` +
                `&hourly=temperature_2m,apparent_temperature,weathercode` +
                `&daily=weather_code,temperature_2m_max,apparent_temperature_max` +
                `&temperature_unit=${tempUnit}` +
                `&wind_speed_unit=${windUnit}` +
                `&precipitation_unit=${precipUnit}` +
                `&timezone=auto`
            );
            const weatherInfo = await weatherResponse.json();
            const current = weatherInfo.current;
            const currentUnit = weatherInfo.current_units;
            const daily = weatherInfo.daily;
            const hourly = weatherInfo.hourly;

            const newWeatherData = {
                cityName: city,
                cityCountry: country,
                latitude: lat,
                longitude: lon,
                temperature: current.temperature_2m,
                feelsLike: current.apparent_temperature,
                humidity: current.relative_humidity_2m,
                windSpeed: current.wind_speed_10m,
                precipitation: current.precipitation,
                windUnit: currentUnit.wind_speed_10m,
                precipUnit: currentUnit.precipitation,
                tempUnit: currentUnit.temperature_2m,
                weathercode: current.weathercode,
                dailyday: daily.time,
                dailytemp: daily.apparent_temperature_max,
                dailyfeelslike: daily.apparent_temperature_max,
                dailyweathercode: daily.weather_code,
                hourlyweathercode: hourly.weathercode,
                hourlyTime: hourly.time,
                hourlyTemp: hourly.temperature_2m,
            };

            setWeatherData(newWeatherData);
            setCurrentLocation({ latitude: lat, longitude: lon, name: city, country });

            if (user) {
                await saveLocation(city, country, lat, lon);
            }
        } catch (error) {
            console.error("Error fetching weather:", error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        setApiError(false);
        try {
            if (!searchInput) return;

            const cityResponse = await fetch(cityEndpoint + searchInput);
            const cityInfo = await cityResponse.json();

            if (!cityInfo.results || cityInfo.results.length === 0) {
                throw new Error("City not found");
            }

            const city = cityInfo.results[0];
            await fetchWeatherData(city.latitude, city.longitude, city.name, city.country);
        } catch (error) {
            console.error("Error fetching data:", error);
            setApiError(true);
        }
    }

    return (
        <>
            {showLocationPrompt && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-transparent-bg border border-transparent-bg-hover rounded-2xl p-6 max-w-md w-full">
                        <div className="text-center mb-6">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-lightblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h2 className="bricolage text-2xl mb-2">Use Your Location?</h2>
                            <p className="dm-sans-regular text-gray-400">
                                We'd like to show you weather for your current location. You can change this anytime.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleUseCurrentLocation}
                                disabled={loading}
                                className="w-full py-3 px-4 bg-lightblue hover:bg-darkblue rounded-lg text-white dm-sans-semibold transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Getting location...' : 'Use My Location'}
                            </button>
                            <button
                                onClick={handleUseDefaultLocation}
                                className="w-full py-3 px-4 bg-transparent-bg-hover hover:bg-transparent-bg rounded-lg text-gray-300 dm-sans-regular transition-colors"
                            >
                                Use Lagos (Default)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {apiError ? (
                <ErrorPage />
            ) : (
                <div className='mx-4 my-5 flex flex-col justify-center items-center'>
                    <h1 className='bricolage text-5xl mt-3'>How's the sky looking today?</h1>
                    
                    <div className='mt-10 mb-5 flex flex-col md:flex-row items-center gap-3 w-full md:w-min'>
                        <div className='flex relative items-center gap-3 bg-transparent-bg focus-within:ring ring-white ring-offset-[#02012B] ring-offset-2 py-2 px-4 rounded-md w-full md:w-100'>
                            <img className='w-4' src={searchicon} alt="search icon" />
                            <input
                                className='text-gray-300 outline-0 border-0 placeholder:text-gray-300 bg-transparent w-full'
                                type="text"
                                onChange={handleInputChange}
                                placeholder='Search for a place...'
                                value={searchInput}
                            />
                            {citySuggestions.length > 1 && (
                                <div className='absolute top-12 z-10 left-0 right-0 bg-transparent-bg border border-transparent-bg-hover rounded-md dm-sans-light'>
                                    <div className='p-2 flex flex-col gap-2'>
                                        {citySuggestions.map((city, index) => (
                                            <p
                                                key={index}
                                                className='bg-transparent-bg-hover flex justify-between items-center p-2 rounded-md text-sm cursor-pointer hover:bg-opacity-80'
                                                onClick={() => {
                                                    setSearchInput(city.name);
                                                    setCitySuggestions([]);
                                                    fetchWeatherData(city.latitude, city.longitude, city.name, city.country);
                                                }}
                                            >
                                                {city.name}, {city.country}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            className='bg-lightblue w-full md:w-24 py-2 px-4 rounded-md text-white focus:ring ring-lightblue ring-offset-[#02012B] ring-offset-2 hover:bg-darkblue transition-colors'
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>

                    {!user && weatherData && (
                        <div className="w-full mb-6 p-4 bg-transparent-bg border border-lightblue/30 rounded-lg">
                            <p className="text-center dm-sans-regular text-gray-300">
                                <span className="text-lightblue">💡 Tip:</span> Sign in to save your favorite locations and access them anytime!{' '}
                                <button
                                    onClick={onShowAuth}
                                    className="text-lightblue hover:text-darkblue underline transition-colors"
                                >
                                    Sign in now
                                </button>
                            </p>
                        </div>
                    )}

                    {user && savedLocations.length > 0 && (
                        <SavedLocations
                            locations={savedLocations}
                            onSelectLocation={fetchWeatherData}
                            onDeleteLocation={deleteLocation}
                        />
                    )}

                    {weatherData && <WeatherInfoPage loading={loading} weatherData={weatherData} />}
                </div>
            )}
        </>
    );
};

export default MainContent;
