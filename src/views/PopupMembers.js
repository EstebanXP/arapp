import React from "react";
import "../css/Popup.css";
import { deleteDoc, doc, updateDoc,} from "firebase/firestore";
import db from "../firebase";

const PopupMembers = (props) => {
  //delete Member
  const deleteMember = async (memberId) => {
    await deleteDoc(doc(db, "bandMembers", memberId));
    props.setPopStatus(false);
  };

  //save changes
  async function saveOnSubmit(e) {
    e.preventDefault();
    const newName = e.target.memberName.value;
    const newRole = e.target.rol.value;
    await updateDoc(doc(db, "bandMembers", props.thisMem.id), {
      memberName: newName,
      rol: newRole,
    });
    props.setPopStatus(false);
  }

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setPopStatus(false)}>
          Close
        </button>
        <h3>Edit</h3>
        <form onSubmit={saveOnSubmit}>
          <div>
            Name:
            <input name="memberName" defaultValue={props.thisMem.memberName}></input>{" "}
            <br></br>
            Role:{" "}
            <input name="rol" defaultValue={props.thisMem.rol}></input>{" "}
            <br></br>
            <button type="submit">Save </button>
            <button
              onClick={() => {
                deleteMember(props.thisMem.id);
              }}
            >
              Delete member
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default PopupMembers;
