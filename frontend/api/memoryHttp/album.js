import { auth as http } from '../http';


// OPEN INIT
export function init(deadId, userId) {
    return http.get(`/guest/image/${deadId}/${userId}`);
}

// MY INIT
export function init(deadId) {
    return http.get(`/user/image?uid=${deadId}`);
}
// DELETE
export function Delete(userId, IdCheck) {
    return http.delete(`/guest/image/${userId}/${IdCheck}`);
}

// EDIT
export function EditGo(EditData) {
    return http.put(`/guest/image/`, EditData);

}

// REPORT
export function Report(data) {
    return http.post(`/guest/image/report`, data);
}

// LIKE
export function Like(data) {
    return http.post(`/guest/image/like`, data);

}

// SEND IMAGE
export function sendImage(data) {
    return http.post(`/guest/image/like`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

}