import React from "react";
import "../css/Popup.css";
import { deleteDoc, doc, updateDoc,} from "firebase/firestore";
import db from "../firebase";

const PopupBands = (props) => {
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
                <h3>Edit</h3>
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
                        <button type="submit">Save </button>
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
