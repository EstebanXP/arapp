import React,{useEffect,useState} from 'react'
//import {projectFirestore as db} from '../firebase';
import { collection, addDoc,doc,deleteDoc } from "firebase/firestore";
import db from '../firebase';


const AddSongs = () => {
    const [datos, setDatos] = useState({
        artista:"",
        cancion:""
      });
      const [localLyrics, setlocalLyrics] = useState("");
      const [status,setStatus]=useState(false);

       
      function getData(e) {
        e.preventDefault();
        setDatos({
          ...datos,
          [e.target.name]:e.target.value
        })
      }

      async function buscarCancion() {
        const response = await fetchAPI();
        console.log(response);
        if(response.status===200){
            setStatus(true);
            const myJson = await response.json(); //extract JSON from the http response
            setlocalLyrics(JSON.stringify(myJson));
        }else{
            setStatus(false);
        }

      }

      async function addSongToDB(){
         await addDoc(collection(db, "songs"), {
            artist: datos.artista,
            chords: "Null",
            title: datos.cancion,
            lyrics: localLyrics
          })
          .then(()=>{
              console.log("Success")
          })
          .catch((error)=>{
              console.log("Error: "+error)
          })
      }
      
      
     function fetchAPI() {
        // param is a highlighted word from the user before it clicked the button
        return fetch(`https://api.lyrics.ovh/v1/${datos.artista}/${datos.cancion}`)
      }
    

    
    useEffect(()=>{
        
    },[])
    return (
        <div className="container">
            <h1>Hola mundo desde add Songs</h1>
            <form className="Formulario">
                <br />
                Artista:
                <input type="text" className="nombreArtista" name="artista" onChange={getData} required></input>
                {datos.artista}
                <br />
                Nombre de la cancion:
                <input type="text" className="nombreCancion" name="cancion" onChange={getData} required></input>
                {datos.cancion}
            </form>
            <button onClick={buscarCancion} >Prueba</button>
            <br/>
            {status===true?
                <div className="foundSong">
                    <h1>Song found</h1>
                    <textarea defaultValue={localLyrics}></textarea>
                    <h2>Do you want to save?</h2>  
                    <button onClick={addSongToDB}>Yes</button>
                    <button>No</button>

                </div>
                :
                <div>
                    <h1 className="songNoutFound">Song not found, you can writte it down</h1>
                    <input type="text"></input> 
                    <h2>Do you want to save?</h2>  
                    <button onClick={addSongToDB}>Yes</button>
                    <button>No</button>
                </div>
            }
            
        </div>
    )
}

export default AddSongs
