import React, { useState } from 'react'
import Spinner from './helpers/Spinner';
import Results from './Results';
import { connect } from 'react-redux';

const secret = process.env.REACT_APP_SECRET;

function Search(props) {
    const [query, setQuery] = useState('');
    // const [prevQuery, setPrevQuery] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [weatherData, setWeatherData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (query) => {
        setIsLoading(true)
        setError(false)

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${secret}&units=metric&lang=${props.langVals.OWM_API_shortcode}`)
            const formattedRes = await res.json();
            if (res.code !== "404") {
                setWeatherData(formattedRes)
            }
            // Loading icon flashes too quickly without a slight delay
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            if (res.status === 404) {
                // Delayed to give user a chance to see loading state
                setTimeout(() => {
                    setError(true)
                    setErrorMsg(props.langVals.errors.notFound)
                    setIsLoading(false);
                }, 1000);
            }
        } catch (err) {
            // Handle request errors so they are visible to the user
            setError(true)
            setErrorMsg(props.langVals.errors.notFound)
            setIsLoading(false);
            console.log("Error loading data from API: ", err)
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (e.target.query.value.length < 1 | e.target.query.value.startsWith(' ')) {
            setError(true);
            setErrorMsg(props.langVals.errors.inputError)
        }
        // #1 - This was designed to cut down on unnecessary API calls.
        // A more programmatic approach would be better
        //  else if (prevQuery === query) {
        //     // refresh();
        //     console.log("Refresh")
        // } 
        else {
            setQuery(e.target.value)
            fetchData(query)
            // Part of comment #1
            // setPrevQuery(query)
            let capitalisedDocTitle = query.charAt(0).toUpperCase() + query.slice(1)
            document.title = `theweather.xyz | ${capitalisedDocTitle}`
            setQuery('')
        }
    }
    const handleInputChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value);
        setError(false);
        setErrorMsg('')
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <input type="text" inputMode="search" name="query" placeholder={props.langVals.search.placeholder} onChange={handleInputChange} value={query}></input>
            <button className="button">{props.langVals.search.buttonText}</button>
        </form>
        {isLoading && <Spinner></Spinner>}
        {error && <div className="warning">{errorMsg}</div>}
        {!error && <Results weatherData={weatherData} langVals={props.langVals.results} isLoading={isLoading}></Results>}
    </>
    )
}

const mapStateToProps = state => {
    return {
        langVals: state.langVals
    }
}
export default connect(mapStateToProps)(Search);