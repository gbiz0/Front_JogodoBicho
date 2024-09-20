import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base da sua API
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
  },
});

export default api;
