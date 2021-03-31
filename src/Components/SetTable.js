import React from 'react';
import Card from './Card.js';
import '../css/SetTable.css';

export default class SetTable extends React.Component {

    render() {
        return(
            <div className="gameDeck">
                {this.props.tableShow.map((curCard)=><Card key={curCard.path} url={curCard.path} color={curCard.color} shape={curCard.shape} shading={curCard.shading} num={curCard.num} selectStatus = {curCard.selectStatus} ></Card>)}
            </div>
        )
    }
}
