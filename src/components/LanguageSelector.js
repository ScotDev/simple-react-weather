import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

function Dropdown(props) {
    const [showMenu, setShowMenu] = useState(false);

    // const getUserLanguage = () => {
    //     let lang = navigator.language;

    //     let langShortCode = lang.split("-");

    //     let langShortCodeTestVal = langShortCode[0].toLowerCase();

    //     if (langShortCodeTestVal[0] !== "en" || "es" || "de") {
    //         langShortCode = "en";
    //     } else {
    //         langShortCode = langShortCodeTestVal;
    //     }
    //     // setUserLanguage(langShortCode);
    // };

    // useEffect(() => {
    //     setShowMenu(false)
    // }, [props.langOptions]);

    const changeUserLang = (e) => {
        setShowMenu(false);

        props.changeLanguage(e.target.id)
    };

    const content = props.langOptions.map((item, index) => {
        if (index === 0) {
            return (
                <li key={index}>
                    <p
                        id={item}
                        onClick={(e) => {
                            changeUserLang(e);
                        }}
                    >
                        {item}
                    </p>
                </li>
            );
        } else {
            return (
                <li key={index}>
                    {showMenu && (
                        <p
                            id={item}
                            onClick={(e) => {
                                changeUserLang(e);
                            }}
                        >
                            {item}
                        </p>
                    )}
                </li>
            );
        }
    });

    return (
        <div className="dropdown-container">
            <ul
                className="dropdown"
                role="navigation"
                onMouseOver={() => {
                    setShowMenu(true);
                }}
                onClick={() => {
                    setShowMenu(true);
                }}
                onMouseLeave={() => {
                    setShowMenu(false);
                }}
            >
                {content}
            </ul>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        langOptions: state.langOptions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (newLangSelection) => { dispatch({ type: "CHANGE_USER_LANG", payload: newLangSelection }) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);