export default {
    setLocalStorage(key, data) {
        try {
            localStorage.setItem(key, data);
        } catch (e) {
            console.log(e);
        }
    },
    getLocalStorage(key) {
        return localStorage.getItem(key);
    }
}
