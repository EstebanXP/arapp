import React,{useEffect,useState} from 'react'
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    orderBy,
} from 'firebase/firestore';
import db from '../firebase';
import ShowMembers from "./ShowMembers";

const ManageMembers = (props) => {

    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("");
    const [members, setMembers] = useState([]);
    const [searchParam,setSearchParam] = useState("");
    const [sortings, setSortings] = useState("memberName");
    const membersCollectionRef = collection(db, "bandMembers");

    //setMembers
    useEffect(() =>{
        const membersObject= query(collection(db,'bandMembers'), orderBy(sortings));
        const membersSnapshot=onSnapshot(membersObject,(querySnapshot)=>{
            let data=[];
            querySnapshot.forEach((doc)=>{
                data.push({...doc.data(),id:doc.id});
            })
            setMembers(data);
        });
        return ()=> membersSnapshot(); 
    }, [sortings]);

    //createMembers
    const createMember = async () => {
        await addDoc(membersCollectionRef, {memberName: newName, rol: newRole});
    }

    //sort
    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }

    return (
        <div>
            <h3>Add member without account</h3>
            <h3>Name:</h3>
            <input onChange={(event) => {
                setNewName(event.target.value)
                }} 
            />
            <h3>Role:</h3>
            <input onChange={(event) => {
                setNewRole(event.target.value)
                }} 
            /> <br/><br/>
            <button onClick = {createMember}>Create Member</button>
            <hr/>
            <form >
                <label>
                Order by:
                <select value={sortings} onChange={handleChange}>
                    <option value="memberName">name</option>
                    <option value="rol">role</option>
                </select>
                </label>
            </form>

            <div className="SearchBar">
                <input type="text" name="title" placeholder="Search..." onChange={(event)=>{setSearchParam(event.target.value);}}></input>
            </div>
            
            {members.filter((val)=>{
                if(searchParam===""){
                return val
                }else if(val.memberName.toLowerCase().includes(searchParam.toLowerCase())){
                return val;
                }else if(val.rol.toLowerCase().includes(searchParam.toLowerCase())){
                return val;
                }
            }).map((member) => {
                //if (props.userID == set.createdBy) {
                    return (
                        <div>
                            <ShowMembers tmem={member} />
                        </div>
                    );
                //}
            })}
        </div>
    );

}

export default ManageMembers;