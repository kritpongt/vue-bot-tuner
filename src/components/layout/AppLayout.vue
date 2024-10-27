<script setup>
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
</script>

<template>
    <div class="flex flex-col justifiy-between">
        <AppTopbar></AppTopbar>
        <div class="flex-auto">
            <!-- <RouterLink></RouterLink> -->
        </div>
        <AppFooter></AppFooter>
    </div>
</template>