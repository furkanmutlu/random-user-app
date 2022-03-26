import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import List from './components/List';
import NotFound from './components/NotFound';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path='/'>
                            <List />
                        </Route>
                        <Route path='*'>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
