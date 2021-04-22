import axios from 'axios';

// TODO: add headers for auth
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers['Content-Type'] = 'application/json';

export default axios;
