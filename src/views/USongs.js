import React,{useEffect, useState} from 'react';
import { collection, query,onSnapshot,deleteDoc,doc} from "firebase/firestore";
import db from '../firebase';
import ShowSongs from './ShowSongs';

const USongs = () => {

    const [lista,setLista]=useState([]);

    async function deleteSong(songId){
        await deleteDoc(doc(db, "songs", songId));
    }
    
    useEffect(()=>{

        const songsObject= query(collection(db,'songs')); //Guardar referencia de la coleccion
        const songsSnapshot=onSnapshot(songsObject,(querySnapshot)=>{
            let data=[];
            querySnapshot.forEach((doc)=>{
                data.push({...doc.data(),id:doc.id});
            })
            setLista(data);//Se guardan todos los datos en el arreglo lista para poder usarlos aqui
        });
        return ()=> songsSnapshot(); 
    },[])

    return (
        <div className="col-md-8">
            {lista.map((link)=>(
                <div className="card mb-1">
                    {/*<ShowSongs title={link.title} artist={link.artist} lyrics={link.lyrics}/>*/}
                    <ShowSongs title={link.title} artist={link.artist} lyrics={link.lyrics}/>
                    <button className="editar" >Editar</button>
                    <button className="borrar" onClick={()=>deleteSong(link.id)}>Borrar</button>
                
                </div>
            ))}
        </div>
    )
}

export default USongs
