import axios from "axios"

const api = axios.create({
    baseURL: 'http://192.168.0.16:8080/api',
    timeout: 5000
})

export default api