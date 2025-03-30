import { axiosInstance } from '../helper/axios-config';

const getTypes = () => {
    return axiosInstance.get('type', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createType = (data) => {
    return axiosInstance.post('type', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateType = (typeId, data) => {
    return axiosInstance.put(`type/${typeId}`, data,  {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getTypes, createType, updateType
}