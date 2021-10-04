import React,{useEffect,useState} from 'react'
//import {projectFirestore as db} from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';


const AddSongs = () => {
    const [datos, setDatos] = useState({
        artista:"",
        cancion:""
      });
      const [lyrics, setLyrics] = useState("");
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
            setLyrics(JSON.stringify(myJson));
        }else{
            setStatus(false);
        }

      }
      
     function fetchAPI() {
        // param is a highlighted word from the user before it clicked the button
        return fetch(`https://api.lyrics.ovh/v1/${datos.artista}/${datos.cancion}`)
      }
    

    /*async function getObjeto(){
        const songsObject= collection(db,'songs'); //Guardar referencia de la coleccion
        const songsSnapshot= await getDocs(songsObject);//obtener los datos de la coleccion
        const lista=songsSnapshot.docs.map(doc=>doc.data());//Extrar los datos de la coleccion
        lista.forEach((docu)=>{
            console.log(docu)
        })
    }*/
    useEffect(()=>{
        /*var arre=getObjeto();
        console.log(arre);*/
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
                    <textarea defaultValue={lyrics}></textarea>
                    <h2>Do you want to save?</h2>  
                    <button>Yes</button>
                    <button>No</button>
                </div>
                :
                <div>
                    <h1 className="songNoutFound">Song not found, you can writte it down</h1>
                    <input type="text"></input> 
                    <h2>Do you want to save?</h2>  
                    <button>Yes</button>
                    <button>No</button>
                </div>
            }
            
            
        </div>
    )
}

export default AddSongs
