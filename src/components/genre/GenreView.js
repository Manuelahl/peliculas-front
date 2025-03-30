import React, { useEffect, useState } from 'react';
import { getGenres, createGenre, updateGenre } from '../../services/genreService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GenreView = () => {

    const [ valuesForm, setValuesForm] = useState({});
    const [ genres, setGenres ] = useState([]);
    const { name = '', state = '', description = '' } = valuesForm;
    const [ genreSelect, setGenreSelect ] = useState(null);

    const listGenres = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const resp = await getGenres();
            setGenres(resp.data);
            Swal.close();

        } catch(error) {
            console.log();
            Swal.close();
            
        }
    }

    useEffect(() => {
        listGenres();
    }, [])

    const handleOnChange = (e) => {
        setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
    }

    const handleCreateGenre = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            if (genreSelect) {
                await updateGenre(genreSelect, valuesForm);
                setGenreSelect(null);
            } else {
                await createGenre(valuesForm);
            }
            setValuesForm({ name: '', state: '', description: ''});
            listGenres();

            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
        }
    }

    const handleUpdateGenre = async (e, genre) => {
        e.preventDefault();
        setValuesForm({ name: genre.name, state: genre.state, description: genre.description });
        setGenreSelect(genre._id);
    }

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={(e) => handleCreateGenre(e)}>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input required name='name' value={name} type='text' className='form-control'
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='mb-3'>
                            <label className='form-label'>Estado</label>
                            <select required name='state' value={state} className='form-select' onChange={(e) => handleOnChange(e)} >
                                <option selected>--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                        <div className='mb-3'>
                            <label className='form-label'>Descripción</label>
                            <input required name='description' value={description} type='text' className='form-control'
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary mb-3'>Guardar</button>
            </form>

            <table className='table'>
            <thead>
                <tr>
                    <th scope='row'>#</th>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Fecha Creación</th>
                    <th scope='col'>Fecha Actualización</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    genres.length > 0 && genres.map((genre, index) => {
                        return <tr>
                            <th scope='row'> {index + 1} </th>
                            <td> {genre.name} </td>
                            <td> {genre.state} </td>
                            <td> {genre.description} </td>
                            <td> {moment(genre.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td> {moment(genre.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateGenre(e, genre)}>Actualizar</button> </td>
                        </tr>
                    })
                }
            </tbody>
            </table>

        </div>
    )
}