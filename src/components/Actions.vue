<template>
    <button class="bg-blue-500 w-48 h-7	px-2 text-white" @click="openModal">Добавить платеж</button>
    <div class="flex ">
        <div class="mx-3">
            <label class="block">Дата платежа</label>
            <input class=" border-2 w-44" type="date" v-model="date" @change="filterPayments" />
        </div>
        <div class="mx-3 ">
            <label class="block">Источник платежа</label>
            <select class="border-2 w-44" v-model="source_id" @change="filterPayments">
                <option value="0">Все источники</option>
                <option v-for="source in sources" :value="source.id">{{ source.title }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const date = ref("")
const source_id = ref(0)
const sources = computed(() => store.state.payments.sources)

const filterPayments = () => store.dispatch("filterPayments", { date: date.value, source_id: source_id.value })
const openModal = () => store.commit("setIsOpenModal")
</script>