import React, { useState, useEffect } from 'react';
import { getDirectors } from '../../services/directorService';
import { getProducers } from '../../services/producerService';
import { getGenres } from '../../services/genreService';
import { getTypes } from '../../services/typeService';
import { createMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';


export const MediaNew = ({ handleOpenModal, listMedias }) => {

    const [ directors, setDirectors ] = useState([]);
    const [ producers, setProducers ] = useState([]);
    const [ genres, setGenres ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState([]);
    const { serial = '', title = '', sinopsis = '', url = '', photo = '', releaseYear = '', genre, director, producer, type} = valoresForm

    const listDirectors = async () => {
        try {
            const { data } = await getDirectors();
            setDirectors(data);

        } catch(error) {
            console.log(error);

        } 
    }

    useEffect(() => {
        listDirectors();
    }, []);


    const listProducers = async () => {
        try {
            const { data } = await getProducers();
            setProducers(data);

        } catch(error) {
            console.log(error);

        } 
    }

    useEffect(() => {
        listProducers();
    }, []);


    const listGenres = async () => {
        try {
            const { data } = await getGenres();
            setGenres(data);

        } catch(error) {
            console.log(error);

        } 
    }

    useEffect(() => {
        listGenres();
    }, []);


    const listTypes = async () => {
        try {
            const { data } = await getTypes();
            setTypes(data);

        } catch(error) {
            console.log(error);

        } 
    }

    useEffect(() => {
        listTypes();
    }, []);


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial, title, sinopsis, url, photo, releaseYear,
            genre: {
                _id: genre
            },
            director: {
                _id: director
            },
            producer: {
                _id: producer
            },
            type: {
                _id: type
            }
        }
        console.log(media);

        try {
            
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await createMedia(media);
            handleOpenModal();
            listMedias();
            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
        }
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo Media</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' 
                                    value={serial}
                                    onChange={e => handleOnChange(e)}
                                    required
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input type="text" name='title' 
                                    value={title}
                                    onChange={e => handleOnChange(e)}
                                    required
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Sinopsis</label>
                                <input type="text" name='sinopsis' 
                                    value={sinopsis}
                                    onChange={e => handleOnChange(e)}
                                    required
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">URL</label>
                                <input type="text" name='url' 
                                    value={url}
                                    onChange={e => handleOnChange(e)}
                                    required
                                    className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Imagen</label>
                                <input type="url" name='photo' 
                                    value={photo}
                                    onChange={e => handleOnChange(e)}
                                    required
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Año de estreno</label>
                                <input type="date" name='releaseYear' 
                                    value={releaseYear}
                                    onChange={e => handleOnChange(e)}
                                    required
                                    className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Género</label>
                                <select className='form-select'
                                    required
                                    name='genre'
                                    value={genre}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        genres.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>{name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Director</label>
                                <select className='form-select'
                                    required
                                    name='director'
                                    value={director}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        directors.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>{name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Productora</label>
                                <select className='form-select'
                                    required
                                    name='producer'
                                    value={producer}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        producers.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>{name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo</label>
                                <select className='form-select'
                                    required
                                    name='type'
                                    value={type}
                                    onChange={e => handleOnChange(e)}>
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        types.map(({ _id, name }) => {
                                            return <option key={_id} value={_id}>{name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <button className='btn btn-primary'>Guardar</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
