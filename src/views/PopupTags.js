import React,  { useEffect, useState, useRef } from 'react'
import "../css/Popup.css";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, HStack, Stack, View, Input} from "native-base"

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

const PopupTags =(props) => {
  const [newTagName,setNewTagName]= useState("")
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const cancelRef = useRef(null)

  async function deleteTag(tagId) {
    await deleteDoc(doc(db, "Tag", tagId));
    props.setPopStatus(false);
  }

  async function saveOnSubmit(e) {
    e.preventDefault();
    const newTagName = e.target.TagTitle.value;
    await updateDoc(doc(db, "Tag", props.tag.id), {
      tagName: newTagName
    });
    props.setPopStatus(false);
  }

  const handleNTNC = (event) => setNewTagName(event.target.value);

  useEffect(() => {
    console.log(props.tag)
  }, [])
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/*AQUI SE GUARDA LOS DATOS DE LA ROLA EN EL POPUP */}
        <Heading size="md" mb="10" textAlign="Left">{"Edit Tag"}</Heading>       
                <button class="btn-close" onClick={() => props.setPopStatus(false)}><i class="fa fa-close"></i></button>
                <br></br>
                <br></br>
        <form className="form-popup" onSubmit={saveOnSubmit}>
              <HStack>
                    <Stack space={0} alignItems="left" my="auto" w="70%">
                        <HStack mb="1%" space={2} alignItems="left">
                            <View style={{justifyContent: 'center'}}>
                                <Text fontSize="sm" w="180">Título: </Text>
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
                        <button class="btn-save" type="submit" onClick={()=>{saveOnSubmit()}}><i class="fa fa-save"></i></button>
                        <button class="btn-delete" type="submit"
                        onClick={() => {
                            deleteTag(props.thisTag.id);
                        }}
                        ><i class="fa fa-trash"></i></button>
          <p>Nuevo titulo: </p>
          <input defaultValue={props.tag.tagName} name="TagTitle"></input>
          <br></br>
          <button type="submit">Guardar</button>
          <Center>
            <Button colorScheme="danger" borderRadius="10" onPress={() => setIsOpen(!isOpen)}>
              Delete Show
            </Button>
            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <AlertDialog.Content position="absolute" top="40">
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
                    <Button borderRadius="10" colorScheme="danger" onPress={() => { deleteTag(props.tag.id) }}>
                      Delete
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Center>
        </form>
      </div>
    </div>
  ) : null;
}

export default PopupTags
