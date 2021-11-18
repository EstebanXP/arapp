import "./App.css";
import Home from "./views/Home";
import ManageBands from "./views/ManageBands";
import ManageSetlists from "./views/ManageSetlists";
import ManageSets from "./views/ManageSets";
import AddSongs from "./views/AddSongs";
import ManageMembers from "./views/ManageMembers";
import AddChords from "./views/AddChords";
import AddTags from "./views/AddTags";
import ManageSongs from "./views/ManageSongs";
//import UMembers from "./views/UMembers";
//import UBands from "./views/UBands";
import USetlists from "./views/USetlists";
import UTags from "./views/UTags";
import AddLiveShows from "./views/AddLiveShows";
import ULiveShows from "./views/ULiveShows";
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
                    <Link to="/manageMembers">Manage Members</Link>
                  </li>
                  {/*<li>
                    <Link to="/uMembers">Update Members</Link>
                  </li>*/}
                  <li>
                    <Link to="/manageBands">Manage Bands</Link>
                  </li>
                  {/*<li>
                    <Link to="/updateBands">Update Bands</Link>
                  </li>*/}
                  <li>
                    <Link to="/addTags">Add Tag</Link>
                  </li>
                  <li>
                    <Link to="/updateTags">Update Tag</Link>
                  </li>

                  <Switch>
                    <Route path="/manageMembers">
                      <ManageMembers userID = {user.uid}/>
                    </Route>
                    {/*<Route path="/uMembers">
                      <UMembers />
                    </Route>*/}
                    <Route path="/manageBands">
                      <ManageBands userID = {user.uid}/>
                    </Route>
                    <Route path="/addTags">
                      <AddTags />
                    </Route>
                    <Route path="/updateTags">
                      <UTags />
                    </Route>
                    {/*<Route path="/updateBands">
                      <UBands />
                    </Route>*/}
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
                      <Link to="/manageSetlists">Manage Setlist</Link>
                    </li>
                    <li>
                      <Link to="/manageSets">Manage Sets</Link>
                    </li>
                    {/*<li>
                      <Link to="/addSongs">Add Songs</Link>
                    </li>
                    <li>
                      <Link to="/addChords">Add Chords</Link>
                    </li>
                    */}
                    <li>
                      <Link to="/manageSongs">Manage Songs</Link>
                    </li>
                    {/*<li>
                      <Link to="/updateSetlists">Update Setlist</Link>
                    </li>
                    */}
                    <li>
                      <Link to="/updateTags">Update Tag</Link>
                    </li>
                    <li>
                      <Link to="/addTags">Add Tag</Link>
                    </li>
                    <li>
                      <Link to="/addLiveShows">Add Live Shows</Link>
                    </li>
                    <li>
                      <Link to="/updateLiveShows">Update Live Shows</Link>
                    </li>
                  </ul>
                  <Switch>
                    <Route path="/manageSets">
                      <ManageSets userID = {user.uid}/>
                    </Route>
                    <Route path="/updateTags">
                      <UTags />
                    </Route>
                    <Route path="/manageSetlists">
                      <ManageSetlists userID = {user.uid}/>
                    </Route>
                    {/*<Route path="/updateSetlists">
                      <USetlists />
                    </Route>
                    */}
                    <Route path="/addTags">
                      <AddTags />
                    </Route>
                    <Route path="/manageSongs">
                      <ManageSongs />
                    </Route>
                    <Route path="/manageSets">
                      <ManageSets />
                    </Route>
                    <Route path="/addSongs">
                      <AddSongs />
                    </Route>
                    <Route path="/addChords">
                      <AddChords />
                    </Route>
                    <Route path="/updateLiveShows">
                      <ULiveShows />
                    </Route>
                    <Route path="/addLiveShows">
                      <AddLiveShows />
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
