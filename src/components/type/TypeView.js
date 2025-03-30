import React, { useState, useEffect } from 'react';
import { getTypes, createType, updateType } from '../../services/typeService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TypeView = () => {

    const [ valuesForm, setValuesForm] = useState({});
    const [ types, setTypes ] = useState([]);
    const { name = '', description = '' } = valuesForm;
    const [ typeSelect, setTypeSelect ] = useState(null);

    const listTypes = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const resp = await getTypes();
            setTypes(resp.data);
            Swal.close();

        } catch(error) {
            console.log();
            Swal.close();
            
        }
    }

    useEffect(() => {
        listTypes();
    }, [])

    const handleOnChange = (e) => {
        setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
    }

    const handleCreateType = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            if (typeSelect) {
                await updateType(typeSelect, valuesForm);
                setTypeSelect(null);
            } else {
                await createType(valuesForm);
            }
            setValuesForm({ name: '', description: ''});
            listTypes();

            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
        }
    }

    const handleUpdateType = async (e, type) => {
        e.preventDefault();
        setValuesForm({ name: type.name, description: type.description });
        setTypeSelect(type._id);
    }

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={(e) => handleCreateType(e)}>
                <div className='row'>
                    <div className='col-lg-4'>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre</label>
                            <input required name='name' value={name} type='text' className='form-control'
                                onChange={(e) => handleOnChange(e)} />
                        </div>
                    </div>
                    <div className='col-lg-8'>
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
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Fecha Creación</th>
                    <th scope='col'>Fecha Actualización</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    types.length > 0 && types.map((type, index) => {
                        return <tr>
                            <th scope='row'> {index + 1} </th>
                            <td> {type.name} </td>
                            <td> {type.description} </td>
                            <td> {moment(type.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td> {moment(type.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                            <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateType(e, type)}>Actualizar</button> </td>
                        </tr>
                    })
                }
            </tbody>
            </table>

        </div>
    )
}