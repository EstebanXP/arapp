import React, { useState } from 'react'
import db from "../firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { setDoc,collection, addDoc,doc,updateDoc,deleteDoc,query,onSnapshot } from "firebase/firestore";

const Logeo = (props) => {
    const [registered, setIsRegistered] = useState(false);

    const getDataLogIn = (e)=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            props.setUser(user);
            // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    }
    const getDataSignUp = (e)=>{
        const auth = getAuth();
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        const role=e.target.role.value;
        const name=e.target.name.value;
        const uname=e.target.username.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            
            // Signed in 
            const user = userCredential.user;
            props.setUser(user);
            setDoc(doc(db, "Users", user.uid), {
                userName:name,
                userEmail:email,
                userRole:role,
                userUsername:uname
              });
            /*addDoc(doc(db,'Users'),{
                id:user.uid,
                userName:name,
                userEmail:email,
                userRole:role,
                userUsername:uname
            })*/
            console.log(user);
            
            // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
        
    }

    return (
        <div>
            <h1>{registered?"Log in!":"Sign Up!"}</h1>
            {registered?
            <div className="loginForm">
                <form onSubmit={getDataLogIn}>
                    mail: <input type="email" id="email" placeholder="example@example.com"/><br></br>
                    password: <input type="password" id="password" /><br></br>
                    <button >Sign in</button>
                </form>
                <button onClick={()=>setIsRegistered(!registered)}>Click</button>
            </div>
            :
            <div className="signupForm">
                 <form onSubmit={getDataSignUp}>
                    Mail: <input type="email" id="email" placeholder="example@example.com"/><br></br>
                    Name: <input type="text" id="name" placeholder="Juan Perez"/><br></br>
                    User name: <input type="text" id="username" placeholder="Maquina de fuego"/><br></br>
                    Password: <input type="password" id="password"/><br></br>
                    Role:
                    <select id="role">
                        <option value="Band Member">Band Member</option>
                        <option value="Band Manager">Band Manager</option>
                        <option value="Live Experience Designer">Live Experience Designer</option>
                    </select> 
                    <br></br>
                    <button >Sign up</button>
                </form>
                <button onClick={()=>setIsRegistered(!registered)}>Click</button>
            </div>
            }
        </div>
    )
}

export default Logeo
