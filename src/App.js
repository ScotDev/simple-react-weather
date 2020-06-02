import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './styles.min.css'

import Content from './components/Content';

const secret = process.env.REACT_APP_SECRET;

class App extends Component {
  state = { errorMsg: '', showClass: '', hideClass: 'hide', query: null, location: '', countryCode: '', temp: '', feelsLike: '', type: '', windSpeed: '', icon: '', typeClassName: '' };

  getData = () => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=${secret}&units=metric`).then(res => {
    console.log(res);
    this.setState({ hideClass: null, location: res.data.name, temp: res.data.main.temp.toFixed(1), feelsLike: res.data.main.feels_like.toFixed(1), type: res.data.weather[0].main, icon: res.data.weather[0].icon, windSpeed: res.data.wind.speed, countryCode: res.data.sys.country, typeClassName: res.data.weather[0].main.toLowerCase() });
  })
    .catch((error) => {
      if (error.response) {
        this.showError();
      }
    });

  showError = (error) => {
    this.setState({ showClass: 'show' });
    this.setState({ errorMsg: 'Location not found' })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.query !== null) {
      this.getData();
      this.setState({ showClass: null });
    } else {
      this.setState({ showClass: "show" });
      this.setState({ errorMsg: 'Please enter a location' })
    }
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value })
  }

  componentDidUpdate() {
    document.title = `theweather.xyz | ${this.state.location}`
  };

  render() {

    const { errorMsg, showClass, typeClassName, hideClass } = this.state;
    return (
      <div className="App">
        <div className={`container default-bg ${typeClassName}`}>
          <form className={`${showClass}`} onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Enter a location" ref={input => this.search = input} onChange={this.handleInputChange}></input>
            <div id="warning" className={`warning hide ${showClass}`}>{errorMsg}</div>
            <button className="button">Search</button>
          </form>
          <div className={`${hideClass}`}>
            <Content weather={this.state}></Content>
          </div>
          <div className="credits"><a href="https://github.com/ScotDev" rel="noopener noreferrer" target="_blank"
          >Created by ScotDev <i className="fab fa-github"></i></a></div>
        </div>
      </div>
    );
  }

}

export default App;
