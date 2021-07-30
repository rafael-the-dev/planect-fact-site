import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Planet from '../Planet';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/planets/:id' component={Planet} />
                <Route path='/'><Redirect to="/planets/earth" /></Route>
            </Switch>
        </Router>
    );
};

export default App;