import React from 'react';
import { connect } from 'react-redux';

function Credits(props) {
    return (
        <div className="credits"><a href="https://github.com/ScotDev" rel="noopener noreferrer" target="_blank"
        >{props.langVals.credits.created} ScotDev <i className="ri-github-fill"></i></a><a href='https://www.pexels.com/' rel="noopener noreferrer" target="_blank"> - {props.langVals.credits.pexels} Pexels</a></div>
    )
}

const mapStateToProps = state => {
    return {
        langOptions: state.langOptions,
        langVals: state.langVals
    }
}

export default connect(mapStateToProps)(Credits);