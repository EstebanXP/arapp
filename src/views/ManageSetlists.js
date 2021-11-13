import React,{useEffect, useState} from 'react';

import db from '../firebase';
import {
    collection,
    addDoc,
    query,
    onSnapshot, 
    deleteDoc, 
    doc,
    orderBy,
} from 'firebase/firestore';
import ShowSetlists from './ShowSetlists';

const ManageSetlists = () => {

    const userID = "B8O61nHoaISqndbCLTZhvUc3wt12 " //temporal pruebas

    const [newName, setNewName] = useState("");
    const [newSet, setNewSet] = useState([]);
    const [newShow, setNewShow] = useState("");
    const [newBand, setNewBand] = useState("");
    const [newTag, setNewTag] = useState("");
    const [searchParam, setSearchParam] = useState("");
    const [sortings, setSortings] = useState("name");

    const [list, setList] = useState([]); //sets
    const [setlists, setSetlists] = useState([]);
    const setlistsCollectionRef = collection(db, "setlists");

    //get setlist
    useEffect(() => {
        const setlistsObject = query(collection(db,'setlists'), orderBy(sortings));
        const setlistsSnapshot = onSnapshot(setlistsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            });
            setSetlists(data);
        });
        return ()=> setlistsSnapshot(); 
    }, [sortings]);

    //get set
    useEffect(() => {
        const setsObject = query(collection(db, "sets")); //Guardar referencia de la coleccion
        const setsSnapshot = onSnapshot(setsObject, (querySnapshot) => {
            let data1 = [];
            querySnapshot.forEach((doc) => {
                data1.push({ ...doc.data(), id: doc.id });
                console.log(data1);
            });
            setList(data1); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
        });
        return () => setsSnapshot();
    }, []);

    //create Setlist
    const createSetlist = async () => {
        await addDoc(setlistsCollectionRef, { name: newName, sets: newSet, show: newShow, band: newBand, tag: newTag, createdBy: userID  });
    };

    //sort
    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }
    
    return (
        <div>    
            <h3>Name:</h3>
            <input onChange={(event) => {
                setNewName(event.target.value)
            }}/>
            <h3>Sets:</h3> 
            <input onChange={(event) => {
                setNewSet(event.target.value)
            }}/>
            <h3>Show:</h3>
            <input onChange={(event) => {
                setNewShow(event.target.value)
            }}/>
            <h3>Band:</h3>
            <input onChange={(event) => {
                setNewBand(event.target.value)
            }}/>
            <h3>Tag:</h3>
            <input onChange={(event) => {
                setNewTag(event.target.value)
            }}/>
            
            <br></br>
            <br></br>
            
            <button onClick = {createSetlist}>Create Setlist</button>
            
            <br></br>
            <br></br>
            <hr></hr>

            <br></br>

            <form >
                <label>
                    Order by:
                    <select value={sortings} onChange={handleChange}>
                        <option value="name">name</option>
                    </select>
                </label>
            </form>
            
            <div className="SearchBar">
                <input type="text" name="title" placeholder="Search..." onChange={(event)=>{setSearchParam(event.target.value);}}></input>
            </div>

            <br></br>

            {setlists.filter((val) => {
                if(searchParam === "") {
                    return val
                } else if(val.name.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.set.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.show.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.band.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.tag.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                }}).map((setlist) => {
                    if(userID == setlist.createdBy) {
                        return (
                            <div>
                                <ShowSetlists tsetlist={setlist}/>
                            </div>
                        );
                    }
                })
            }
        </div>
    );
};

export default ManageSetlists;
