import { auth as http } from '../http';

// FRAME.js
// INIT
export function init(deadId, userId) {
    return http.get(`/dead/${deadId}/${userId}`);
}

// FRAME.js
// CONDOLENCE 
export function condolence(data) {
    return http.post(`/condolence`, data);
}
