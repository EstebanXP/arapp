import React, { useEffect, useState } from "react";
import "../css/Popup.css";
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
import { NativeBaseProvider, Box, View, Stack, HStack, Input, Button, Alert,Text, Heading, Center, Link, Select, CheckIcon, FormControl, WarningOutlineIcon} from "native-base";

const PopupBands = (props) => {
    const [lista, setLista] = useState([]);

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
        props.setPopStatus(false);
    };

    //save changes
    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.bandName.value;
        const newLogo = e.target.bandLogo.value;
        const newDescription = e.target.bandDescription.value;
        const newMusicGenre = e.target.bandGenre.value;
        await updateDoc(doc(db, "Bands", props.thisBand.id), {
            bandName: newName,
            bandLogo: newLogo,
            bandDescription : newDescription,
            bandGenre: newMusicGenre
        });
        props.setPopStatus(false);
    }

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setPopStatus(false)}>Close</button>
                <form onSubmit={saveOnSubmit}>
                    <Stack space={0} alignItems="left">
                        <Heading size="lg" mb="10" textAlign="Left">{"Edit"}</Heading>
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text w="120">Band Name: </Text>
                            </View>
                            <Input
                                defaultValue={props.thisBand.bandName}
                                type="bandName"
                                name="bandName"
                                id="bandName"
                    
                                placeholder="Band Name"
                                onChange={props.thisBand.bandName}
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
                                <Text w="120">Logo: </Text>
                            </View>
                            <Input
                                defaultValue={props.thisBand.bandLogo}
                                type="bandLogo"
                                name="bandLogo"
                                id="bandLogo"
                    
                                placeholder="Band Logo"
                                onChange={props.thisBand.bandLogo}
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
                                <Text w="120">Band Description: </Text>
                            </View>
                            <Input
                                defaultValue={props.thisBand.bandDescription}
                                type="bandDescription"
                                name="bandDescription"
                                id="bandDescription"
                    
                                placeholder="bandDescription"
                                onChange={props.thisBand.bandDescription}
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
                                <Text w="120">Music Genre: </Text>
                            </View>
                            <Input
                                defaultValue={props.thisBand.bandGenre}
                                type="bandGenre"
                                name="bandGenre"
                                id="bandGenre"
                    
                                placeholder="bandGenre"
                                onChange={props.thisBand.bandGenre}
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
                        })}
                        {/**Division/ */}
                        <hr></hr>
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
                </form>

                <form onSubmit={saveOnSubmit}>
                    <div>
                        Name: 
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
                        })}
                        {/**Division/ */}
                        <hr></hr>
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
                </form>
            </div>
        </div>
    ) : null;
};

export default PopupBands;
