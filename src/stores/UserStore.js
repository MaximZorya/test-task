import {ref, readonly, computed} from 'vue'
import {defineStore} from 'pinia'
import {api} from '@/api'

const name = 'userSaved'

export const useUserStore = defineStore('UserStore', () => {
    const userSaved = ref([])
    getSavedUser()
    const users = ref([])
    const user = ref(null)

    const list = computed(() => {
        let result = []
        if (users.value.length) {
            users.value.forEach(user => {
                const saved = userSaved.value.find(el => user.id === el.id)
                const rating = saved ? saved.rating : 0

                result.push({
                    ...user,
                    fullName: `${user.first_name} ${user.last_name}`,
                    rating,

                })
            })
            result.sort((a, b) => a.last_name.localeCompare(b.last_name))
        }
        return result
    })
    const userData = computed(() => {
        if (!user.value) return
        const saved = userSaved.value.find(el => user.value.id === el.id)
        const rating = saved ? saved.rating : 0
        const comment = saved ? saved.comment : ''
        const data = {
            ...user.value,
            fullName: `${user.value.first_name} ${user.value.last_name}`,
            rating,
            comment
        }

        return data
    })

    function updateUserData(payload) {
        if (userSaved.value.length) {
            const index = userSaved.value.findIndex(el => el.id === payload.id)
            if (index > -1) {
                userSaved.value[index] = payload
            } else {
                userSaved.value.push(payload)
            }
        } else {
            userSaved.value.push(payload)
        }
        saveUserData()
        getSavedUser()
    }

    function saveUserData() {
        localStorage.setItem(name, JSON.stringify(userSaved.value))
    }

    function getSavedUser() {
        const saved = localStorage.getItem(name)
        if (saved) {
            userSaved.value = JSON.parse(saved)
        }
    }

    async function getUsers() {
        try {
            const rs = await api.users()
            const data = await rs.json()
            if (rs.ok) {
                users.value = data.data
            } else {
                new Error()
            }
            return data
        } catch (e) {
            console.error(e)
        }
    }

    async function getUser(payload) {
        try {
            const rs = await api.user(payload)
            const data = await rs.json()
            if (rs.ok) {
                user.value = data.data
            } else {
                new Error()
            }
            return data
        } catch (e) {
            console.error(e)
        }
    }

    return {
        users: readonly(list),
        user: readonly(userData),
        getUsers,
        getUser,
        updateUserData
    }
})
