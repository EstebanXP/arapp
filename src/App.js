import './App.css';
import Home from './views/Home';
import AddBands from './views/AddBands';
import AddSetlist from './views/AddSetlist';
import AddSets from './views/AddSets';
import AddSongs from './views/AddSongs';
import AddMembers from './views/AddMembers';
import AddTags from './views/AddTags';
import USongs from './views/USongs';
import UMembers from './views/UMembers';
import UBands from './views/UBands';
import USetlists from './views/USetlists';
import USets from './views/USets';
import UTags from './views/UTags';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import Logeo from './views/Logeo';



//Aqui estan todas las rutas, si necesitan agregar una propia pueden hacerlo
function App() {
  const [user,setUser]=useState(null);

  if(user===null){
    return(
      <div>
        <Logeo setUser={setUser} ></Logeo>
      </div>
    );
  }

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
              <Link to="/addSets">Add Set</Link>
            </li>
            <li>
              <Link to="/addTags">Add Tag</Link>
            </li>
            <li>
              <Link to="/updateSongs">Update Songs</Link>
            </li>
            <li>
              <Link to="/updateMembers">Update Members</Link>
            </li>
            <li>
              <Link to="/updateBands">Update Bands</Link>
            </li>
            <li>
              <Link to="/updateSetlists">Update Setlist</Link>
            </li>
            <li>
              <Link to="/updateSets">Update Set</Link>
            </li>
            <li>
              <Link to="/updateTags">Update Tag</Link>
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
          <Route path="/addSets">
            <AddSets /> 
          </Route>
          <Route path="/addTags">
            <AddTags /> 
          </Route>
          <Route path="/updateSongs">
            <USongs />
          </Route>
          <Route path="/updateMembers">
            <UMembers />
          </Route>
          <Route path="/updateBands">
            <UBands />
          </Route>
          <Route path="/updateSetlists">
            <USetlists />
          </Route>
          <Route path="/updateSets">
            <USets />
          </Route>
          <Route path="/updateSets">
            <USets />
          </Route>
          <Route path="/updateTags">
            <UTags />
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
