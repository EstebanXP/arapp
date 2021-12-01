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
import {BsTrash} from "react-icons/bs"
import {FaTimes} from 'react-icons/fa'
import {MdModeEditOutline} from 'react-icons/md'
import { NativeBaseProvider, AlertDialog, Image, Box, View, Stack, HStack, Input, Alert,Text, Heading, Center, Link, Select, CheckIcon, FormControl, WarningOutlineIcon, Button, Badge} from "native-base";
import Carousel from './CarouselChico'

const PopupBands = (props) => {
    {/* STATES*/}
    const [lista, setLista] = useState([]);
    const [newBandName,setNewBandName]= useState(props.thisBand.bandName);
    const [newLogo,setNewLogo]= useState(props.thisBand.bandLogo);
    const [newDescription,setNewDescription]= useState(props.thisBand.bandDescription);
    const [newMusicGenre,setNewMusicGenre]= useState(props.thisBand.bandGenres);
    const [edit, setEdit] = useState(false);
    const [listaBandMembers, setListaBandMembers] = useState([]);
    const [isOpen, setIsOpen] = React.useState(false)
    const cancelRef = React.useRef(null)
    {/*FUNCIONES STATES*/}
    const handleNBNC = (event) => setNewBandName(event.target.value);
    const handleNBLC = (event) => setNewLogo(event.target.value);
    const handleNBDC = (event) => setNewDescription(event.target.value);
    const handleNMGC = (event) => setNewMusicGenre(event.target.value);
    const onClose = () => setIsOpen(false)
    useEffect(() => {
        const usersObject = query(collection(db, "Users")); //Guardar referencia de la coleccion
        const usersSnapshot = onSnapshot(usersObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            if(props.thisBand.bandMembers.includes(doc.id)){
            data.push({ ...doc.data(), id: doc.id });
        }});
        setLista(data); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
        });
        
        const usersSnapshot1 = onSnapshot(usersObject, (querySnapshot) => {
            let data1 = [];
            querySnapshot.forEach((doc) => {
                
                data1.push({ ...doc.data(), id: doc.id });
            });
            setListaBandMembers(data1); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
            });
        return () => {usersSnapshot(); usersSnapshot1()};
        
            
    }, []);

    const deleteUserOnBand = async (userID) => {
        await updateDoc(doc(db, "Bands", props.thisBand.id), {
            bandMembers: arrayRemove(userID),
        });
        onClose();
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
    async function saveOnSubmit() {
        // e.preventDefault();
        
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

        // props.thisBand.bandName="Hola Esteban"
        // props.setPopBand(false);
    }

    async function closePopUp(a) {
        a.preventDefault();
  
        props.setPopBand(false);
    }

    return edit ? (
        <div className="popup" >
            <div className="popup-inner">
                <Heading size="md" mb="10" textAlign="Left">{"Edit Band"}</Heading>       
                <button class="btn-close" onClick={closePopUp}><i class="fa fa-close"></i></button>
                <br></br>
                <br></br>
                <form onSubmit={saveOnSubmit}>
                    <HStack>
                    <Stack space={0} alignItems="left" my="auto" w="70%">
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="sm" w="180">Band Name: </Text>
                            </View>
                            {/* <h1>{newBandName}</h1> */}
                            <Input
                                size="sm"
                                defaultValue={newBandName}
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
                                <Text fontSize="sm" w="180">Logo: </Text>
                            </View>
                            <Input
                                size="sm"
                                defaultValue={newLogo}
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
                                <Text fontSize="sm" w="180">Band Description: </Text>
                            </View>
                            <Input
                                size="sm"
                                defaultValue={newDescription}
                                type="bandDescription"
                                name="bandDescription"
                                id="bandDescription"
                    
                                placeholder="Band Description"
                       
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
                                <Text fontSize="sm" w="180">Music Genre: </Text>
                            </View>
                            <Input
                                size="sm"
                                defaultValue={newMusicGenre}
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
                    <Box my="auto" w="30%">
                    <Text bold fontSize="2md">Members:</Text>
                    <Carousel show={3}>
                        {lista.map((user) => {
                        
                            return (
                            <Box w="100%">
                                <Box mx="1"  bg="warmGray.100" borderRadius="20" mt="1" h="100%">
                                    <Center>
                                    <br></br>
                                    <Image
                                    mt="2"
                                    source={{
                                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                                    }}
                                    alt="Alternate Text"
                                    size="xs"
                                    borderRadius="100"
                                    />
                                    <Text textAlign="center" lineHeight="3md" >{user.userName}</Text>
                                    <Text textAlign="center" bold mb="2" lineHeight="2md" >@{user.userUsername}</Text>
                                    
                                    <Button colorScheme="danger" borderRadius="10"mb="2"  onPress={() => setIsOpen(!isOpen)}>
                                        <BsTrash size=".8em" color="white"></BsTrash>
                                    </Button>
                                    <AlertDialog
                                        leastDestructiveRef={cancelRef}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                    >
                                        <AlertDialog.Content>
                                        <AlertDialog.CloseButton />
                                        <AlertDialog.Header>Remove</AlertDialog.Header>
                                        <AlertDialog.Body>
                                            This will remove this member from the band. This action cannot be
                                            reversed. Deleted data can not be recovered.
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                            <Button.Group space={2}>
                                            <Button
                                                borderRadius="10"
                                                variant="unstyled"
                                                colorScheme="coolGray"
                                                onPress={onClose}
                                                ref={cancelRef}
                                            >
                                                Cancel
                                            </Button>
                                            <Button borderRadius="10" colorScheme="danger" onPress ={() => {deleteUserOnBand(user.id)}}>
                                                Remove
                                            </Button>
                                            </Button.Group>
                                        </AlertDialog.Footer>
                                        </AlertDialog.Content>
                                    </AlertDialog>
                                    </Center>
                                
                                </Box>
                            </Box>
                            );
                        
                        })}
                          </Carousel>
                    </Box>
                    </HStack>
                    <Text bold fontSize="2md">Members:</Text>
                    
                        {/**Division/ */}
                        <hr></hr>
                        {listaBandMembers
                        .map((user) => {
                            if(user.userRole == "Band Member"){
                                return (
                                <p>
                                    <Text fontSize="md" w="120">
                                    {"Name: " + user.userName + ", Username: " + user.userUsername}{" "}
                                    <button class="btn-add" onClick={() => addUserOnBand(user.id)}><i class="fa fa-user-plus"></i> Añadir</button>{" "}
                                    </Text>
                                </p>
                                );
                        }})}
                        <button class="btn-save" type="submit" onClick={()=>{saveOnSubmit();setEdit(!edit);}}><i class="fa fa-save"></i> Save Band</button>
                        <button class="btn-delete" type="submit"
                        onClick={() => {
                            deleteBand(props.thisBand.id);
                        }}
                        ><i class="fa fa-trash"></i> Delete band</button>
                        
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
    ) : (
        <div className="popup" >
        <div className="popup-inner">
                 
            <Button borderRadius="8"colorScheme="danger" position="absolute" top="4" right="4" width="8" onPress={()=>{props.setPopBand(false)}}><FaTimes color="white"></FaTimes></Button>
            <Image borderLeftRadius="20"  source={{
                          uri: newLogo,
                      }} 
                      fallbackSource ={{ uri : "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}}
                      alt="Alternate Text"
                      w="400"
                      h="100%"
                      alt="Alternate Text"
                      position="absolute"
                      top="0"
                      left="0"
                /> 
                <HStack>
                <Box p="20%">
                
                </Box>
                <Stack space={0} alignItems="left" w="50%" m="auto">
                    <Heading size="xl" textAlign="Left">{newBandName}</Heading>         
                    <Text w="100%">{newDescription}</Text>
                    <Badge  colorScheme="light" borderRadius="5" mx="auto" my="2">{newMusicGenre}</Badge>
                    <Box>
                        
                        <Carousel show={3}>
                            {lista.map((user) => {
                            
                                return (
                                <Box w="100%">
                                    <Box mx="1"  bg="warmGray.100" borderRadius="20" mt="1" h="100%">
                                        <Center>
                                        <br></br>
                                        <Image
                                        
                                        source={{
                                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                                        }}
                                        alt="Alternate Text"
                                        size="xs"
                                        borderRadius="100"
                                        />
                                        <Text textAlign="center" lineHeight="3md" >{user.userName}</Text>
                                        <Text textAlign="center" bold mb="2" lineHeight="2md" >@{user.userUsername}</Text>
                                        
                                        
                                        </Center>
                                    
                                    </Box>
                                </Box>
                                );
                            
                            })}
                      </Carousel>
                    </Box>
                    
                        
                    
                </Stack>
                
                </HStack>
                <HStack  position="absolute" bottom="4"> 
                            <Button colorScheme="indigo" borderRadius="10" size="6" onPress={()=>{setEdit(!edit)}}><MdModeEditOutline color="white"/></Button>
                </HStack>
                
                    {/**Division/ */}
                    
                    
                    
                    
            

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
    );
};

export default PopupBands;
