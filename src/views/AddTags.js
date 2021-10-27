import React,{useEffect, useState} from 'react';

import db from '../firebase';
import {
    collection,
    addDoc,
    query,
    onSnapshot, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';

const AddTags = () => {

    const [newName, setNewName] = useState("");

    const [tags, setTags] = useState([]);
    const tagsCollectionRef = collection(db, "tags");

    //get Tags
    useEffect(() => {
        const tagsObject = query(collection(db,'tags'));
        const tagsSnapshot = onSnapshot(tagsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            })
            setTags(data);
        });
        return ()=> tagsSnapshot(); 

    }, []);

    //create Tags
    const createTag = async () => {
        await addDoc(tagsCollectionRef, { name: newName });
    };

    //delete Tag
    const deleteTag = async (id) => {
        const tagDoc = doc(db, 'tags', id);
        await deleteDoc(tagDoc);
    };

    return (
        <div>
            <h3>Name:</h3>
            <input onChange={(event) => {
                setNewName(event.target.value)
            }}/>
            <button onClick = {createTag}>Create Tag</button>
        
            {tags.map((tag) => {
                return (
                    <div>
                        <h3>Name: {tag.name}</h3>
                        <button onClick ={() => {deleteTag(tag.id)}}>Delete Tag</button>
                    </div>
                );
            })}
        </div>
    );
};

export default AddTags;
