import React, { useReducer } from 'react';
import axios from 'axios';
import WeatherContext from './weatherContext';
import WeatherReducer from './weatherReducer';
import {
    OUTPUT_RES,
    HANDLE_RES_ERROR,
    REFRESH,
    GET_DATA,
    HANDLE_SUBMIT,
    HANDLE_INPUT_CHANGE
} from '../types'

const weatherState = props => {
    const initialState = {
        reqError: false,
        reqErrorMsg: '',
        weather: {},
        showResults: false,
        loading: false
    }

    const [state, dispatch] = useReducer(WeatherReducer, initialState);


    // Get data

    // Handle successful response

    // Handle failed response

    // Refresh output

    // Handle form submit

    // Handle form input change

    return <WeatherContext.Provider value={{
        reqError: state.reqError,
        reqErrorMsg: state.reqErrorMsg,
        weather: state.weather,
        showResults: state.showResults,
        loading: state.loading
    }}>
        {props.children}
    </WeatherContext.Provider>
}

export default weatherState;