import React from 'react';
import LandingPage from './landingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShowPage from './showPage';
import DirectionPage from './DirectionPage';
import WrongLocatonPage from './LocationNotFound';
import NotFoundPage from './404NotFoundPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/ShowPage" exact component={ShowPage} />
                <Route path="/direction" exact component={DirectionPage} />
                <Route path="/LocationNotFound" exact component={WrongLocatonPage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </Router>
    )
}

export default App;