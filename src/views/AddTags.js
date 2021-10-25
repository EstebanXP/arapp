import React,{useEffect,useState} from 'react'
import db from '../firebase';
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';

const AddTags = () => {

    const [newName, setNewName] = useState("");

    const [tags, setTags] = useState([]);
    const tagsCollectionRef = collection(db, "tags");

    //get Tags
    useEffect( () => {
        const getTags = async () => {
        const data = await getDocs(tagsCollectionRef)
            setTags(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        };
        getTags(); 
    }, []);

    //create Tags
    const createTag = async () => {
        await addDoc(tagsCollectionRef, { name: newName });
    };

    //delete Tag
    const deleteTag = async (id) => {
        const setDoc = doc(db, "tags", id);
        await deleteDoc(setDoc);
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
