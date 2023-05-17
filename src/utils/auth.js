import { getLocalStorage } from './pageInteractive'

let tokeKey="token"
const getToken = getLocalStorage(tokeKey)

export {
    getToken
}