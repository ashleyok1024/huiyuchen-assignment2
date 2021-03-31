import '../css/App.css';
import React from 'react';
import SetTable from './SetTable';
import { connect } from 'react-redux';
import LevelButton from './LevelButton';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

class App extends React.Component{
    handleDispatch(action) {
        this.props.dispatch({type: action});
    }

    screenShow(){
        if(this.props.gameStarted){
            return (
                <div>
                    <div className="gamePageButtons">
                        <div className="gamePageButton" onClick={() => this.handleDispatch("newGame")}>RESET GAME</div>
                        <div className="gamePageButton" onClick={() => this.handleDispatch("draw3Cards")}>DRAW 3 CARDS</div>
                        <div className="gamePageButton" onClick={() => this.handleDispatch("endGameAndChangeMode")}>CHANGE MODE</div>
                    </div>
                    <div className="deckInfo">
                        CARDS INVENTORY:
                        <b>{this.props.deck.length}</b> 
                        
                    </div>
                    <SetTable tableShow={this.props.tableShow}></SetTable>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className = "modeOption">Mode Options</h1>
                    <LevelButton />
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                <div className="gameTitle">Set Card Game</div>
                <div className="navbar">
                    <div className="linkButtons">
                        <Link className="link" exact="true" to={"/HomePage"}>HomePage</Link>
                        <Link className="link"exact="true" to={"/RulePage"}>Rule</Link>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
                {this.screenShow()}
            </div>
        )
    } 
}

let mapDispatchToProps = function(dispatch, props) {
    return {
      dispatch: dispatch,
    }
}

let mapStateTpProps = function(state, props) {
    return {
        gameStarted: state.cards.gameStarted,
        level: state.cards.level,
        deck : state.cards.deck,
        tableShow : state.cards.tableShow,
        selected: state.cards.selected,
    }
}

export default connect(
    mapStateTpProps,
    mapDispatchToProps
)(App)