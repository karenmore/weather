import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [cityName, setCityName] = useState('')
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState();

  
  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success, (e) => {
      setError('Para ver el clima de tu localidad debes habilitar la ubicacion, desde la barra de navegacion');
      setIsLoading(false);
    })
  }, [])

  useEffect(()=>{
    if(coords){

      const API_KEY = '73be4439ed0f32b41dd8d76139fa77c6'
      const {lat, lon} = coords
      
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    
      axios.get(url)
      .then(res => {
        setWeather(res.data)
 
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
        } 
        setTemp(obj)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))

    }
  }, [coords])

  const handleCitySearch = (cityName, countryCode) => {
    setIsLoading(true)
    const API_KEY = '73be4439ed0f32b41dd8d76139fa77c6'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${API_KEY}`

    axios.get(url)
      .then(res => {
        setWeather(res.data)
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
        }
        setTemp(obj)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  //console.log(cityName)
  //console.log(weather)

  return (
    <div className='app'> 
      {
        isLoading ? (
           <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) :
          (
          <>
            <WeatherCard 
            weather={weather}
            temp={temp}
            cityName={cityName}
            onSearch={handleCitySearch}/>
          </>
          )
      }
    </div>
  )
}

export default App