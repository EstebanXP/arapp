import React from 'react'
import "../css/Popup.css";

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
              <button onClick={() => deleteTag(props.tag.id)}>Borrar</button>
            </form>
          </div>
        </div>
      ) : null;
}

export default PopupTags
