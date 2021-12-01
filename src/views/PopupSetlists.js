import React, { useState } from "react";
import "../css/Popup.css";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import {
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import db from "../firebase";

const PopupSetlists = (props) => {
    
    //delete Setlist
    const deleteSetlist = async (setlistId) => {
        await deleteDoc(doc(db, "setlists", setlistId));
        //props.setPopStatus(false);
    };

    //save changes
    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newSets = e.target.sets.value;
        const newShow = e.target.show.value;
        const newBand = e.target.band.value;
        const newTag = e.target.tag.value;

        await updateDoc(doc(db, "setlists", props.thisSetlist.id), {
            name: newName,
            sets: newSets,
            show: newShow,
            band: newBand,
            tag: newTag
        });
        //props.setPopStatus(false);
    }

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setPopStatus(false)}>Close</button>
                <Heading>Edit</Heading>
                <form onSubmit={saveOnSubmit}>
                    <div>
                        <HStack w="100%">
                        <Text>Name: </Text>
                        <input className="input-order-songs" alignItems="right" placeholder="Name:" name="name" defaultValue={props.setlist.name}></input>{" "}
                        </HStack>
                       
                        
                        Sets:{" "}
                        <input className="input-order-songs" placeholder="Sets:" name="sets" defaultValue={props.setlist.sets}></input>{" "}
                        {console.log(props.setlist)}
                        <br></br>
                        Show:
                        <input className="input-order-songs" placeholder="Show:"name="show" defaultValue={props.setlist.show}></input>
                        <br></br>
                        Band:
                        <input className="input-order-songs" placeholder="Band:" name="band" defaultValue={props.setlist.band}></input>
                        <br></br>
                        Tag:
                        <input className="input-order-songs" placeholder="Tag:" name="tag" defaultValue={props.setlist.tag}></input>
                        <br></br>
                        <button class="btn-save" type="submit"><i class="fa fa-save"></i> </button>
                        <button class="btn-delete"onClick={() => {deleteSetlist(props.setlist.id);}}><i class="fa fa-trash"></i></button>
                    </div>
                </form>
            </div>
        </div>
    ): null;
};

export default PopupSetlists;
