import React from 'react';
import LandingPage from './LandingPage';
import ShowPage from './ShowPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div>
                <br />
                <Route path="/" exact component={LandingPage} />
         </div>
        </Router>
    )
}

export default App;