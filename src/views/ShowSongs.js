import React, { Fragment, useState } from "react";
import PopupSongs from "./PopupSongs";

const ShowSongs = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    artist: "",
    lyrics: "",
    title: "",
    id: "",
    chords: "",
    tempo: "",
  });
  function editSong(song) {
    setCurrentSong({
      title: song.title,
      lyrics: song.lyrics,
      artist: song.artist,
      id: song.id,
      chords: song.chords,
      tempo: song.tempo,
      tab: song.tab,
    });
  }
  return (
    <div className="container">
      <div className="card-body">
        <p>El titulo es: {props.title}</p>
        <p>Escrito por: {props.artist}</p>
        <p>{props.lyrics}</p>
        <p>Acordes: {props.chords}</p>
        {/*AQUI SE MUESTRA CADA CANCION INDIVIDUALMENTE, JUNTO CON SU RESPECTIVO POPUP */}
        <PopupSongs
          trigger={popStatus}
          setPopStatus={setPopStatus}
          song={props.song}
        ></PopupSongs>
        <button onClick={()=>console.log(props.song.id)}>Hola</button>
        <button onClick={() => setPopStatus(true)}>Editar</button>
      </div>
    </div>
  );
};

export default ShowSongs;
