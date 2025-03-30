import { axiosInstance } from '../helper/axios-config';

const getProducers = () => {
    return axiosInstance.get('producer', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createProducer = (data) => {
    return axiosInstance.post('producer', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateProducer = (producerId, data) => {
    return axiosInstance.put(`producer/${producerId}`, data,  {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getProducers, createProducer, updateProducer
}