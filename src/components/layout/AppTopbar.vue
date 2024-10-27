<script setup>
// import Menubar from 'primevue/menubar'
import { ref } from 'vue'
// const showTopbarMenu = ref(false)
</script>

<template>
    <div class="topbar">
        <div class="topbar-logo-container">
            <span class="topbar-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m7.288 23.292l7.997-7.997l1.414 1.414l-7.997 7.997z"/><path fill="currentColor" d="M17 30a1 1 0 0 1-.37-.07a1 1 0 0 1-.62-.79l-1-7l2-.28l.75 5.27L21 24.52V17a1 1 0 0 1 .29-.71l4.07-4.07A8.94 8.94 0 0 0 28 5.86V4h-1.86a8.94 8.94 0 0 0-6.36 2.64l-4.07 4.07A1 1 0 0 1 15 11H7.48l-2.61 3.26l5.27.75l-.28 2l-7-1a1 1 0 0 1-.79-.62a1 1 0 0 1 .15-1l4-5A1 1 0 0 1 7 9h7.59l3.77-3.78A10.92 10.92 0 0 1 26.14 2H28a2 2 0 0 1 2 2v1.86a10.92 10.92 0 0 1-3.22 7.78L23 17.41V25a1 1 0 0 1-.38.78l-5 4A1 1 0 0 1 17 30"/></svg>
            </span>
            <button type="button" class="topbar-nav-button topbar-action-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/></svg>
            </button>
        </div>
        <div class="topbar-actions">
            <div class="topbar-config-menu">
                <!-- dark mode -->
            </div>
            <div class="topbar-menu hidden lg:block">
                <div class="topbar-menu-content">
                    <button type="button">
                        <span>Calendar</span>
                    </button>
                    <button type="button">
                        <span>Messages</span>
                    </button>
                    <button type="button">
                        <span>Profile</span>
                    </button>
                </div>
            </div>
            <button type="button" class="topbar-menu-button topbar-action-button"
                v-styleclass="{ selector: '.topbar-menu', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M112 60a16 16 0 1 1 16 16a16 16 0 0 1-16-16m16 52a16 16 0 1 0 16 16a16 16 0 0 0-16-16m0 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16"/></svg>
            </button>
        </div>
    </div>
</template>

<style>
.topbar{
    position: fixed;
    height: 4rem;
    z-index: 997;
    left: 0;
    top: 0;
    width: 100%;
    background-color: white;
    padding: 0 2rem;
    /* background-color: var(--surface-card); */
    /* transition: left var(--layout-section-transition-duration); */
    display: flex;
    align-items: center;
}
.topbar .topbar-logo-container{
    /* width: 20rem; */
    width: auto;
    display: flex;
    align-items: center;
}
.topbar-logo{
    display: inline-flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    gap: 0.5rem;
}
.topbar-logo svg{
    width: 3rem;
}

/* action button */
.topbar-action-button{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    /* color: var(--text-color); */
    transition: background-color 0.2s;
}
.topbar-action-button:hover{
    /* background-color: var(--surface-hover); */
    background-color: #f1f5f9;
}

/* topbar actions */
.topbar .topbar-actions{
    margin-left: auto;
    display: flex;
    gap: 1rem;
}
.topbar-menu-button{
    display: none;
}
.topbar-menu-content{
    display: flex;
    gap: 1rem;
}
@media(max-width: 991px){
    .topbar-menu{
        position: absolute;
        /* background-color: var(--surface-overlay); */
        transform-origin: top;
        box-shadow:
            0px 3px 5px rgba(0, 0, 0, 0.02),
            0px 0px 2px rgba(0, 0, 0, 0.05),
            0px 1px 4px rgba(0, 0, 0, 0.08);
        padding: 1rem;
        right: 2rem;
        top: 4rem;
        min-width: 12rem;
    }
    .topbar-menu-button{
        display: inline-flex;
    }
    .topbar-menu .topbar-menu-content{
        gap: 0.5rem;
        flex-direction: column;
    }
    .topbar-menu button{
        display: flex;
        width: 100%;
        height: auto;
        justify-content: flex-start;
        border-radius: 6px;
        padding: 0.25rem 0.5rem;
        transition: background-color 0.2s;
    }
    .topbar-menu button:hover{
        background-color: #f1f5f9;
    }
}
</style>