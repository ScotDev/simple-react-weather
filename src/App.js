import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import WeatherState from './context/weather/weatherState';

import Search from './components/Search';
import Spinner from './components/Spinner';
import Results from './components/Results';
import Credits from './components/layout/Credits';

import './styles.min.css';
const secret = process.env.REACT_APP_SECRET;
const pexels_key = process.env.REACT_PEXELS_API_KEY;


const App = () => {
  const [reqError, setReqError] = useState(false);
  const [reqErrorMsg, setReqErrorMsg] = useState('');
  const [weather, setWeather] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bgLoading, setBgLoading] = useState(true);
  const [bgLoadingError, setBgLoadingError] = useState(false);
  const [bgLoadingErrorMsg, setBgLoadingErrorMsg] = useState('');
  const [backgroundImageSrc, setBackgroundImageSrc] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('https://www.pexels.com/');

  const getBackgroundImage = async () => {

    const randomNumber = Math.floor(Math.random() * 9);

    try {
      setBgLoading(true);
      const imageData = await axios.get(`https://api.pexels.com/v1/search?query=mountains&per_page=10`, { headers: { Authorization: pexels_key } })
      const randomImage = imageData.data.photos[randomNumber];
      setBackgroundImageSrc(randomImage.src.original)
      setPhotoUrl(randomImage.url)
      setTimeout(() => setBgLoading(false), 5000)
      setTimeout(() => setShowSearch(true), 5000)
      setBgLoadingError(false)
      setBgLoadingErrorMsg('')
    } catch (error) {
      setBgLoading(false);
      setBgLoadingError(true);
      setShowSearch(true);
      setBgLoadingErrorMsg('Loading background image failed (you can still search for the weather!)');
    }

  }

  useEffect(() => {
    getBackgroundImage()
  }, [])



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
    // <WeatherState>
    <div className="App">
      {bgLoading | bgLoadingError ? null : <img src={backgroundImageSrc} alt="Background" className="background-image"></img>}
      <div className={"container"}>
        {bgLoading && <Spinner></Spinner>}
        {bgLoadingError && <p className="bg-warning">{bgLoadingErrorMsg}</p>}
        <div className="search-form">{showSearch ? <Search getData={getData} refresh={refresh}></Search> : null}
          {reqError && <div className="warning">{reqErrorMsg}</div>}
        </div>
        {loading && <Spinner></Spinner>}
        {showResults && <Results weather={weather}></Results>}
        {bgLoading ? null : <Credits photoUrl={photoUrl}></Credits>}
      </div>
    </div>
    // </WeatherState>
  );
}

export default App;