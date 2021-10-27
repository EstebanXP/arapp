import React, { Fragment } from 'react'

const ShowSongs = (props) => {

    
    return (
        <div className="container"> 
            <div className="card-body">
                    <p>El titulo es: {props.title}</p>
                    <p>Escrito por: {props.artist}</p>
                    <p>{props.lyrics}</p>
            </div>
        </div>
    )
}

export default ShowSongs
