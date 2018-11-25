import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import InputContainer from './components/InputContainer';
import SearchContainer from './components/SearchContainer';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <NavBar/>
                <Router/>
            </div>
        );
    }
}

export default App;


class Router extends Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ SearchContainer } />
                    <Route exact path='/create' component={ InputContainer } />
                    <Route exact path="/search" component= { SearchContainer }/>
                </Switch>
            </main>
        );
    }
}
