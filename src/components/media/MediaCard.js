import React from 'react'
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {

    const { media } = props;

    return (
        <div className="col">
            <div className="card">
                <img src={media.photo} className="card-img-top" alt="..." /> 
                <div className="card-body">
                    <h5 className="card-title">Caracteristicas</h5>
                    <hr/>
                    <p className="card-text">{`Serial: ${media.serial}`}</p>
                    <p className="card-text">{`Título: ${media.title}`}</p>
                    <p className="card-text">{`Género: ${media.genre.name}`}</p>
                    <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
                    <p className="card-text">{`Director: ${media.director.name}`}</p>
                    <p className="card-text">
                        <Link to = {`medias/edit/${media._id}`}>Ver más</Link> 
                    </p>
                </div>
            </div>
        </div>
    );
};