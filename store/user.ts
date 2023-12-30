import {defineStore} from "pinia";


export const UserStore = defineStore("user", {
    state: () => ({
        nickname: '',
        role: 0,
        userId: '',
        email: ''
    }),
    actions: {
        setUser(userInfo: {
            nickname: string
            role: number
            userId: string
            email: string
        }) {
            this.nickname = userInfo.nickname
            this.role = userInfo.role
            this.userId = userInfo.userId
            this.email = userInfo.email
        }
    }
})