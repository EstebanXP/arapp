import "./App.css";
import Home from "./views/Home";
import AddBands from "./views/AddBands";
import AddSetlist from "./views/AddSetlist";
import AddSets from "./views/AddSets";
import AddSongs from "./views/AddSongs";
import AddMembers from "./views/AddMembers";
import AddTags from "./views/AddTags";
import USongs from "./views/USongs";
import UMembers from "./views/UMembers";
import UBands from "./views/UBands";
import USetlists from "./views/USetlists";
import USets from "./views/USets";
import UTags from "./views/UTags";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logeo from "./views/Logeo";
import db from "./firebase";
import { doc, getDoc } from "firebase/firestore";

//Aqui estan todas las rutas, si necesitan agregar una propia pueden hacerlo
function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState();

  async function getData() {
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data().userRole);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    if (user != null) {
      getData();
    } else {
      return;
    }
  }, [user]);

  if (user === null) {
    return (
      <div>
        <Logeo setUser={setUser}></Logeo>
      </div>
    );
  }

  return (
    <div>
      {(() => {
        switch (data) {
          case "Band Member":
            return (
              <div className="bandMemberWrapper">
                <h1>Hola mundo</h1>
                <Router>
                  <Switch></Switch>
                </Router>
              </div>
            );
          case "Band Manager":
            return (
              <div className="bandManagerWrapper">
                <Router>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/addMembers">Add Members</Link>
                  </li>
                  <li>
                    <Link to="/addBands">Add Bands</Link>
                  </li>
                  <li>
                    <Link to="/updateBands">Update Bands</Link>
                  </li>
                  <li>
                    <Link to="/addTags">Add Tag</Link>
                  </li>
                  <li>
                    <Link to="/updateTags">Update Tag</Link>
                  </li>

                  <Switch>
                    <Route path="/addMembers">
                      <AddMembers />
                    </Route>
                    <Route path="/addBands">
                      <AddBands />
                    </Route>
                    <Route path="/addTags">
                      <AddTags />
                    </Route>
                    <Route path="/updateTags">
                      <UTags />
                    </Route>
                    <Route path="/updateBands">
                      <UBands />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </Router>
              </div>
            );
          case "Live Experience Designer":
            return (
              <div className="LEDWrapper">
                <Router>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/addSets">Add Set</Link>
                    </li>
                    <li>
                      <Link to="/addSongs">Add Songs</Link>
                    </li>
                    <li>
                      <Link to="/updateSetlists">Update Setlist</Link>
                    </li>
                    <li>
                      <Link to="/updateSongs">Update Songs</Link>
                    </li>
                    <li>
                      <Link to="/updateTags">Update Tag</Link>
                    </li>
                    <li>
                      <Link to="/addTags">Add Tag</Link>
                    </li>
                    <li>
                      <Link to="/addSetlist">Add Setlist</Link>
                    </li>
                  </ul>
                  <Switch>
                    <Route path="/addSets">
                      <AddSets />
                    </Route>
                    <Route path="/updateTags">
                      <UTags />
                    </Route>
                    <Route path="/addSetlist">
                      <AddSetlist />
                    </Route>
                    <Route path="/updateSetlists">
                      <USetlists />
                    </Route>
                    <Route path="/addTags">
                      <AddTags />
                    </Route>
                    <Route path="/updateSongs">
                      <USongs />
                    </Route>
                    <Route path="/addSongs">
                      <AddSongs />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </Router>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;

/* 
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
            <Route path="/updateTags">
              <UTags />
            </Route>
            <Route path="/" >
              <Home />
            </Route>
          </Switch>









          <Router>
        <div>
          
      
        

        </div>
      </Router>
*/
