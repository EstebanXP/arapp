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
                    <p>Member's name: {props.memberName}</p>
                    <p>Member's role: {props.rol}</p>
            </div>
        </div>
    )
}

const UMembers = () => {
  const [lista, setLista] = useState([]);
  const [sortings, setSortings] = useState("memberName");
  const [searchParam,setSearchParam] = useState("");
  const [currentMember, setCurrentMember] = useState({
    memberName: "",
    rol: "",
    id: "",
  });

  async function deleteMember(memberId) {
    await deleteDoc(doc(db, "bandMembers", memberId));
  }

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }


  function editMember(member) {
    setCurrentMember({
      id: member.id,
      memberName: member.memberName,
      rol: member.rol,
    });
  }

  async function saveOnSubmit(e) {
    e.preventDefault();
    const newName = e.target.memberName.value;
    const newRole = e.target.rol.value;
    await updateDoc(doc(db, "bandMembers", currentMember.id), {
      memberName: newName,
      rol: newRole,
    });
  }

  useEffect(() => {
    const memberObject = query(collection(db, "bandMembers"), orderBy(sortings));
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
            <option value="memberName">name</option>
            <option value="rol">role</option>
          </select>
        </label>
      </form>


      <form onSubmit={saveOnSubmit}>
        <div>
          Name: 
          <input name="memberName" defaultValue={currentMember.memberName}></input>{" "}
          <br></br>
          Role:{" "}
          <input name="rol" defaultValue={currentMember.rol}></input>{" "}
          <br></br>
          Save: <button type="submit">Save </button>
        </div>
      </form>
      {lista.filter((val)=>{
        if(searchParam===""){
          return val
        }else if(val.memberName.toLowerCase().includes(searchParam.toLowerCase())){
          return val;
        }else if(val.rol.toLowerCase().includes(searchParam.toLowerCase())){
          return val;
        }
      }).map((link) => (
        <div className="card mb-1">
          <ShowMembers
            memberName={link.memberName}
            rol={link.rol}
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
