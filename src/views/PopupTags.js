import React from 'react'
import "../css/Popup.css";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog} from "native-base"

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

function PopupTags(props) {

  const [isOpen, setIsOpen] = React.useState(false)

  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef(null)

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


  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/*AQUI SE GUARDA LOS DATOS DE LA ROLA EN EL POPUP */}
        <button className="close-btn" onClick={() => props.setPopStatus(false)}>
          Close
        </button>
        <form className="form-popup" onSubmit={saveOnSubmit}>
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
