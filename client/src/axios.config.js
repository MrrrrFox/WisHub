import axios from 'axios';

// TODO: add headers for auth
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers['Content-Type'] = 'application/json';

export default axios;
