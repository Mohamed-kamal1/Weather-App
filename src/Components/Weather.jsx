import {useEffect, useState} from 'react';


function Weather() {
    // OpenWeatherMap API key
    const API_KEY = 'a78292520ce2841bfeb5a3c6ded2e3a9';
    // Weather data state
    const [weatherData, setWeatherData] = useState({
        temperature: '',
        city: '',
        humidity: '',
        windSpeed: '',
        description: '',
        icon: '',
    });
    // Weather icons
    const icons = {
        '01d': 'clear.png',
        '02d': 'mostly_clear.png',
        '03d': 'partly_cloudy.png',
        '04d': 'broken_clouds.png',
        '09d': 'rain.png',
        '10d': 'rain.png',
        '11d': 'storm.png',
        '13d': 'snow.png',
        '50d': 'mist.png',
        '01n': 'clear_night.png',
        '02n': 'mostly_clear_night.png',
        '03n': 'partly_cloudy_night.png',
        '04n': 'broken_clouds.png',
        '09n': 'rain_night.png',
        '10n': 'rain_night.png',
        '11n': 'storm_night.png',
        '13n': 'snow.png',
        '50n': 'mist.png',
    }
    // Forecast data state
    const [forecastData, setForecastData] = useState([]);
    // Search function
    const search = async (city) => {
        // Clear previous weather data and forecast data
        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();


            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();


            setWeatherData({
                temperature: `${Math.round(weatherData.main.temp)}°c`,
                city: weatherData.name,
                humidity: weatherData.main.humidity + '%',
                windSpeed: weatherData.wind.speed + 'km/h',
                description: weatherData.weather[0].description,
                icon: icons[weatherData.weather[0].icon],
            });

            setForecastData(forecastData.list.filter((_, index) => index % 8 === 0)); // Filter to get daily data
        } catch (error) {
            console.error(error);
            alert('City not found');
        }
    };

    // Fetch weather data on page load with 'Alexandria' as default city
    useEffect(() => {
        search('Alexandria')
    }, []);


    const [city, setCity] = useState('');
    return (
        <div className="flex flex-col justify-center items-center gap-8 bg-violet-400 p-8 rounded-lg">
            <div className={"flex gap-3 w-full"}>
                <input
                    className="h-12 w-full border-0 outline-none pl-6 text-lg text-neutral-600  bg-blue-100 rounded-3xl"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <img
                    onClick={() => search(city)}
                    className={"h-12 p-3 rounded-full bg-blue-100 cursor-pointer"}
                    src={"search.png"}
                    alt=""/>
            </div>
            <div className="flex flex-col items-center gap-2">
                <img className={"w-20"} src={weatherData.icon} alt=""/>
                <p className={"text-white text-lg"}>{weatherData.description}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h1 className={"text-6xl font-bold text-white"}>{weatherData.temperature}</h1>
                <p className={"text-3xl text-white"}>{weatherData.city}</p>
            </div>
            <div className={"flex justify-around w-full"}>
                <div className={"flex gap-2 items-center"}>
                    <img src={"humidity.png"} alt={""} className={"w-10"}/>
                    <div>
                        <p className={"text-white"}>{weatherData.humidity}</p>
                        <p className={"text-white text-sm"}>Humidity</p>
                    </div>
                </div>
                <div className={"flex gap-2 items-center"}>
                    <img src={"windy.png"} alt={""} className={"w-10"}/>
                    <div>
                        <p className={"text-white"}>{weatherData.windSpeed}</p>
                        <p className={"text-white text-sm"}>Wind speed</p>
                    </div>
                </div>
            </div>
            {/*================================*/}
            <div className="w-full mt-8">
                <h2 className="text-2xl text-white mb-4">5-Day Forecast</h2>
                <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                    {forecastData.map((day, index) => (
                        <div key={index} className="flex flex-col justify-center items-center bg-blue-100 p-4 rounded-lg ">
                            <p className="md:text-lg text-sm">{new Date(day.dt * 1000).toLocaleDateString(undefined, {
                                day: '2-digit',
                                month: '2-digit'
                            })}</p>
                            <img className="md:w-12 w-10" src={icons[day.weather[0].icon]} alt=""/>
                            <p className="md:text-lg text-sm">{Math.round(day.main.temp)}°C</p>
                            <p className="md:text-sm text-xs text-center">{day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Weather;

