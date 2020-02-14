import axios from 'axios';
import {messageError} from '../components/Toast'

export function POST(url, body, header) {
    return axios.post(url, body, header)
        .then((res) => {
            return res
        })
        .catch((err) => {
            if (err.response.status === 401) {
                
            }else if (err.response.status === 400) {
                messageError(err.response.data.error)
            }
            return err
        })
}

export function GET(url, header) {
    return axios.get(url, header)
        .then((res) => {
            return res
        })
        .catch((err) => {
            if (err.response.status === 401) {
            }
            return err
        })
}