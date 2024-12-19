<script setup>
    const props = defineProps({
        rating: {
            type: Number,
            required: true
        }
    })
    const emit = defineEmits(['update:rating'])

    function toggle(type) {
        let value = props.rating
        if (type === '+') {
            value++
        } else {
            value--
        }
        emit('update:rating', value)
    }
</script>
<template>
    <div class="UserRating">
        <div @click="toggle('-')" class="UserRating__btn UserRating__btn--minus"></div>
        <div class="UserRating__value">{{rating}}</div>
        <div @click="toggle('+')" class="UserRating__btn"></div>
    </div>
</template>