import { auth as http } from '../http';


// INIT
export function init(deadId, userId) {
    return http.get(`/guest/comment/${deadId}/${userId}`);
}

// DELETE
export function Delete(Value) {
    return http.delete(`/guest/comment/${Value.userId}/${Value.guestCommentId}`);
}

// EDIT
export function EditGo(EditData) {
    return http.put(`/guest/comment/`, EditData);

}

// REPORT
export function Report(data) {
    return http.post(`/guest/comment/report`, data);
}

// LIKE
export function Like(data) {
    return http.post(`/guest/comment/like`, data);

}

// SEND COMMENT
export function sendComment(data) {
    return http.post(`/guest/comment/like`, data);

}