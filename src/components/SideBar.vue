<script setup>
    import {ref, computed, watch} from 'vue'
    import SidebarSwitch from '@/components/SidebarSwitch.vue'
    import UserItem from '@/components/UserItem.vue'
    import {useUserStore} from '@/stores/UserStore'

    const UserStore = useUserStore()
    getUsers()

    async function getUsers() {
        await UserStore.getUsers()
    }

    const search = ref('')
    const type = ref('clients')
    const show = ref(true)

    const users = computed(() => {
        let users = [...UserStore.users]
        if (search.value) {
            users = users.filter(user => {
                const name = user.fullName.toLowerCase()
                return name.includes(search.value)
            })
        }
        return users
    })

    function toggle() {
        show.value = !show.value
    }

    watch(type, (to) => {
        if (to === 'rating') {
            search.value = ''
        }
    })
</script>
<template>
    <aside class="sidebar" :class="[{'sidebar--hide':!show}]">
        <div @click="toggle" class="sidebarButton">
            <div class="sidebarButton__arrow" :class="[{'sidebarButton__arrow--hide':!show}]"></div>
        </div>
        <div class="sidebar__container">
            <SidebarSwitch v-model:type="type"/>
            <template v-if="type==='clients'">
                <div class="inputSearch">
                    <input type="text" placeholder="Enter username to search" v-model="search"
                           class="inputSearch__field">

                    <svg class="inputSearch__icon" viewBox="0 0 32 32">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                           sketch:type="MSPage">
                            <g transform="translate(-256.000000, -1139.000000)" fill="#000000">
                                <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                                      id="search" sketch:type="MSShapeGroup">

                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            </template>

        </div>
        <template v-if="users.length">
            <div class="UserList">
                <template :key="user.id" v-for="user in users">
                    <UserItem :type="type" :user="user"/>
                </template>
            </div>
        </template>
    </aside>
</template>

