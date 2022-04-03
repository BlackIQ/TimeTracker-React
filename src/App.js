import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Auth from "./components/auth";

function App() {
    return (
        <Router>
            <Navbar/>
            <div className='container py-4'>
                <Switch>
                    <Route path='/:type'><Home/></Route>
                    <Route exact path='/auth'><Auth/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
