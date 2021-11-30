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
import { NativeBaseProvider, AlertDialog, Image, Box, View, Stack, HStack, Input, Alert,Text, Heading, Center, Link, Select, CheckIcon, FormControl, WarningOutlineIcon, Button} from "native-base";
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
    async function saveOnSubmit(e) {
        e.preventDefault();
        
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
                    <Stack space={0} alignItems="left" w="70%">
                            

                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="sm" w="180">Band Name: </Text>
                            </View>
                            <Input
                                size="sm"
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
                                <Text fontSize="sm" w="180">Logo: </Text>
                            </View>
                            <Input
                                size="sm"
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
                                <Text fontSize="sm" w="180">Band Description: </Text>
                            </View>
                            <Input
                                size="sm"
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
                                <Text fontSize="sm" w="180">Music Genre: </Text>
                            </View>
                            <Input
                                size="sm"
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
                    <Box mx="auto">
                    <Carousel show={3}>
                        {lista.map((user) => {
                        
                            return (
                            <Box w="100%">
                                <Box mx="1"  bg="warmGray.100" borderRadius="20" mt="1">
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
                                    <Text  lineHeight="3md" >{user.userName}</Text>
                                    <Text bold mb="2" lineHeight="2md" >@{user.userUsername}</Text>
                                    
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
                                        <AlertDialog.Header>Delete Show</AlertDialog.Header>
                                        <AlertDialog.Body>
                                            This will delete this show. This action cannot be
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
                                                Delete
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
                        <button class="btn-save" type="submit" onClick={()=>{setEdit(!edit)}}><i class="fa fa-save"></i> Save Band</button>
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
            <Heading size="md" mb="10" textAlign="Left">{"Edit Band"}</Heading>       
            <button class="btn-close" onClick={closePopUp}><i class="fa fa-close"></i></button>
            <br></br>
            <br></br>
            
                <HStack>
                <Stack space={0} alignItems="left" w="70%">
                        

                    <HStack mb="1%" space={2} alignItems="left">
                        <View style={{justifyContent: 'center'}}>
                            <Text fontSize="sm" w="180">Band Name: </Text>
                        </View>
                        <Text
                            
                            defaultValue={props.thisBand.bandName}
                            w={"100%"}
                            isRequired
                       >{props.thisBand.bandName}</Text>
                    </HStack>
        
                    <HStack mb="1%" space={2} alignItems="left">
                        <View style={{justifyContent: 'center'}}>
                            <Text fontSize="sm" w="180">Logo: </Text>
                        </View>
                        <Input
                            size="sm"
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
                            <Text fontSize="sm" w="180">Band Description: </Text>
                        </View>
                        <Input
                            size="sm"
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
                            <Text fontSize="sm" w="180">Music Genre: </Text>
                        </View>
                        <Input
                            size="sm"
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
                <Box mx="auto">
                <Carousel show={3}>
                    {lista.map((user) => {
                    
                        return (
                        <Box w="100%">
                            <Box mx="1"  bg="warmGray.100" borderRadius="20" mt="1">
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
                                <Text  lineHeight="3md" >{user.userName}</Text>
                                <Text bold mb="2" lineHeight="2md" >@{user.userUsername}</Text>
                                
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
                                    <AlertDialog.Header>Delete Show</AlertDialog.Header>
                                    <AlertDialog.Body>
                                        This will delete this show. This action cannot be
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
                                            Delete
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
                    <button class="btn-save" onClick={()=>{setEdit(!edit)}}><i class="fa fa-save"></i> Edit Band</button>
                    <button class="btn-delete" 
                    onClick={() => {
                        deleteBand(props.thisBand.id);
                    }}
                    ><i class="fa fa-trash"></i> Delete band</button>
                    
            

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
