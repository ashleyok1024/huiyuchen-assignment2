import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './css/index.css';
import { render } from 'react-dom';
import App from './Components/App';
import HomePage from './Components/HomePage';
import Rule from './Components/Rule';
import Reducers from './Reducers/Reducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export const store = createStore(Reducers);

render(
    <Provider store = {store}>
        <Router>
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                <Route exact path={"/HomePage"} component={HomePage}/>
                <Route exact path={"/RulePage"} component={Rule} />
                <Route exact path={"/GamePage"} component={App} />
                <Route render={() => <h1>Not found!</h1>} />
            </Switch>
        </Router>
    </Provider>

, document.getElementById('root'));

