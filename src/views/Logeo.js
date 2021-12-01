import React, { useState } from "react";
import db from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { NativeBaseProvider, Box, Input, Button, Alert,Text, Heading, Center, Link, Select, CheckIcon, FormControl, WarningOutlineIcon} from "native-base";


const Logeo = (props) => {
  const [registered, setIsRegistered] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNe = (event) => setnewEmail(event.target.value);
  const handleNn = (event) => setNewName(event.target.value);
  const handleNu = (event) => setNewUserName(event.target.value);
  const handleNp = (event) => setNewPassword(event.target.value);

  const getDataLogIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.setUser(user);
        setEmail("");
        setPassword("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode+errorMessage);
      });
  };
  const getDataSignUp = (e) => {
    const auth = getAuth();
    e.preventDefault();
    
    const role = e.target.role.value;
    
    createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.setUser(user);
        setDoc(doc(db, "Users", user.uid), {
          userName: newName,
          userEmail: newEmail,
          userRole: role,
          userUsername: newUserName,
        });
        /*addDoc(doc(db,'Users'),{
                id:user.uid,
                userName:name,
                userEmail:email,
                userRole:role,
                userUsername:uname
            })*/

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  
  return (
    <NativeBaseProvider>
      
        <Box width="xs" bg="white" opacity=".9" p="10" borderRadius="20" shadow="4" >
        <Heading size="lg" mb="10" textAlign="center">{registered ? "We missed you!" : "Hello there :)"}</Heading>
        {registered ? (
          <div className="loginForm" >
             {/**AQUI EMPIEZA LA VISTA DE LOG IN*/}
            <form onSubmit={getDataLogIn}>
             
              <Input
              value={email}
                type="email"
                name="email"
                id="email"
                
                placeholder="Email"
                onChange={handleEmailChange}
                w={"100%"}
                isRequired
                
                _hover = {{
                  borderColor: '#4f46e5' 
                }}
                _invalid={{borderColor: '#4f46e5' }}
                _focus ={{borderColor: '#4f46e5' }}
                _disabled ={{borderColor: '#4f46e5' }}
              />
              {/*<input
                type="email"
                id="email"
                placeholder="example@example.com"
              />*/}
              <br></br>

              <Text fontSize="2xl"></Text><Input
              value={password}
              onChange={handlePasswordChange}
                type="password"
                id="password"
                w={"100%"}
                placeholder="Password"
                isRequired
                _hover = {{
                  borderColor: '#4f46e5' 
                }}
                _invalid={{borderColor: '#4f46e5' }}
                _focus ={{borderColor: '#4f46e5' }}
              />
               {/*<input type="password" id="password" />*/}
               
              <Button mt="6" mb="-10" textAlign="center" bg ="indigo.600" _pressed={{ bg: '#DDD' }} _hover={{ bg: 'indigo.800' }} colorScheme="indigo" type="submit">
                Sign in
                
              </Button>
              <button type="submit" style={{opacity : "0",  width : "100%", height : "40px", left:"0" }}>Sign in</button>
            {/**AQUI TERMINA LA VISTA DE LOG IN*/}
            </form>
            <Center>
              <Link><Text  mt="5"   italic color="indigo.600" onClick={() => setIsRegistered(!registered)}>Don’t have an account? Sign Up</Text></Link>
            </Center>
          </div>
        ) : (
          
          <div className="signupForm">
            {/**AQUI EMPIEZA LA VISTA DE SIGN UP */}
            <form onSubmit={getDataSignUp}>
              
              <Input w={"100%"} type="email" onChange={handleNe} id="email" placeholder="Email" isRequired _hover = {{borderColor: '#4f46e5'}} _invalid=  {{borderColor: '#4f46e5' }} _focus ={{borderColor: '#4f46e5' }} />    
              <Input isRequired w={"100%"} onChange={handleNn} type="text" id="name" placeholder="Name" _hover = {{borderColor: '#4f46e5' }} _invalid=  {{borderColor: '#4f46e5' }} _focus ={{borderColor: '#4f46e5' }} /><Text fontSize="2xl"></Text>
              <Input isRequired w={"100%"} onChange={handleNu} type="text" id="username" placeholder="Username" _hover = {{borderColor: '#4f46e5' }} _invalid=  {{borderColor: '#4f46e5' }} _focus ={{borderColor: '#4f46e5' }} /><Text fontSize="2xl"></Text>
              <Input isRequired w={"100%"} onChange={handleNp} type="password" id="password" placeholder="Password" _hover = {{borderColor: '#4f46e5' }} _invalid=  {{borderColor: '#4f46e5' }} _focus ={{borderColor: '#4f46e5' }}/><Text fontSize="2xl"></Text>
              
                
              <select id="role"
              minWidth="200"
              colorScheme="indigo"
              accessibilityLabel="Choose Service"
              placeholder="Choose Role"
              className="input"

              >
                <option value="Band Member" label="Band Member">Band Member</option>
                <option value="Band Manager" label="Band Manager" >Band Manager</option>
                <option value="Live Experience Designer" label="Live Experience Designer">Live Experience Designer</option>
              </select>
              
              <br></br>
              <Button type="submit" mt="2" mb="-10" textAlign="center" bg ="indigo.600" _pressed={{ bg: '#DDD' }} _hover={{ bg: 'indigo.800' }} colorScheme="indigo">Sign up</Button>
              <button type="submit" style={{opacity : "0",  width : "100%", height : "40px", left:"0" }}>Sign in</button>
            </form>
            <Center>
              <Link><Text  mt="5"   italic color="indigo.600" onClick={() => setIsRegistered(!registered)}>Already have an account? Sign In</Text></Link>
            </Center>
             {/**AQUI TERMINA LA VISTA DE SIGN UP*/}
          </div>
        )}
        </Box>
      
     
    </NativeBaseProvider>
  );
};

export default Logeo;
