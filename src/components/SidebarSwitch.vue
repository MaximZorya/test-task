<script setup>
    const props = defineProps({
        type: {
            type: String,
            required: true
        }
    })
    const emit = defineEmits(['update:type'])

    function toggle(value) {
        emit('update:type', value)
    }
</script>
<template>
    <div class="SidebarSwitch">
        <div @click="toggle('clients')" class="SidebarSwitch__btn"
             :class="[{'SidebarSwitch__btn--active':type==='clients'}]">Clients
        </div>
        <div @click="toggle('rating')" class="SidebarSwitch__btn"
             :class="[{'SidebarSwitch__btn--active':type==='rating'}]">Rating
        </div>
    </div>
</template>