import {useEffect, useState} from 'react';


function Weather() {
    const [weatherData, setWeatherData] = useState({
        temperature: '',
        city: '',
        humidity: '',
        windSpeed: '',
        description: '',
        icon: '',
    });
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
    const search = async (city) => {
        if (city === '') {
            alert('Please enter a city name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"a78292520ce2841bfeb5a3c6ded2e3a9"}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setWeatherData({
                temperature: Math.round(data.main.temp) + '°c',
                city: data.name,
                humidity: data.main.humidity + '%',
                windSpeed: data.wind.speed + 'km/h',
                description: data.weather[0].description,
                icon: icons[data.weather[0].icon],
            })
        }
        catch (error) {
            console.error(error);
            alert('City not found');
        }
    }
    useEffect(() => {
        search('Alexandria')
    }, []);



    const [city, setCity] = useState('');
    return (
        <div className="flex flex-col justify-center items-center gap-10 bg-violet-400 p-8 rounded-lg">
            <div className={"flex gap-3"}>
                <input
                    className="h-12 border-0 outline-none pl-6 text-lg text-neutral-600  bg-blue-100 rounded-3xl"
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
            <div>
                <img className={"w-20"} src={weatherData.icon} alt=""/>
                <p className={"text-white text-lg"}>{weatherData.description}</p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h1 className={"text-6xl font-bold text-white"}>{weatherData.temperature}</h1>
                <p className={"text-3xl text-white"}>{weatherData.city}</p>
            </div>
            <div className={"flex justify-between w-full"}>
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

        </div>
    );
}

export default Weather;

