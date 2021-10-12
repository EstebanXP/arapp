import React,{useEffect, useState} from 'react';
import { collection, query,onSnapshot,deleteDoc,doc,updateDoc,orderBy} from "firebase/firestore";
import db from '../firebase';
import ShowSongs from './ShowSongs';


const USongs = () => {

    const [lista,setLista]=useState([]);
    const [sortings,setSortings]=useState("title");
    const [currentSong,setCurrentSong]=useState({
        artist:"",
        lyrics:"",
        title:"",
        id:"",
        chords:"",
        tempo:""
    })

    async function deleteSong(songId){
        await deleteDoc(doc(db, "songs", songId));
    }

    function handleChange(e) {
        setSortings(e.target.value);
    }

    function handleSubmit(e) {
        alert('Your favorite flavor is: ' + sortings);
        e.preventDefault();
      }

     function editSong(song){
        setCurrentSong({
            title:song.title,
            lyrics:song.lyrics,
            artist:song.artist,
            id:song.id,
            chords:song.chords,
            tempo:song.tempo,
            tab:song.tab
        })
    }

    async function saveOnSubmit(e){
        e.preventDefault();
        const newtitle=e.target.title.value;
        const newArtist=e.target.artist.value;
        const newLyrics=e.target.lyrics.value;
        const newChords=e.target.chords.value;
        const newTempo=e.target.tempo.value;
        const newTab=e.target.tab.value;
        await updateDoc(doc(db, 'songs', currentSong.id),{
            title:newtitle,
            artist:newArtist,
            lyrics:newLyrics,
            chords:newChords,
            tempo:newTempo,
            tab:newTab
        })
    }

    
    useEffect(()=>{

        const songsObject= query(collection(db,'songs'),orderBy(sortings)); //Guardar referencia de la coleccion
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
                    Artista: <input name="artist" defaultValue={currentSong.artist}></input> <br></br>
                    Cancion: <textarea name="lyrics"defaultValue={currentSong.lyrics}></textarea><br></br>
                    Acordes: <textarea name="chords"defaultValue={currentSong.chords}></textarea><br></br>
                    Tempo: <input name="tempo" defaultValue={currentSong.tempo}></input> <br></br>
                    Tab: <input name="tab" defaultValue={currentSong.tab}></input> <br></br>
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
