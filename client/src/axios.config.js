import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
// TODO: add headers for auth
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers['Content-Type'] = 'application/json';

export default applyCaseMiddleware(axios.create());
