import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3001/'
    baseURL: 'https://ing-pag-peliculas.onrender.com'

});

export {
    axiosInstance
}