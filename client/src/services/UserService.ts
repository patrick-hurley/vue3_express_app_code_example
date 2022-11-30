import Api from './Api'

interface User {
    name: string
}

export default {
    createUser(payload: User) {
        return Api().post('users', payload)
    },
    getAllUsers() {
        return Api().get('users')
    },
}
