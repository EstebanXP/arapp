import React,{useEffect,useState} from 'react'
import { collection, addDoc,doc,deleteDoc,query,onSnapshot } from "firebase/firestore";
import db from '../firebase';
import ShowSongs from './ShowSongs';


const AddSongs = () => {
    const [datos, setDatos] = useState({
        artista:"",
        cancion:""
      });
      const [localLyrics, setlocalLyrics] = useState("");
      const [status,setStatus]=useState(false);
      const [editStatus,setEditStatus]=useState(false);
      const [lista,setLista]=useState([]);

       
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

      async function deleteSong(songId){
        await deleteDoc(doc(db, "songs", songId));
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
      
      function editMode(){  
          setEditStatus(!editStatus);
          
      }

     function fetchAPI() {
        // param is a highlighted word from the user before it clicked the button
        return fetch(`https://api.lyrics.ovh/v1/${datos.artista}/${datos.cancion}`)
      }
    

    
    useEffect(()=>{
        const songsObject= query(collection(db,'songs')); //Guardar referencia de la coleccion
        const songsSnapshot=onSnapshot(songsObject,(querySnapshot)=>{
            let data=[];
            querySnapshot.forEach((doc)=>{
                data.push({...doc.data(),id:doc.id});
                console.log(doc.data());
            })
            setLista(data);//Se guardan todos los datos en el arreglo lista para poder usarlos aqui
        });
        return ()=> songsSnapshot(); 
    },[])
    //Rendereo
    return (
        <div className="container">
            <div className="searchDiv">
                <h1>Hola mundo desde add Songs</h1>
                <form className="Formulario">
                    <br />
                    Artista:
                    <input type="text" className="nombreArtista" name="artista" onChange={getData} required ></input>
                    {datos.artista}
                    <br />
                    Nombre de la cancion:
                    <input type="text" className="nombreCancion" name="cancion" onChange={getData} required ></input>
                    {datos.cancion}
                </form>
            
                {
                    editStatus===false?
                    <button onClick={buscarCancion} >Buscar</button>
                    :
                    <p></p>
                }
                
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
                        <h1 className="songNotFound">Song not found, you can write it down</h1>
                        <input type="text"></input> 
                        <h2>Do you want to save?</h2>  
                        <button onClick={addSongToDB}>Yes</button>
                        <button>No</button>
                    </div>
                }
            </div>
            {lista.map((link)=>(
                <div className="card mb-1" >
                    {/*<ShowSongs title={link.title} artist={link.artist} lyrics={link.lyrics}/>*/}
                    <ShowSongs key={link.id} title={link.title} artist={link.artist} lyrics={link.lyrics}/>
                    <button className="editar" onClick={()=>editMode()} >Editar</button>
                    <button className="borrar" onClick={()=>deleteSong(link.id)}>Borrar</button>
                </div>
            ))}
        </div>
    )
}

export default AddSongs
