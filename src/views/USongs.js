import React,{useEffect, useState} from 'react';
import { collection, getDocs,query,onSnapshot} from "firebase/firestore";
import db from '../firebase';

const USongs = () => {

    const [lista,setLista]=useState([]);
    const [lista2,setLista2]=useState([]);

    async function getSongs(){
        let data=[];
        const songsObject= query(collection(db,'songs')); //Guardar referencia de la coleccion
        const songsSnapshot= await getDocs(songsObject);//obtener los datos de la coleccion
        const lista=songsSnapshot.docs.map((doc)=>{
            data.push({...doc.data(),id:doc.id});
            setLista2(data);
        });//Extrar los datos de la coleccion
        return lista();
        
    }
    
    
    useEffect(()=>{
        
        const songsObject= query(collection(db,'songs')); //Guardar referencia de la coleccion
        const songsSnapshot=onSnapshot(songsObject,(querySnapshot)=>{
            let data=[];
            querySnapshot.forEach((doc)=>{
                data.push({...doc.data(),id:doc.id});
            })
            setLista(data);
        });
        return ()=> songsSnapshot(); 
    },[])

    return (
        <div className="container">
            {lista.map((link)=>(
                <div>
                    <div>
                        <h4>{link.lyrics}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default USongs
