import { axiosInstance } from '../helper/axios-config';

const getGenres = () => {
    return axiosInstance.get('genre', {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const createGenre = (data) => {
    return axiosInstance.post('genre', data, {
        header: {
            'Content-type': 'application/json'
        }
    });
}

const updateGenre = (genreId, data) => {
    return axiosInstance.put(`genre/${genreId}`, data,  {
        header: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getGenres, createGenre, updateGenre
}