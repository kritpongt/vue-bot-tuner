<script setup>
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const menuItems = ref([
    {
        label: 'Home',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77"/></svg>`,
    },
    {
        label: 'Feature',
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618zm.629.86L4.462 9.398q-.289.096-.395.394t.087.548l2.792 3.84l-.119 4.16q-.02.327.23.52q.25.192.559.096L12 17.696l4.385 1.285q.307.096.557-.096q.25-.193.231-.52l-.12-4.184l2.793-3.79q.192-.25.087-.549q-.106-.298-.395-.394l-4.292-1.496l-2.765-3.683q-.173-.25-.481-.25t-.48.25zM12 11.519"/></svg>`
    }
])
</script>

<template>
    <Menubar :model="menuItems">
        <template #start>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m7.288 23.292l7.997-7.997l1.414 1.414l-7.997 7.997z"/><path fill="currentColor" d="M17 30a1 1 0 0 1-.37-.07a1 1 0 0 1-.62-.79l-1-7l2-.28l.75 5.27L21 24.52V17a1 1 0 0 1 .29-.71l4.07-4.07A8.94 8.94 0 0 0 28 5.86V4h-1.86a8.94 8.94 0 0 0-6.36 2.64l-4.07 4.07A1 1 0 0 1 15 11H7.48l-2.61 3.26l5.27.75l-.28 2l-7-1a1 1 0 0 1-.79-.62a1 1 0 0 1 .15-1l4-5A1 1 0 0 1 7 9h7.59l3.77-3.78A10.92 10.92 0 0 1 26.14 2H28a2 2 0 0 1 2 2v1.86a10.92 10.92 0 0 1-3.22 7.78L23 17.41V25a1 1 0 0 1-.38.78l-5 4A1 1 0 0 1 17 30"/></svg>
        </template>
        <template #itemicon="slotProps">
            <span v-if="slotProps.item.svgIcon" v-html="slotProps.item.svgIcon"></span>
        </template>
        <template #end>
            <div class="topbar-menu hidden lg:block">
                <div class="topbar-menu-content">
                    <button type="button" class="">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </template>
    </Menubar>
</template>

<style>
.topbar-menu{
    /* position: absolute;
    transform-origin: top; */
}
.topbar-menu-content{
    display: flex;
    gap: 1rem;
}
</style>