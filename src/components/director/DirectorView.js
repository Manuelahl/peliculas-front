import React, { useEffect, useState } from 'react';
import { getDirectors, createDirector, updateDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {

    const [ valuesForm, setValuesForm] = useState({});
    const [ directors, setDirectors ] = useState([]);
    const { name = '', state = '' } = valuesForm;
    const [ directorSelect, setDirectorSelect ] = useState(null);

    const listDirectors = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const resp = await getDirectors();
            setDirectors(resp.data);
            Swal.close();

        } catch(error) {
            console.log();
            Swal.close();
            
        }
    }

    useEffect(() => {
        listDirectors();
    }, [])

    const handleOnChange = (e) => {
        setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
    }

    const handleCreateDirector = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            if (directorSelect) {
                await updateDirector(directorSelect, valuesForm);
                setDirectorSelect(null);
            } else {
                await createDirector(valuesForm);
            }
            setValuesForm({ name: '', state: ''});
            listDirectors();

            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
        }
    }

    const handleUpdateDirector = async (e, director) => {
        e.preventDefault();
        setValuesForm({ name: director.name, state: director.state });
        setDirectorSelect(director._id);
    }

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={(e) => handleCreateDirector(e)}>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input required name='name' value={name} type='text' className='form-control'
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='mb-3'>
                            <label className='form-label'>Estado</label>
                            <select required name='state' value={state} className='form-select' onChange={(e) => handleOnChange(e)} >
                                <option selected>--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
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
                    <th scope='col'>Fecha Creación</th>
                    <th scope='col'>Fecha Actualización</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    directors.length > 0 && directors.map((director, index) => {
                        return <tr>
                            <th scope='row'> {index + 1} </th>
                            <td> {director.name} </td>
                            <td> {director.state} </td>
                            <td> {moment(director.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td> {moment(director.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateDirector(e, director)}>Actualizar</button> </td>
                        </tr>
                    })
                }
            </tbody>
            </table>

        </div>
    )
}