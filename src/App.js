import hotweather from './pictures/sunset.jpg';
import coldweather from './pictures/snow.jpg';
import Description from './components/description';
import { useEffect, useState } from 'react';
import { WeatherData } from './WeatherMain';

function App() {

  const [weather, setWeather] = useState(null);
 const [units, setUnits] = useState('metric')
const [city,setCity] = useState('paris')
const [bg, setBg] = useState(hotweather)

//using useEffect to fetch the data
  useEffect(() => {
    const FetchData = async () => {
      const data = await WeatherData(city,units)
      setWeather(data);


      const threshold = units === 'metric' ? 20 : 60;
      if(data.temp <= threshold) setBg(coldweather);
    else setBg(hotweather)
  }
    FetchData()
  }, [units, city])

// making change from Celcius to Ferhanait by button
  const handleTempUnit = (e)=> {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C'
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

// making input field dynamic 
  const inputFieldData = (e)=>{
 if(e.keyCode === 13){
  setCity(e.currentTarget.value)
  e.currentTarget.blur()
 }
  }



  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {
          weather && (

            <div className='container'>
            {/* input section for getting city name  */}
            <div className='section section__inputs'>
              <input type="text" name="city" placeholder="Enter city" onKeyDown={(e)=>inputFieldData(e)} />
              <button onClick={(e)=> handleTempUnit(e)}>  °F</button>
            </div>
            {/* section for temprature, icon and weather state  */}
            <div className='section section___temprature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.IconURL} alt="weather Icon "  />
                <h3>{weather.description}</h3>
              </div>
              <div className='temprature'>
                <h1> {`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            {/* other weather details  */}
            <Description weather={weather} units={units} />
          </div>

          )
        }
       
      </div>

    </div>
  );
}

export default App;
