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

const ShowTags = (props) => {
    return (
        <div className="container">
            <div className="card-body">
                    <p>Tag name: {props.tagName}</p>
            </div>
        </div>
    )
};

const UTags = () => {
    const [list, setList] = useState([]);
    const [sortings, setSortings] = useState("tagName");
    const [searchParam,setSearchParam] = useState("");
    const [currentTag, setCurrentTag] = useState({
        id: "",
        tagName: ""
    });

    async function deleteTag(tagId) {
        await deleteDoc(doc(db, "Tag", tagId));
    }

    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }


    function editTag(tag) {
        setCurrentTag({
            id: tag.id,
            tagName: tag.tagName
        });
    }

    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        
        await updateDoc(doc(db, "Tag", currentTag.id), {
            tagName: newName
        });
    }

    useEffect(() => {
        const tagObject = query(collection(db, "Tag"), orderBy(sortings));
        const tagsSnapshot = onSnapshot(tagObject, (querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setList(data);
        });
        return () => tagsSnapshot();
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
                        <option value="tagName">name</option>
                    </select>
                </label>
            </form>

            <form onSubmit={saveOnSubmit}>
                <div>
                    Name: 
                    <input name="name" defaultValue={currentTag.tagName}></input>{" "}
                    <br></br>
                    Save: <button type="submit">Save </button>
                </div>
            </form>   

            {list.filter((val) => {
                if(searchParam === "") {
                    return val
                } else if(val.tagName.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                }
            }).map((link) => (
                <div className="card mb-1">
                    <ShowTags
                        tagName={link.tagName}
                    />
                    <button className="editar" onClick={() => editTag(link)}>
                        Edit
                    </button>
                    <button className="borrar" onClick={() => deleteTag(link.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UTags;