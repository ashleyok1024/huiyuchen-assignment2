import { combineReducers } from 'redux';
import CardReducer from './CardReducer.js';

export default combineReducers({
    cards: CardReducer,
})