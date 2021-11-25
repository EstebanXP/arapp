import "./App.css";
import Home from "./views/Home";
import ManageBands from "./views/ManageBands";
import ManageSetlists from "./views/ManageSetlists";
import ManageSets from "./views/ManageSets";
import AddSongs from "./views/AddSongs";
//import ManageMembers from "./views/ManageMembers";
import AddChords from "./views/AddChords";
import AddTags from "./views/AddTags";
import ManageSongs from "./views/ManageSongs";
import Prueba1 from "./views/Prueba1";
//import UMembers from "./views/UMembers";
//import UBands from "./views/UBands";
//import USetlists from "./views/USetlists";
import UTags from "./views/UTags";
import AddLiveShows from "./views/AddLiveShows";
import ULiveShows from "./views/ULiveShows";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logeo from "./views/Logeo";
import db from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import ManageTags from "./views/ManageTags";
import {Box, NativeBaseProvider, Heading, HStack, Text, Center, Container, Content, Flex} from "native-base"
import { MdAndroid } from "react-icons/md";
//Aqui estan todas las rutas, si necesitan agregar una propia pueden hacerlo
function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState();
  const [userName, setUserName] = useState();

  const linkStyle = {
    margin: "0",
    textDecoration: "none",
    color: 'black',
    marginHorizontal : "1"
  };

  async function getData() {
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data().userRole);
      setUserName(docSnap.data().userName);
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
      <NativeBaseProvider>
        <div className="fondoLogin">
        
        <Center direction="row" flex={1} p="6">
       
          <Logeo setUser={setUser}></Logeo>
        </Center>
        
        </div>
        
        
      </NativeBaseProvider>
      
    );
  }

  return (
    <NativeBaseProvider>
        
      {(() => {
        switch (data) {
          case "Band Member":
            return (
                <Router>
                <Box w="100%" py="4"  borderBottomWidth="1" borderColor="indigo.200"flex={1}>
                  <Center>
                  <HStack maxW="1000" w="90%" >
                    <Heading color="black" size="md">On-Stage Setlist Manager </Heading>
                    <HStack position="absolute" right="0" bottom="0">
                    
                    <Link style={linkStyle} to="/">
                      <MdAndroid></MdAndroid>
                        
                      
                      
                  </Link>
                    <Text bold><Link style={linkStyle} to="/addTags">Add Tag</Link></Text>
                    
                    </HStack>
                  </HStack>
                  </Center>
                </Box>
                <Center>
                <Box maxW="1000" w="90%">
                  <h1>Hola mundo</h1>
                  
                    <Switch></Switch>
              </Box>
              </Center>
              </Router>
            );
          case "Band Manager":
            return (
              <div>
                <Router>
                <Box w="100%" py="4"  bg="indigo.600" flex={1}>
                  <Center>
                  <HStack maxW="1000" w="90%" bg="white" >
                    <Heading color="" size="md"  >On-Stage Setlist Manager </Heading>
                    <HStack position="absolute" right="0" bottom="0">
                    <Text Bold><Link style={linkStyle} to="/">Home</Link></Text>
                    <Text Bold><Link style={linkStyle} to="/manageBands">Manage Bands</Link></Text>
                    <Text Bold><Link style={linkStyle} to="/addTags">Add Tag</Link></Text>
                    <Text Bold><Link style={linkStyle} to="/updateTags">Update Tag</Link></Text>
                    </HStack>
                  </HStack>
                  </Center>
                </Box>
                <Center>
                <Box maxW="1000" w="90%">
                    <Switch>
                      
                      {/*<Route path="/uMembers">
                        <UMembers />
                      </Route>*/}
                      <Route path="/manageBands">
                        <ManageBands userID = {user.uid} bandManager = {userName}/>
                      </Route>
                      <Route path="/addTags">
                        <ManageTags></ManageTags>
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
                  
                </Box>
                </Center>
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
                    <li>
                      <Link to="/prueba1">Prueba</Link>
                    </li>
                    
                    <li>
                      <Link to="/updateTags">Update Tag</Link>
                    </li>
                    <li>
                      <Link to="/ManageTags">Manage Tag</Link>
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
                    <Route path="/prueba1">
                      
                      <Prueba1></Prueba1>
                    </Route>
                  
                    <Route path="/ManageTags">
                      <ManageTags></ManageTags>
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
    </NativeBaseProvider>
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
