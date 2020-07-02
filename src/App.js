import React, { useState } from 'react';
import axios from 'axios';
import './styles.min.css';

import Search from './components/Search';
import Spinner from './components/Spinner';
import Results from './components/Results';
// const secret = process.env.REACT_APP_SECRET;
const secret = '2a6ae01e17df3c070d45fcd262b3d837';

const App = () => {
  const [reqError, setReqError] = useState(false);
  const [reqErrorMsg, setReqErrorMsg] = useState('');
  const [weather, setWeather] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  setTimeout(() => setReqError(false), 5000)

  const outputRes = (res) => {
    setReqError(false);
    setReqErrorMsg('');
    console.log('OK response', res.status);
    setWeather({ location: res.data.name, countryCode: res.data.sys.country, temp: res.data.main.temp.toFixed(1), feelsLike: res.data.main.feels_like.toFixed(1), type: res.data.weather[0].main, typeClassName: res.data.weather[0].main.toLowerCase(), windSpeed: res.data.wind.speed.toFixed(1) });
    setLoading(false);
    setShowResults(true)
  }

  const handleResError = (error) => {
    setReqError(true);
    setReqErrorMsg('Location not found');
    console.log('Failed request', error.response.status);
    setLoading(false)
    setShowResults(false)
    setTimeout(() => setReqError(false), 5000)
  }

  const getData = async query => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${secret}&units=metric`);
      outputRes(res);
    } catch (error) {
      handleResError(error);
    }
  }


  return (
    <div className="App">
      <div className={"container weather-bg-default"}>
        <Search getData={getData}></Search>
        {reqError && <div id="warning" className="warning">{reqErrorMsg}</div>}
        {loading && <Spinner></Spinner>}
        {showResults && <Results weather={weather}></Results>}
        <div className="credits"><a href="https://github.com/ScotDev" rel="noopener noreferrer" target="_blank"
        >Created by ScotDev <i className="ri-github-fill"></i></a></div>
      </div>
    </div>
  );
}

export default App;