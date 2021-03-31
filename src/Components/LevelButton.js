import React from 'react';
import { connect } from 'react-redux';
import '../css/LevelButton.css';


export class LevelButton extends React.Component {
    handleSetLevelAndStart(action, levelOptions) {
        this.props.dispatch({type: action, value: levelOptions});
    }

    render(){
        return (
            <div className="levels">
                <div className="singleLevelButton" onClick={() => this.handleSetLevelAndStart("levelAndStart", "easy")}>EASY</div>
                <div className="singleLevelButton" onClick={() => this.handleSetLevelAndStart("levelAndStart", "normal")}>NORMAL</div>
                <div className="singleLevelButton" onClick={() => this.handleSetLevelAndStart("levelAndStart", "hard")}>HARD</div>
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
        deck : state.cards.deck,
        tableShow : state.cards.tableShow,
        selected: state.cards.selected,
    }
}


export default connect(
    mapStateTpProps,
    mapDispatchToProps
)(LevelButton)