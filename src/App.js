import React, { useState } from 'react';
import axios from 'axios';
import './styles.min.css';

import Search from './components/Search';
import Spinner from './components/Spinner';
import Results from './components/Results';
// const secret = process.env.REACT_APP_SECRET;
const secret = '200646fca1364597b7d843d81ebf6370';

const App = () => {
  const [reqError, setReqError] = useState(false);
  const [reqErrorMsg, setReqErrorMsg] = useState('');
  const [weather, setWeather] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const outputRes = (res) => {
    setReqError(false);
    setReqErrorMsg('');
    console.log('OK response', res.status);
    setWeather({ location: res.data.name, countryCode: res.data.sys.country, temp: res.data.main.temp.toFixed(1), feelsLike: res.data.main.feels_like.toFixed(1), type: res.data.weather[0].main, typeClassName: res.data.weather[0].main.toLowerCase(), windSpeed: res.data.wind.speed.toFixed(1) });
    setLoading(false);
    setShowResults(true);
  }

  const handleResError = (error) => {
    setReqError(true);
    setReqErrorMsg('Location not found');
    console.log('Failed request', error.response.status);
    setLoading(false)
    setShowResults(false)
    setTimeout(() => setReqError(false), 3000);
  }

  const refresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500);
    setShowResults(false);
    setTimeout(() => setShowResults(true), 1500);
  }

  const getData = async query => {
    try {
      setLoading(true);
      setShowResults(false)
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${secret}&units=metric`);
      // API response is too fast to show loading spinner on good connections, slowed output display by 1.5s for consistency
      setTimeout(() => outputRes(res), 1500);
    } catch (error) {
      // And slowed by 1s for errors
      setTimeout(() => handleResError(error), 1000);
    }
  }


  return (
    <div className="App">
      <div className={"container weather-bg-default"}>
        <Search getData={getData} refresh={refresh}></Search>
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