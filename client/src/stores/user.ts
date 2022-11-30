import { defineStore } from 'pinia'

interface User {
    id: string
    name: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        activeUser: null as null | User,
    }),
    getters: {
        getActiveUser(state) {
            return state.activeUser
        },
    },
    actions: {
        setActiveUser(user: User) {
            this.activeUser = user
        },
    },
    persist: true,
})
