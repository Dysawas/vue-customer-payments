<template>
    <teleport to="#modal">
        <Transition name="fade">
            <div class="fixed z-10 w-full h-full overflow-auto bg-opacity-30 bg-black" v-if="isOpen" @click="close">
                <div class="relative w-1/3	 top-40 m-auto p-5 bg-white border-2 border-solid"
                    @click="e => e.stopPropagation()">
                    <div class="flex justify-between border-b-2 text-xl pb-4">
                        <h1 class="text-slate-800 font-semibold">Добавление нового платежа</h1>
                        <span class="close cursor-pointer text-2xl " @click="close">&times;</span>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const isOpen = computed(() => store.state.payments.isOpenModal)
const close = () => store.commit("setIsOpenModal")
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>