import {startNewGame} from '../Controller/Functions';
import {selectCard} from '../Controller/Functions';
import {draw3Cards} from '../Controller/Functions';

function CardReducer(state={gameStarted: false, deck: [], tableShow:[], selected:[],level: "normal",}, action) {
    switch(action.type) {
        case "levelAndStart": {
            const newState = {
                ...state,
                level: action.value,
                gameStarted: true,
            }
            
            return startNewGame(newState);
        }
        case "selectCard" :{
            return selectCard(state, action);
        }
        case "newGame": {
            return startNewGame(state);
        }
        case "draw3Cards": {
            return draw3Cards(state);
        }
        case "endGameAndChangeMode":{
            return {
                gameStarted: false, 
                level: "normal", 
                deck: [], 
                tableShow:[], 
                selected:[],
            }
        }
        default:
            return state;
    }
    
}
export default CardReducer;