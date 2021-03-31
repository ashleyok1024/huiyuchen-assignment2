import React from 'react';
import '../css/Card.css';
import { connect } from 'react-redux';

export class Card extends React.Component {

    handleOnClickCard(action, url){
        this.props.dispatch({type: action, value: url});
    }


    render(){
        return (
            <div className={this.props.selectStatus} id="card" onClick = {()=> this.handleOnClickCard("selectCard", this.props.url)}>
                  <img src={process.env.PUBLIC_URL + this.props.url} alt = {this.props.url}/>
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
)(Card)

