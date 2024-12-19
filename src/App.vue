<script setup>
    import {ref, computed, watch, provide} from 'vue'
    import SideBar from '@/components/SideBar.vue'
    import {useWindowSize} from '@vueuse/core'

    const {width} = useWindowSize()
    const isMobile = computed(() => width.value < 768)
    provide("isMobile", {
        isMobile,
    });
</script>

<template>
    <SideBar/>
    <RouterView/>
</template>
