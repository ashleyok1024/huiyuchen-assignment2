import { toast } from "react-toastify";

export const COLORS = ["blue", "red", "orange"]
export const SHAPES = ["diamond", "heart", "oval"]
export const SHADINGS = ["empty", "stripe", "solid"]
export const NUMS = ["one","two", "three"]

export function createDeck(level){
    let deck = []
    //easy mode -27 cards
    if (level === "easy"){
        for (let i = 0; i < SHAPES.length; i++ ){
            for (let j = 0; j < COLORS.length; j++){
                for(let k = 0; k < NUMS.length; k++){
                    deck.push({
                        selectStatus: "unselect",
                        path : "card/" + COLORS[j] + "/" + SHAPES[i] + "/" + SHADINGS[0] + "/" + NUMS[k]+".svg",
                        color : COLORS[j],
                        shape : SHAPES[i],
                        shading : SHADINGS[0],
                        num : NUMS[k],
                    });

                }
            }
        }
        // normal or heard mode-81 cards
    } else{
        for (let i = 0; i < SHAPES.length; i++ ){
            for (let j = 0; j < COLORS.length; j++){
                for(let k = 0; k < NUMS.length; k++){
                    for(let n = 0; n < SHADINGS.length; n++){
                        deck.push({
                            selectStatus: "unselect",
                            path : "card/" + COLORS[j] + "/" + SHAPES[i] + "/" + SHADINGS[n] + "/" + NUMS[k]+".svg",
                            color : COLORS[j],
                            shape : SHAPES[i],
                            shading : SHADINGS[n],
                            num : NUMS[k],
                        });

                    }
                }
            }
        }

    }
    return shuffle(deck);
}


export function startNewGame(state){
    const newDeck = createDeck(state.level);
    const newTable = newDeck.slice(0,12);
    const deckRemaining = newDeck.slice(12,81);
    let newState = {
        ...state,
        deck:deckRemaining,
        tableShow: newTable,
        selected:[],
    }
    return checkGameStatus(newState);
}

function shuffle(deck) {
    
    for (let i = deck.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    return deck;
}

export function selectCard(state, action){

    let NewTableShow = [];
    let selectedCardUrl = action.value;
    let newSelected = state.selected;
    
    for(let i = 0; i< state.tableShow.length; i++){
        let curCard = state.tableShow[i];
        if(curCard.path === selectedCardUrl){
            // allow user to change a card they've been selected
            if(curCard.selectStatus === "selected"){
                let SelectedCard = {...curCard, selectStatus:"unselect"};
                NewTableShow.push(SelectedCard);
                newSelected.pop(curCard);
            }else{
                let NewSelectedCard = {...curCard, selectStatus:"selected"};
                NewTableShow.push(NewSelectedCard);
                newSelected.push(NewSelectedCard);
            }
        }else{
            NewTableShow.push(curCard);
        }
        
    }

    let newState = {...state, 
        selected:newSelected, 
        tableShow:NewTableShow};

    if(newState.selected.length<3 || !newState.selected){
        return newState;
    }else{
        if(isValidSet(newState.selected)){
            toast.success("Woo!! You Find A Set!",{
                position:"bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return replaceAnotherThree(newState);
        }else{
            toast.warn("Please Try Again!It's Not A Set!",{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return refreshSelected(newState);
        }
    }


}
function isValidSet(selected){
    let shadingSet = new Set();
    let numSet = new Set();
    let colorSet = new Set();
    let shapeSet = new Set();

    for (let i=0; i<3; i++){
        colorSet.add(selected[i].color);
        shapeSet.add(selected[i].shape);
        shadingSet.add(selected[i].shading);
        numSet.add(selected[i].num);
    }
    //all same(1) or all different(3)
    if (shadingSet.size === 2 || numSet.size === 2 ||colorSet.size === 2 || shapeSet.size === 2 ) {
        return false;
    }

    return true;

}

function replaceAnotherThree(state){
    let newDeck = state.deck
    let newTableShow = []

    for(let i = 0; i< state.tableShow.length; i++){
        let curCard = state.tableShow[i];
        if (curCard.selectStatus === "unselect"){
            newTableShow.push(curCard)
        }
    }

    for(let j = 0; j < 3; j++){
        if(newDeck.length > 0 && state.tableShow.length <= 12){
            newTableShow.push(newDeck.pop());
        }
    }
    let newState = {...state, deck: newDeck, tableShow: newTableShow, selected: []};
    return checkGameStatus(newState);

}

export function draw3Cards(state){
    let cards = state.deck.slice(0,3);
    let newDeck = state.deck.slice(3, state.deck.length);
    let newTableShow = state.tableShow.concat(cards);

    let newState = {
        ...state,
        tableShow : newTableShow,
        deck :newDeck,
        selected : state.selected,
        
    }
    return checkGameStatus(newState);

}

function checkGameStatus(newState){
    while (newState.deck.length > 0 && newState.level !== "hard" && !setOnTable(newState.tableShow)) {
        newState = draw3Cards(newState);
    }

    if (newState.deck.length === 0 && !setOnTable(newState.tableShow)){
        toast.info("Congrats! GAME END! You will be back to Mode Option Page.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        return {
            gameStarted: false, 
            mode: "normal", 
            deck: [], 
            onTable:[], 
            selectedCards:[],
        }
    }
    console.log("Is there a SET on the table? ",setOnTable(newState.tableShow));

    return newState;
}

function refreshSelected(state){
    let newTableShow = []

    for(let i = 0; i < state.tableShow.length; i++){
        let curCard = state.tableShow[i];
        if(curCard.selectStatus !== "unselect"){
            newTableShow.push({...curCard, selectStatus:"unselect",})
        }else{
            newTableShow.push(curCard);
        }
    }
    const newState = {...state, tableShow: newTableShow, selected: []};
    return newState;
}

// show index of valid set in console 
function setOnTable(tableShow){
    if(!tableShow){
        return false;
    }
    for (let i = 0; i < tableShow.length; i++) {
        for (let j = i + 1; j < tableShow.length; j++) {
            for (let k = j + 1; k < tableShow.length; k++) {
                let curSet = [tableShow[i], tableShow[j], tableShow[k]];
                if (isValidSet(curSet)){
                    console.log("Index[",i, j, k, "] on the table is a SET.");
                    return true;
                }
            }
        }
    }
    return false;
    
}

export function endGameAndChangeMode(state){

}