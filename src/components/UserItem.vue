<script setup>
    const props = defineProps({
        type: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    })
</script>
<template>
    <router-link :to="{name:'home',params:{id:user.id}}" class="UserItem">
        <div class="UserItem__figure">
            <template v-if="type==='clients'">
                <img :src="user.avatar" alt="" class="UserItem__avatar">
            </template>
            <template v-else>
                <div class="UserItem__rating">{{user.rating}}</div>
            </template>
        </div>
        <div class="UserItem__name">{{user.fullName}}</div>
        <div class="UserItem__arrow"></div>
    </router-link>
</template>