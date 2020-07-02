import React from 'react';

import loadingGif from '../img/loading.svg';

export default function Spinner() {
    return (
        <>
            <img src={loadingGif} alt="loading"></img>
        </>
    )
}
