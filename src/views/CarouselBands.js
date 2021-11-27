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
import { Box } from 'native-base'
import Carousel from "./Carousel";
const CarouselBands = (props) => {
  const [bands, setBands] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [sortings, setSortings] = useState("bandName");
  const [user, setUser] = useState([]);
  const [bandUsers, setBandUsers] = useState([]);
  const [searchUserParam, setSearchUserParam] = useState("");

  const [emailEmail, setEmailEmail] = useState([]);
  const [emailUsername, setEmailUsername] = useState([]);
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
  }, [sortings, setUser]);


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
  const addUserToBand = (u) => {
    setBandUsers([...bandUsers, u.id]);
    setEmailEmail([...emailEmail, u.userEmail]);
    setEmailUsername([...emailUsername, u.userName]);
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
      <form>
        <label>
          Order by:
          <select value={sortings} onChange={handleChange}>
            <option value="name">name</option>
            <option value="members">members</option>
          </select>
        </label>
      </form>
      <Carousel show={4}>
        
          {bands.map((band) => {
            //if (props.userID == band.createdBy) {
            return (
              <Box px="10" py="10" m="2" bg="black">
              
                <ShowBands tband={band} />
              
              </Box>
            );
            //}            
          })}
      </Carousel>


    </div>
  );
};

export default CarouselBands;