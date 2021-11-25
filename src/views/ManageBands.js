import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import ShowBands from "./ShowBands";
import emailjs from "emailjs-com"; //npm install emailjs-com --save

const ManageBandss = (props) => {
  const [bands, setBands] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [sortings, setSortings] = useState("bandName");
  const [user, setUser] = useState([]);
  const [bandUsers,setBandUsers]=useState([]);
  const [searchUserParam, setSearchUserParam] = useState("");

  const [emailEmail,setEmailEmail] = useState([]);
  const [emailUsername,setEmailUsername] = useState([]);
  const [emailBandname, setEmailBandname] = useState("");

  const bandsCollectionRef = collection(db, "Bands");

  const [newName, setNewName] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newDescription, setNewDescription] = useState("");
  //const [newLogo, setNewLogo] = useState("");


  //setBands
  useEffect(() => {
    const bandsObject = query(collection(db, "Bands"), orderBy(sortings));
    const bandsSnapshot = onSnapshot(bandsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setBands(data);
    });
    return () => bandsSnapshot();
  }, [sortings,setUser]);


  //bandUsers
  useEffect(() => {
    const usersObject = query(collection(db, "Users")); //Guardar referencia de la coleccion
    const usersSnapshot = onSnapshot(usersObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUser(data); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => usersSnapshot();
  }, []);

  //setBandUsers//////////////////////////////////////////////////////////////////////////
  const addUserToBand=(u)=>{
    setBandUsers([...bandUsers,u.id]);
    setEmailEmail([...emailEmail,u.userEmail]);
    setEmailUsername([...emailUsername,u.userName]);
    console.log(emailEmail, emailUsername, emailBandname);
  }

  //create Sets
  const createBand = async () => {
    await addDoc(bandsCollectionRef, {
      bandName: newName,
      bandGenres: newGenre,
      bandDescription: newDescription,
      bandMembers: bandUsers,
      bandLogo: "sin logo",
      createdBy: props.userID,
    });
  };

  //sendEmail
  const sendEmail = (e) => {
    e.preventDefault();

    //for(var i = 0;emailEmail.length;i++){
      emailjs.send('service_skhdk1l', 'template_496eyfr', {
        e_mail: emailEmail,
        user_name: emailUsername,
        band_manager: props.bandManager,
        band_name: emailBandname,
      }, 'user_nkbBijSuQAVkBp5UYWcgJ')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    //}
  };

  //sort
  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }



  return (
    <div>
      <h3>Add new band</h3>
      <h3>Band name:</h3>
      <input
        onChange={(event) => {
          setNewName(event.target.value);
          setEmailBandname(event.target.value);
        }}
      />
      <h3>Band genre:</h3>
      <input
        onChange={(event) => {
          setNewGenre(event.target.value);
        }}
      />
      <h3>Band description:</h3>
      <input
        onChange={(event) => {
          setNewDescription(event.target.value);
        }}
      />
      {/*<h3>Band logo:</h3>
      <input
        onChange={(event) => {
          setNewLogo(event.target.value);
        }}
      />*/}
      <h3>Band members:</h3>
      {/*lista de usuarios dentro de banda */}
      {
        bandUsers.map((user)=>{
          return(
            <p>{user}
            <br></br>
            </p>
          );
        })
      }
      <input
        type="text"
        name="title"
        placeholder="Search user..."
        onChange={(event) => {
          setSearchUserParam(event.target.value);
        }}
      ></input>
      {user.filter((val)=>{
        if(val.userRole == "Band Member"){
          if (searchUserParam === "") {
            return null;
          } else if (
            val.userName.toLowerCase().includes(searchUserParam.toLowerCase())
          ) {
            //console.log(val)
            return val;
          } else if (
            val.userUsername.toLowerCase().includes(searchUserParam.toLowerCase())
          ) {
            //console.log(val)
            return val;
          }
        }
      }).map((user) => {
        return (
          <div>
            <p>{user.userName + " " + user.userUsername} <button onClick={()=>addUserToBand(user)}>Añadir</button>  </p>
          </div>
        );
      })}
      <br></br>
      <button onClick={createBand}>Create Band</button>
      <button onClick={sendEmail}>Send mail</button>

      <hr />

      <form>
        <label>
          Order by:
          <select value={sortings} onChange={handleChange}>
            <option value="name">name</option>
            <option value="members">members</option>
          </select>
        </label>
      </form>

      
      {bands.filter((val) => {
          if (searchParam === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchParam.toLowerCase())
          ) {
            return val;
          }
        }).map((band) => {
          //if (props.userID == band.createdBy) {
            return (
              <div>
                <ShowBands tband={band} />
              </div>
            );
          //}
        })}
    </div>
  );
};

export default ManageBandss;