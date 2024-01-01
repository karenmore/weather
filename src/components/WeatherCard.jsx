import { useState, useEffect } from "react"
import './WeatherCard.css'

const WeatherCard = ({ weather, temp, onSearch }) => {

    const [isCelsius, setCelsius] = useState(true)
    const [cityName, setCityName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isDaytime, setIsDaytime] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    
    const handleChangeTemp = () => {
        setCelsius(state => !state)
    }
     
    const handleSearch = (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        onSearch(cityName, countryCode);
    };

    const handleImageLoad = () => { 
        setImgLoaded(true);
    };
      
    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}.png`;
    };
       

    useEffect(() => { // verificar si en el tiempo actual es de dia o de noche
        if (weather) {
            //console.log(weather);
        const sunriseTimestamp = weather.sys.sunrise;
        const sunsetTimestamp = weather.sys.sunset;
        const currentTime = new Date().getTime() / 1000; // Tiempo actual en formato UNIX timestamp

            if (currentTime > sunriseTimestamp && currentTime < sunsetTimestamp) {
                setIsDaytime(true);
                }   else {
                setIsDaytime(false);
                }
            }
    }, [weather]);

    return(
        <article className="weather">
            <h1 className="weather__title">Weather App</h1>
            <h2 className="weather__subtitle">{weather?.name}, {weather?.sys.country}</h2>
            <section className="weather__body">
            <header className="weather__img">
          <img
            className={`weather__icon ${isDaytime ? 'day' : 'night'}`}
            src={weather && getWeatherIconUrl(weather?.weather[0].icon)}
            alt=""
            //onLoad={handleImageLoad}
          />

        </header>
                <article className="weather__info">
                    <h3 className="weather__info__title">"{weather?.weather[0].description}"</h3>
                    <ul className="weather__list">
                        <li className="weather__item">
                            <span className="weather__label">Wind Speed</span>
                            <span className="weather__value">${weather?.wind.speed} m/s</span>
                        </li>
                        <li className="weather__item">
                            <span className="weather__label">Clouds</span>
                            <span className="weather__value">${weather?.clouds.all} %</span>
                        </li>
                        <li className="weather__item">
                            <span className="weather__label">pressure</span>
                            <span className="weather__value">${weather?.main.pressure} hpa</span>
                        </li>
                    </ul>
                </article>
            </section>
            <footer className="weather__footer">
                <h2 className="weather__temp">{
                isCelsius 
                ? `${temp?.celsius} °C`  // '?.' Encadenamiento opcional (también conocido como operador de acceso seguro) evita los null o undefined
                : `${temp?.fahrenheit} °F`
                }</h2>
                <button onClick={handleChangeTemp} className="weather__btn">Change Temperature</button>               
                <form onSubmit={handleSearch} className="weather__form">
                    <div className="weather__form__input">
                        <input
                            type="text"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            placeholder="Enter city name"
                            className='weather__inputs'
                        />
                    </div>
                    <div className="weather__form__input">
                        <input
                            type="text"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            placeholder="Enter country code"
                            className='weather__inputs'
                        />
                    </div>
                    <button type="submit" className='weather__btn__search'>Search</button>
                </form>
            </footer>
        </article>
    )
}

export default WeatherCard

