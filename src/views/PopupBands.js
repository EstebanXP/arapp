import React, { useEffect, useState } from "react";
import "../css/Popup.css";
import "../css/Buttons.css";


import {
    collection,
    query,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import db from "../firebase";
import { NativeBaseProvider, Box, View, Stack, HStack, Input, Alert,Text, Heading, Center, Link, Select, CheckIcon, FormControl, WarningOutlineIcon} from "native-base";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faCoffee} />

const PopupBands = (props) => {
    {/* STATES*/}
    const [lista, setLista] = useState([]);
    const [newBandName,setNewBandName]= useState(props.thisBand.bandName);
    const [newLogo,setNewLogo]= useState(props.thisBand.bandLogo);
    const [newDescription,setNewDescription]= useState(props.thisBand.bandDescription);
    const [newMusicGenre,setNewMusicGenre]= useState(props.thisBand.bandGenres);
    

    {/*FUNCIONES STATES*/}
    const handleNBNC = (event) => setNewBandName(event.target.value);
    const handleNBLC = (event) => setNewLogo(event.target.value);
    const handleNBDC = (event) => setNewDescription(event.target.value);
    const handleNMGC = (event) => setNewMusicGenre(event.target.value);

    useEffect(() => {
        const usersObject = query(collection(db, "Users")); //Guardar referencia de la coleccion
        const usersSnapshot = onSnapshot(usersObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        setLista(data); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
        });
        return () => usersSnapshot();
    }, []);

    const deleteUserOnBand = async (userID) => {
        await updateDoc(doc(db, "Bands", props.thisBand.id), {
            bandMembers: arrayRemove(userID),
        });
    };
    const addUserOnBand = async (userID) => {
        await updateDoc(doc(db, "Bands", props.thisBand.id), {
            bandMembers: arrayUnion(userID),
        });
    };

    //deleteBand
    const deleteBand = async (bandId) => {
        await deleteDoc(doc(db, "Bands", bandId));
        props.setPopBand(false);
    };

    //save changes
    async function saveOnSubmit(e) {
        e.preventDefault();
        console.log(newMusicGenre);
        //const newName = e.target.bandName.value;
        //const newLogo = e.target.bandLogo.value;
        //const newDescription = e.target.bandDescription.value;
        //const newMusicGenre = e.target.bandGenre.value;
        await updateDoc(doc(db, "Bands", props.thisBand.id), {
            bandName: newBandName,
            bandLogo: newLogo,
            bandDescription : newDescription,
            bandGenres: newMusicGenre
        });
        props.setPopBand(false);
    }

    async function closePopUp(a) {
        a.preventDefault();
        console.log(newMusicGenre);
        props.setPopBand(false);
    }

    return props.popBand ? (
        <div className="popup" >
            <div className="popup-inner">

                <Heading size="lg" mb="10" textAlign="Left">{"Edit Band"}</Heading>
                           
                <button class="btn-close" onClick={closePopUp}><i class="fa fa-close"></i> Close</button>
                <br></br>
                <br></br>

                <form onSubmit={saveOnSubmit}>

                    <Stack space={0} alignItems="left">
                            

                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="xl" w="180">Band Name: </Text>
                            </View>
                            <Input
                                size="xl"
                                defaultValue={props.thisBand.bandName}
                                type="bandName"
                                name="bandName"
                                id="bandName"
                    
                                placeholder="Band Name"
                                
                                onChange={handleNBNC}
                                w={"100%"}
                                isRequired

                                _hover = {{
                                borderColor: '#4f46e5' 
                                }}
                                _invalid={{borderColor: '#4f46e5' }}
                                _focus ={{borderColor: '#4f46e5' }}
                                _disabled ={{borderColor: '#4f46e5' }}
                            />
                        </HStack>
            
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="xl" w="180">Logo: </Text>
                            </View>
                            <Input
                                size="xl"
                                defaultValue={props.thisBand.bandLogo}
                                type="bandLogo"
                                name="bandLogo"
                                id="bandLogo"
                                
                                placeholder="Band Logo"
                                onChange={handleNBLC}
                                w={"100%"}
                                isRequired
                                
                                _hover = {{
                                borderColor: '#4f46e5' 
                                }}
                                _invalid={{borderColor: '#4f46e5' }}
                                _focus ={{borderColor: '#4f46e5' }}
                                _disabled ={{borderColor: '#4f46e5' }}
                            />
                        </HStack>
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="xl" w="180">Band Description: </Text>
                            </View>
                            <Input
                                size="xl"
                                defaultValue={props.thisBand.bandDescription}
                                type="bandDescription"
                                name="bandDescription"
                                id="bandDescription"
                    
                                placeholder="bandDescription"
                       
                                onChange={handleNBDC}
                                w={"100%"}
                                isRequired
                                
                                _hover = {{
                                borderColor: '#4f46e5' 
                                }}
                                _invalid={{borderColor: '#4f46e5' }}
                                _focus ={{borderColor: '#4f46e5' }}
                                _disabled ={{borderColor: '#4f46e5' }}
                            />
                        </HStack>
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="xl" w="180">Music Genre: </Text>
                            </View>
                            <Input
                                size="xl"
                                defaultValue={props.thisBand.bandGenres}
                                type="bandGenre"
                                name="bandGenre"
                                id="bandGenre"
                    
                                placeholder="bandGenre"
                                onChange={handleNMGC}
                                w={"100%"}
                                isRequired
                             
                                
                                _hover = {{
                                borderColor: '#4f46e5' 
                                }}
                                _invalid={{borderColor: '#4f46e5' }}
                                _focus ={{borderColor: '#4f46e5' }}
                                _disabled ={{borderColor: '#4f46e5' }}
                            />
                        </HStack>
                    </Stack>
                    <Text bold fontSize="2xl">Members:</Text>
                        {lista.map((user) => {
                        if (props.thisBand.bandMembers.includes(user.id)) {
                            return (
                            <div>
                                <Text fontSize="xl" w="120" lineHeight="2xl" >Name: {user.userName}, Username: {user.userUsername}</Text>
                                <button class="btn-remove"  onClick={() => deleteUserOnBand(user.id)}><i class="fa fa-trash"></i> Remove user</button>
                            </div>
                            );
                        }
                        })}
                        {/**Division/ */}
                        <hr></hr>
                        {lista
                        .map((user) => {
                            if(user.userRole == "Band Member"){
                                return (
                                <p>
                                    <Text fontSize="xl" w="120">
                                    {"Name: " + user.userName + ", Username: " + user.userUsername}{" "}
                                    <button onClick={() => addUserOnBand(user.id)}>
                                        Añadir
                                    </button>{" "}
                                    </Text>
                                </p>
                                );
                            }
                        })}
                        <br></br>
                        <button type="submit">Save set</button>
                        <button
                        onClick={() => {
                            deleteBand(props.thisBand.id);
                        }}
                        >
                        Delete band
                        </button>
                </form>

                {/* <form onSubmit={saveOnSubmit}>
                    <div>
                        Name 1: 
                        <input name="bandName" defaultValue={props.thisBand.bandName}></input>{" "}
                        <br></br>
                        Logo:{" "}
                        <input name="bandLogo" defaultValue={props.thisBand.bandLogo}></input>{" "}
                        <br></br>
                        Description: 
                        <input name="bandDescription" defaultValue={props.thisBand.bandDescription}></input>{" "}
                        <br></br>
                        Music Genre:{" "}
                        <input name="bandGenre" defaultValue={props.thisBand.bandGenres}></input>{" "}
                        <br></br>
                        Members:
                        {lista.map((user) => {
                        if (props.thisBand.bandMembers.includes(user.id)) {
                            return (
                            <div>
                                <p>Name: {user.userName}, Username: {user.userUsername}</p>
                                <button onClick={() => deleteUserOnBand(user.id)}>
                                remove user
                                </button>
                            </div>
                            );
                        }
                        })} */}
                        {/**Division/ */}
                        {/* <hr></hr>
                        {lista
                        .map((user) => {
                            if(user.userRole == "Band Member"){
                                return (
                                <div>
                                    <p>
                                    {"Name: " + user.userName + ", Username: " + user.userUsername}{" "}
                                    <button onClick={() => addUserOnBand(user.id)}>
                                        Añadir
                                    </button>{" "}
                                    </p>
                                </div>
                                );
                            }
                        })}
                        <br></br>
                        <button type="submit">Save set</button>
                        <button
                        onClick={() => {
                            deleteBand(props.thisBand.id);
                        }}
                        >
                        Delete band
                        </button>
                    </div>
                </form> */}
            </div>
        </div>
    ) : null;
};

export default PopupBands;
