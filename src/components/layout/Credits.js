import React from 'react';

export default function Credits({ photoUrl }) {
    return (
        <div className="credits"><a href="https://github.com/ScotDev" rel="noopener noreferrer" target="_blank"
        >Created by ScotDev <i className="ri-github-fill"></i></a><a href={photoUrl} rel="noopener noreferrer" target="_blank"> Photos provided by Pexels</a></div>
    )
}
