import React,{useEffect, useState} from 'react';
import { collection, getDocs,query,onSnapshot} from "firebase/firestore";
import db from '../firebase';

const USongs = () => {

    const [lista,setLista]=useState([]);

    
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
        <div className="container">
            {lista.map((link)=>(
                <div>
                    <div>
                        <h4>{link.id}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default USongs
