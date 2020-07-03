import React, { useState } from 'react'

export default function Search({ getData, refresh }) {
    const [query, setQuery] = useState('');
    const [prevQuery, setPrevQuery] = useState('');
    const [inputError, setInputError] = useState(false);
    const [inputErrorMsg, setInputErrorMsg] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (e.target.query.value.length < 1 | e.target.query.value.startsWith(' ')) {
            setInputError(true);
            setInputErrorMsg('Please enter a location')
            // setTimeout(() => setInputError(false), 3000)
        } else if (prevQuery === query) {
            refresh();
        } else {
            setQuery(e.target.value)
            getData(query)
            setPrevQuery(query)
            let capitalisedDocTitle = query.charAt(0).toUpperCase() + query.slice(1)
            document.title = `theweather.xyz | ${capitalisedDocTitle}`
            setQuery('')
        }
    }
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setInputError(false);
        setInputErrorMsg('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" inputMode="search" name="query" placeholder="Enter a location" onChange={handleInputChange} value={query}></input>
            <button className="button">Search</button>
            {inputError && <div id="warning" className="warning">{inputErrorMsg}</div>}
        </form>
    )
}
