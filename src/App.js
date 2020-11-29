import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import WeatherState from './context/weather/weatherState';

import Search from './components/Search';
import Spinner from './components/helpers/Spinner';
import Results from './components/Results';
import Credits from './components/layout/Credits';
import Image from './components/Image';

import './styles.min.css';
const secret = process.env.REACT_APP_SECRET;
const pexelsKey = process.env.REACT_APP_API_KEY;

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

  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  const getBackgroundImage = () => {
    const randomNumber = Math.floor(Math.random() * 19);

    setBgLoading(true);
    axios.get(`https://api.pexels.com/v1/search?query=nature&per_page=20`, {
      headers: {
        'Authorization': pexelsKey
      }
    }).then(response => {
      const randomImage = response.data.photos[randomNumber];

      setBackgroundImageSrc(randomImage.src)
      setPhotoUrl(randomImage.url)
      setBgLoading(false)
      setShowSearch(true)
      setBgLoadingError(false)
      setBgLoadingErrorMsg('')
    }).catch(error => {
      console.log(error)
      setBgLoading(false);
      setBgLoadingError(true);
      setShowSearch(true);
      setBgLoadingErrorMsg('Background image could not be loaded (you can still search for the weather!)');
    })
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
    setTimeout(() => setLoading(false), 1000);
    setShowResults(false);
    setTimeout(() => setShowResults(true), 1000);
  }

  const getData = query => {
    setLoading(true);
    setShowResults(false)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${secret}&units=metric`)
      .then(response => {
        // API response is too fast to show loading spinner on good connections, slowed output display by 1s for consistency
        setTimeout(() => outputRes(response), 1000);
      }).catch(error => {
        // And slowed by 1s for errors
        setTimeout(() => handleResError(error), 1000);
      })
  }

  return (
    <div className="App">
      {/* {bgLoading | bgLoadingError ? null : <img src={backgroundImageSrc} alt="Background" className="background-image"></img>} */}

      <Image alt="Scenic background" thumb={backgroundImageSrc.tiny} src={viewportWidth > 700 ? backgroundImageSrc.original : backgroundImageSrc.large2x}></Image>
      <div className={"container"}>
        {bgLoading && <Spinner></Spinner>}
        {bgLoadingError && <p className="bg-warning">{bgLoadingErrorMsg}</p>}
        {showSearch && <Search getData={getData} refresh={refresh}></Search>}
        {reqError && <div className="warning">{reqErrorMsg}</div>}
        {loading && <Spinner></Spinner>}
        {showResults && <Results weather={weather}></Results>}
        {bgLoading ? null : <Credits photoUrl={photoUrl}></Credits>}
      </div>
    </div>
  );



}


export default App;