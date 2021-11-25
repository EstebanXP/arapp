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
import { NativeBaseProvider, Box, Input, Button, Alert,Text, Heading, Center} from "native-base";

const Logeo = (props) => {
  const [registered, setIsRegistered] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);


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
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const name = e.target.name.value;
    const uname = e.target.username.value;
    console.log(email);
    console.log(password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.setUser(user);
        setDoc(doc(db, "Users", user.uid), {
          userName: name,
          userEmail: email,
          userRole: role,
          userUsername: uname,
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
      <Center flex={1}>
        <Box width="xs">
        <Heading size="xl" mb="10" mt="48" textAlign="center">{registered ? "We missed you!" : "Hello there :)"}</Heading>
        {registered ? (
          <div className="loginForm">
            <form onSubmit={getDataLogIn}>
             
              <Input
              value={email}
                type="email"
                name="email"
                id="email"
                
                placeholder="Email"
                onChange={handleEmailChange}
                w={"100%"}
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
              />
               {/*<input type="password" id="password" />*/}
              <br></br>
              <button type="submit">Sign in</button>
            </form>
            <button onClick={() => setIsRegistered(!registered)}>Click</button>
          </div>
        ) : (
          <div className="signupForm">
            <form onSubmit={getDataSignUp}>
              Mail:{" "}
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
              />
              <br></br>
              Name: <input type="text" id="name" placeholder="Juan Perez" />
              <br></br>
              User name:{" "}
              <input type="text" id="username" placeholder="Maquina de fuego" />
              <br></br>
              Password: <input type="password" id="password" />
              <br></br>
              Role:
              <select id="role">
                <option value="Band Member">Band Member</option>
                <option value="Band Manager">Band Manager</option>
                <option value="Live Experience Designer">
                  Live Experience Designer
                </option>
              </select>
              <br></br>
              <button>Sign up</button>
            </form>
            <Text>Don't you have an account? Sign Up</Text>
            <button onClick={() => setIsRegistered(!registered)}>Click</button>
          </div>
        )}
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Logeo;
