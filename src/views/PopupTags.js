import React,  { useEffect, useState, useRef } from 'react'
import "../css/Popup.css";
import {BsTrash, BsTrash2Fill, BsTrashFill} from "react-icons/bs"
import {FaTimes} from 'react-icons/fa'


import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";

import {Icon, Box, Heading, Text, Badge, Button, Center, AlertDialog, HStack, Stack, View, Input} from "native-base"


const PopupTags =(props) => {
  const [newTagName,setNewTagName]= useState("")
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const cancelRef = useRef(null)
  
  const handleNTNC = (event) => {setNewTagName(event.target.value);}

  async function deleteTag(tagId) {
    await deleteDoc(doc(db, "Tag", tagId));
    props.setPopStatus(false);
  }

  useEffect(() => {
    console.log(props.tag)
  }, [])
  
  async function saveOnSubmit(e) {
    e.preventDefault();
    // const newTagName = e.target.TagTitle.value;
    await updateDoc(doc(db, "Tag", props.tag.id), {
      tagName: newTagName
    });
    props.setPopStatus(false);
  }

 

 
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/*AQUI SE GUARDA LOS DATOS DE LA ROLA EN EL POPUP */}
        <Heading size="md" mb="10" textAlign="Left">{"Edit Tag"}</Heading>       
                <button class="btn-close" onClick={() => props.setPopStatus(false)}><i class="fa fa-close"></i>
        </button>
                <br></br>
                <br></br>
        <form onSubmit={saveOnSubmit}>
              <HStack>
                    <Stack space={0} alignItems="left" my="auto" w="70%">
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="sm" w="100">Título: </Text>
                            </View>
                            <Input
                                size="sm"
                                defaultValue={props.tag.tagName}
                                type="tagName"
                                name="tagName"
                                id="tagName"
                    
                                placeholder="Tag Name"
                                onChange={handleNTNC}
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
                  
                   
                    </HStack>
                    <br></br>     
                    <HStack>
                    <Stack space={0} alignItems="left" my="auto" w="100%">
                        <HStack mb="1%" space={2} alignItems="left">                  
                        <button class="btn-save" type="submit"><i class="fa fa-save"></i> Save Tag</button>
              <Button colorScheme="danger" borderRadius="10" onPress={() => setIsOpen(!isOpen)} leftIcon={<BsTrashFill color="white"/>}>
        Delete Show
            </Button>
           
            </HStack>
                    </Stack>
                        </HStack>
                        <AlertDialog
               
              leastDestructiveRef={cancelRef}
              isOpen={isOpen}
              onClose={onClose}
            
            >
              <AlertDialog.Content  position="absolute"
                top="40">
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
                    <Button borderRadius="10" colorScheme="danger" onPress={() => { deleteTag(props.tag.id);onClose(); }} ref={cancelRef}>
                      Delete
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
                          
        </form>
      </div>
    </div>
  ) : null;
}

export default PopupTags
