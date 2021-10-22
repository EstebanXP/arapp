import React,{useEffect,useState} from 'react'

import db from '../firebase';
import {
    collection,
    addDoc,
    query,
    onSnapshot, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';

const AddMembers = () => {

    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("");

    const [members, setMembers] = useState([]);
    const membersCollectionRef = collection(db, "members");

    //getMembers
    useEffect(() =>{

        const membersObject= query(collection(db,'members'));
        const membersSnapshot=onSnapshot(membersObject,(querySnapshot)=>{
            let data=[];
            querySnapshot.forEach((doc)=>{
                data.push({...doc.data(),id:doc.id});
            })
            setMembers(data);
        });
        return ()=> membersSnapshot(); 

    }, []);

    //createMembers
    const createMember = async () => {
        await addDoc(membersCollectionRef, {name: newName, role: newRole});
    }

    //deleteMembers
    const deleteMember = async (id) => {
        const memberDoc = doc(db, "members", id);
        await deleteDoc(memberDoc);
    }
    

    return (

        <div>
        
        <input placeholder="name..." onChange={(event) => {
            setNewName(event.target.value)
            }} 
        />
        <input placeholder="role..."onChange={(event) => {
            setNewRole(event.target.value)
            }} 
        />
        <button onClick = {createMember}>Create Member</button>
        
        {members.map((member) => {
            return (
            <div>
                <h3>Name: {member.name}</h3>
                <h3>Role: {member.role}</h3>
                <button onClick ={() => {deleteMember(member.id)}}>Delete Member</button>
            </div>
            );
        })}


        </div>

    );

}

export default AddMembers;