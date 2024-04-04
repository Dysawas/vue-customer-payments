<template>
    <form @submit="e => e.preventDefault()" class="border-b-2">
        <div class="flex justify-end m-2">
            <label for="client" class="mx-2 text-lg	"><span class="text-red-600 mr-1">&#42;</span>Клиент</label>
            <input id="client" name="client" placeholder="Введите ФИО"
                class="h-full rounded-md border-2 border-solid py-1 px-2 text-gray-500 w-2/4" v-model="payment.client">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="contract" class="mx-2 text-lg"><span class="text-red-600 mr-1">&#42;</span>Договор №</label>
            <input id="contract" name="contract" placeholder="Введите номер договора" v-model="payment.contract"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="type_id" class="mx-2 text-lg"><span class="text-red-600 mr-1">&#42;</span>Тип оплаты</label>
            <select id="type_id" name="type_id" v-model="payment.type_id"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4">
                <option value="0">Не выбрано</option>
                <option v-for="t in types" :value="t.id">{{ t.title }}</option>
            </select>
        </div>
        <div class="flex justify-end m-2">
            <label for="date" class="mx-2 text-lg"><span class="text-red-600 mr-1">&#42;</span>Дата оплаты</label>
            <input id="date" name="date" placeholder="Введите номер договора" type="date" v-model="payment.date"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="summ" class="mx-2 text-lg"><span class="text-red-600 mr-1">&#42;</span>Сумма оплаты</label>
            <input id="summ" name="summ" placeholder="Введите сумму" v-model="payment.summ"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4	">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="source_id" class="mx-2 text-lg"><span class="text-red-600 mr-1">&#42;</span>Источник
                оплаты</label>
            <select id="source_id" name="source_id" v-model="payment.source_id"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4">
                <option value="0">Все источники</option>
                <option v-for="source in sources" :value="source.id">{{ source.title }}</option>
            </select>
        </div>
        <div class="flex justify-end m-2">
            <label for="source_id" class="mx-2 text-lg"><span class="text-red-600 mr-1">&#42;</span>Статус</label>
            <select id="source_id" name="source_id" v-model="payment.status_id"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4">
                <option v-for="status in statuses" :value="status.id">{{ status.title }}</option>
            </select>
        </div>
        <div class="flex justify-between my-3">
            <button class="border-2 p-2" @click="close">Отменить</button>
            <button class="bg-blue-500 w-36	p-2 text-white rounded-md" @click="postPayment">Добавить оплату</button>
        </div>
    </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';

const payment = ref({
    client: "",
    contract: "",
    type_id: 0,
    date: "",
    summ: "",
    source_id: 0,
    status_id: 1
})

const store = useStore()

const sources = computed(() => store.state.payments.sources)
const statuses = computed(() => store.state.payments.statuses)
const types = computed(() => store.state.payments.types)

const postPayment = () => store.dispatch("postPayment", payment.value)
const close = () => store.commit("setIsOpenModal")

</script>