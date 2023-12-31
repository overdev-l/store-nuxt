export const isLogin =() => {
    if (process.server) return false
    return localStorage.getItem("token")
}

export const parseJwt = () => {
    let token = localStorage.getItem("token")
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}