import React from 'react';
import '../css/App.css';
import {Link} from 'react-router-dom';
import '../css/HomePage.css'

export default class HomePage extends React.Component {

    render() {
        return(
            <div>
                <div className="gameTitle">Welcome To Set!!</div>
                <div className="navbar">
                    <div className="linkButtons">
                        <Link className="link" exact="true" to={"/GamePage"}>Play</Link>
                        <Link className="link"exact="true" to={"/RulePage"}>Rule</Link>
                    </div>
                </div>
                <div className="gameImg">
                    <img src = 'image.png' alt="Logo"/>
                </div>
            </div>
        )
    }
}

