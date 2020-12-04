import React, { useState } from "react";


const Image = props => {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <img
                className="image thumb"
                alt={props.alt}
                src={props.thumb}
                style={{ visibility: isLoaded ? "hidden" : "visible" }}
            />
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className="image full"
                style={{ opacity: isLoaded ? 1 : 0 }}
                alt={props.alt}
                src={props.src}
            />
        </>
    );
};
export default Image;