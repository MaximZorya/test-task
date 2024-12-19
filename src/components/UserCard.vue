<script setup>
    import UserRating from '@/components/UserRating.vue'
    import {ref, computed, watch} from 'vue'
    import {useRoute} from 'vue-router'
    import {useUserStore} from '@/stores/UserStore'

    const UserStore = useUserStore()


    const route = useRoute()
    const id = computed(() => route.params.id)
    watch(id, (to, from) => {
        if (to && to !== from) {
            getUser()
        }
    }, {immediate: true})

    async function getUser() {
        const payload = {
            id: id.value
        }
        await UserStore.getUser(payload)
        rating.value = user.value.rating
        comment.value = user.value.comment
    }

    function submit() {
        const payload = {
            rating: rating.value,
            id: Number(id.value),
            comment: comment.value,
        }
        UserStore.updateUserData(payload)
    }

    const rating = ref(0)
    const comment = ref('')

    const user = computed(() => UserStore.user)
    const isLoaded = computed(() => {
        const keys = Object.keys(user.value)
        return Boolean(keys.length && id.value)
    })
</script>
<template>
    <div class="UserCard">
        <template v-if="isLoaded">
            <form @submit.prevent="submit" class="UserCard__form">
                <div class="UserCard__container">
                    <img :src="user.avatar" alt="" class="UserCard__avatar">
                    <div class="UserCard__data">
                        <div class="UserCard__name">{{user.fullName}}</div>
                        <a :href="`mailto:${user.email}`" class="UserCard__email">{{user.email}}</a>
                        <UserRating v-model:rating="rating"/>
                        <textarea v-model="comment" class="UserCard__comment"></textarea>
                    </div>
                </div>

                <button class="UserCard__submit">Save</button>
            </form>
        </template>
        <template v-else>
            <div class="UserCard__empty">
                Select a client
            </div>
        </template>
    </div>
</template>