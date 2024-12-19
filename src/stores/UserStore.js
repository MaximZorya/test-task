import {ref, readonly, computed} from 'vue'
import {defineStore} from 'pinia'
import {api} from '@/api'

export const useUserStore = defineStore('UserStore', () => {
    const users = ref([])
    const user = ref({})

    const list = computed(() => {
        let result = []
        if (users.value.length) {
            users.value.forEach(user => {
                result.push({
                    ...user,
                    fullName: `${user.first_name} ${user.last_name}`,
                    rating: 0
                })
            })
            result.sort((a, b) => a.last_name.localeCompare(b.last_name))
        }
        return result
    })
    const userData = computed(() => {
        const data = {
            ...user.value,
            fullName: `${user.value.first_name} ${user.value.last_name}`,
            rating: 0
        }

        return data
    })

    function updateUserData(payload) {
        console.log('updateUserData', payload)
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
        user.value = {}
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
