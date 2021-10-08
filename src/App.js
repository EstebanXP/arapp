import './App.css';
import Home from './views/Home';
import AddBands from './views/AddBands';
import AddSetlist from './views/AddSetlist';
import AddSongs from './views/AddSongs';
import USongs from './views/USongs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




//Aqui estan todas las rutas, si necesitan agregar una propia pueden hacerlo
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addSongs">Add Songs</Link>
            </li>
            <li>
              <Link to="/addMembers">Add Members</Link>
            </li>
            <li>
              <Link to="/addBands">Add Bands</Link>
            </li>
            <li>
              <Link to="/addSetlist">Add Setlist</Link>
            </li>
            <li>
              <Link to="/updateSongs">Update Songs</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/addSetlist">
            <AddSetlist />
          </Route>
          <Route path="/addBands">
            <AddBands />
          </Route>
          <Route path="/addSongs">
            <AddSongs /> 
          </Route>
          <Route path="/addMembers">
            <AddMembers /> 
          </Route>
          <Route path="/updateSongs">
            <USongs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>


      </div>
    </Router>
  );
}

export default App;
