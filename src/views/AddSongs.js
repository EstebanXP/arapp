import React,{useEffect} from 'react'
//import {projectFirestore as db} from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';


const AddSongs = () => {
    async function getObjeto(){
        const songsObject= collection(db,'songs'); //Guardar referencia de la coleccion
        const songsSnapshot= await getDocs(songsObject);//obtener los datos de la coleccion
        const lista=songsSnapshot.docs.map(doc=>doc.data());//Extrar los datos de la coleccion
        lista.forEach((docu)=>{
            console.log(docu)
        })
    }
    useEffect(()=>{
        var arre=getObjeto();
        console.log(arre);
        
        
        

    },[])
    return (
        <div>
            <h1>Hola mundo desde add Songs</h1>
        </div>
    )
}

export default AddSongs
