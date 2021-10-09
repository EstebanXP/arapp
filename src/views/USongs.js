import React,{useEffect, useState} from 'react';
import { collection, query,onSnapshot,deleteDoc,doc,updateDoc} from "firebase/firestore";
import db from '../firebase';
import ShowSongs from './ShowSongs';


const USongs = () => {

    const [lista,setLista]=useState([]);
    const [currentSong,setCurrentSong]=useState({
        artist:"",
        lyrics:"",
        title:"",
        id:""
    })

    async function deleteSong(songId){
        await deleteDoc(doc(db, "songs", songId));
    }

     function editSong(song){
        setCurrentSong({
            title:song.title,
            lyrics:song.lyrics,
            artist:song.artist,
            id:song.id,
        })
    }

    async function saveOnSubmit(e){
        e.preventDefault();
        const newtitle=e.target.title.value;
        const newArtist=e.target.artist.value;
        const newLyrics=e.target.lyrics.value;
        await updateDoc(doc(db, 'songs', currentSong.id),{
            title:newtitle,
            artist:newArtist,
            lyrics:newLyrics,
        })
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
            <form onSubmit={saveOnSubmit}>
                <div>
                    Titulo: <input name="title" defaultValue={currentSong.title} ></input> <br></br>
                    Artista: <input name="artist" defaultValue={currentSong.artist}  ></input> <br></br>
                    Cancion: <textarea name="lyrics"defaultValue={currentSong.lyrics}  ></textarea><br></br>
                    Guardar: <button type="submit">Guardar </button>
                </div>
            </form>
            {lista.map((link)=>(
                <div className="card mb-1">
                    <ShowSongs title={link.title} artist={link.artist} lyrics={link.lyrics}/>
                    <button className="editar" onClick={()=>editSong(link)}>Editar</button>
                    <button className="borrar" onClick={()=>deleteSong(link.id)}>Borrar</button>
                </div>
            ))}
        </div>
    )
}

export default USongs
