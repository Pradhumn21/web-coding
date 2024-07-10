import axios from 'axios';
import './App.css';
import { useState } from 'react';



function App() {
const[inputData,setInputData]=useState("")
const[weatherData,setWeatherData]=useState({})
const[error,setError]=useState(false)
async function fetchdata(){
  try {
    let response=await axios({
      method:'get',
      url:`http://api.weatherapi.com/v1/current.json?key=632ffd9dd795436394382230240307&q=${inputData}`
    })
    let finaldata=response.data
  setWeatherData({
    Name:finaldata.location.name,
    temperature:finaldata.current.temp_c,
    Humidity:finaldata.current.humidity,
    windSpeed:finaldata.current.wind_kph
  })
  setInputData('')
  
  } catch (error) {
    console.log(error)
    setError(true)
  }
 }

function handleChange(event){
setInputData(event.target.value)
}

if(error){
  return(<div>Write correct country name</div>)
}

  return (
  <div className='weatherApp'>
  <h1>WeatherApp</h1>
   <div className='inputbtn'>
  <input type="text" placeholder='SearchCountry...' value={inputData} onChange={handleChange}/>
  <button onClick={fetchdata}>🔍</button>
  </div>
  <img src="https://th.bing.com/th/id/R.6f8f0a1379f61a433b90c34e95789927?rik=1gaWqvOg2rIyyg&riu=http%3a%2f%2fclipartmag.com%2fimages%2fsun-cloud-clipart-43.jpg&ehk=LdET%2b1eVdqThbnVGTLrjAc9QD40G7l3QhRtXkFOhkqY%3d&risl=&pid=ImgRaw&r=0" alt="" width={100} height={100} />
  {weatherData.temperature && <h2>{weatherData.temperature + "°C"}</h2>}
 <h1>{weatherData.Name}</h1>
 <div className='humidityWind'>
  <img src="https://media.istockphoto.com/id/1139459655/vector/humidity-icon-in-flat-style-climate-vector-illustration-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=SJLlkvZOVcWRVZZK4XyiFkI_BRxkoyiwgC1ozi9zUdQ=" alt="" width={30} height={30}/>
  {weatherData.Humidity?<p>Humidity:{weatherData.Humidity + "%"}</p>:<p>Humidity:</p>}
 <img src="https://st2.depositphotos.com/4520249/7571/v/450/depositphotos_75718829-stock-illustration-blowing-wind-icon.jpg" alt="" width={30} height={30}/>
 {weatherData.windSpeed?<p>windSpeed:{weatherData.windSpeed + "km/h"}</p>:<p>windSpeed:</p>}
  </div>
  </div>
  );
}

export default App;

