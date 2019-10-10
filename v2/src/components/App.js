import React from 'react';
import LandingPage from './landingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShowPage from './showPage';
import DirectionPage from './DirectionPage';
import WrongLocatonPage from './LocationNotFound';

const App = () => {
    return (
        <Router>
            <div>
                <Route path="/" exact component={LandingPage} />
                <Route path="/Showpage" exact component={ShowPage} />
                <Route path="/direction" exact component={DirectionPage} />
                <Route path="/LocationNotFound" exact component={WrongLocatonPage} />
            </div>
        </Router>
    )
}

export default App;