import React, { useEffect, useState } from "react";
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

const ShowMembers = (props) => {
    return (
        <div className="container">
            <div className="card-body">
                    <p>Member's name: {props.name}</p>
                    <p>Member's role: {props.role}</p>
            </div>
        </div>
    )
}

const UMembers = () => {
  const [lista, setLista] = useState([]);
  const [sortings, setSortings] = useState("name");
  const [searchParam,setSearchParam] = useState("");
  const [currentMember, setCurrentMember] = useState({
    name: "",
    role: "",
    id: "",
  });

  async function deleteMember(memberId) {
    await deleteDoc(doc(db, "members", memberId));
  }

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }


  function editMember(member) {
    setCurrentMember({
      id: member.id,
      name: member.name,
      role: member.role,
    });
  }

  async function saveOnSubmit(e) {
    e.preventDefault();
    const newName = e.target.name.value;
    const newRole = e.target.role.value;
    await updateDoc(doc(db, "members", currentMember.id), {
      name: newName,
      role: newRole,
    });
  }

  useEffect(() => {
    const memberObject = query(collection(db, "members"), orderBy(sortings));
    const membersSnapshot = onSnapshot(memberObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLista(data);
    });
    return () => membersSnapshot();
  }, [sortings]);
  
  return (
    <div className="col-md-8">

      <div className="SearchBar">
        <input type="text" name="title" placeholder="Search..." onChange={(event)=>{setSearchParam(event.target.value);}}></input>
      </div>

      <form >
        <label>
          Order by:
          <select value={sortings} onChange={handleChange}>
            <option value="name">name</option>
            <option value="role">role</option>
          </select>
        </label>
      </form>


      <form onSubmit={saveOnSubmit}>
        <div>
          Name: 
          <input name="name" defaultValue={currentMember.name}></input>{" "}
          <br></br>
          Role:{" "}
          <input name="role" defaultValue={currentMember.role}></input>{" "}
          <br></br>
          Save: <button type="submit">Save </button>
        </div>
      </form>
      {lista.filter((val)=>{
        if(searchParam===""){
          return val
        }else if(val.name.toLowerCase().includes(searchParam.toLowerCase())){
          return val;
        }else if(val.role.toLowerCase().includes(searchParam.toLowerCase())){
          return val;
        }
      }).map((link) => (
        <div className="card mb-1">
          <ShowMembers
            name={link.name}
            role={link.role}
          />
          <button className="editar" onClick={() => editMember(link)}>
            Edit
          </button>
          <button className="borrar" onClick={() => deleteMember(link.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UMembers;
