import React from 'react';
import Spinner from './helpers/Spinner';
import Image from './Image';
import useAPI from '../hooks/useApi';
import Search from './Search'
import Credits from './layout/Credits'

const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const randomNumber = Math.floor(Math.random() * 19);
let randomImage;
const pexelsKey = process.env.REACT_APP_API_KEY;

export default function Content() {
    // Handles fetching bg image
    const imageData = useAPI("https://api.pexels.com/v1/search?query=nature&per_page=20",
        {
            method: 'get',
            headers: {
                'Authorization': pexelsKey
            }
        })
    if (imageData.isLoading) {
        return <Spinner></Spinner>
    }
    if (imageData.data) {
        randomImage = imageData.data.photos[randomNumber];
    }
    if (imageData.error) {
        console.log(imageData.error)
        return <p>Error</p>
    }

    return (
        <div className="container">
            {imageData.data && <Image alt="Scenic background" thumb={randomImage.src.tiny} src={viewportWidth > 700 ? randomImage.src.original : randomImage.src.large2x}></Image>}
            {!imageData.isLoading && <Search></Search>}
            <Credits></Credits>
        </div>
    )
}
