<template>
    <form @submit="e => e.preventDefault()" class="border-b-2">
        <div class="flex justify-end m-2">
            <label for="client" class="mx-2 text-lg	">
                <span class="text-red-600 mr-1">&#42;</span>
                Клиент
            </label>
            <input id="client" name="client" placeholder="Введите ФИО"
                class="h-full rounded-md border-2 border-solid py-1 px-2 text-gray-500 w-2/4"
                :class="errors.errClient && `border-red-700`" v-model="payment.client">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="contract" class="mx-2 text-lg">
                <span class="text-red-600 mr-1">&#42;</span>
                Договор №
            </label>
            <input id="contract" name="contract" placeholder="Введите номер договора" v-model="payment.contract"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4"
                :class="errors.errContract && `border-red-700`">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="type_id" class="mx-2 text-lg">
                <span class="text-red-600 mr-1">&#42;</span>
                Тип оплаты
            </label>
            <select id="type_id" name="type_id" v-model="payment.type_id"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4"
                :class="errors.errType && `border-red-700`">
                <option value="0">Не выбрано</option>
                <option v-for="t in types" :value="t.id">{{ t.title }}</option>
            </select>
        </div>
        <div class="flex justify-end m-2">
            <label for="date" class="mx-2 text-lg">
                <span class="text-red-600 mr-1">&#42;</span>
                Дата оплаты
            </label>
            <input id="date" name="date" placeholder="Введите номер договора" type="date" v-model="payment.date"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4"
                :class="errors.errDate && `border-red-700`">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="summ" class="mx-2 text-lg">
                <span class="text-red-600 mr-1">&#42;</span>
                Сумма оплаты
            </label>
            <input id="summ" name="summ" placeholder="Введите сумму" v-model="payment.summ"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4"
                :class="errors.errSumm && `border-red-700`">
            </input>
        </div>
        <div class="flex justify-end m-2">
            <label for="source_id" class="mx-2 text-lg">
                <span class="text-red-600 mr-1">&#42;</span>
                Источник оплаты
            </label>
            <select id="source_id" name="source_id" v-model="payment.source_id"
                class="h-full rounded-md border-2 border-solid p-1 text-gray-500 py-1 px-2 w-2/4"
                :class="errors.errSource && `border-red-700`">
                <option value="0">Не выбрано</option>
                <option v-for="source in sources" :value="source.id">{{ source.title }}</option>
            </select>
        </div>
        <div class="flex justify-end m-2">
            <label for="source_id" class="mx-2 text-lg">
                <span class="text-red-600 mr-1">&#42;</span>
                Статус
            </label>
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

const errors = ref({
    errClient: false,
    errContract: false,
    errDate: false,
    errSumm: false,
    errSource: false,
    errType: false
})

const store = useStore()

const sources = computed(() => store.state.payments.sources)
const statuses = computed(() => store.state.payments.statuses)
const types = computed(() => store.state.payments.types)

const postPayment = () => {
    reset()
    if (isErrorsForm()) return
    store.dispatch("postPayment", payment.value)
}

const isErrorsForm = () => {
    let isError = false
    if (payment.value.client == "") {
        errors.value.errClient = true
    }
    if (payment.value.contract == "") {
        errors.value.errContract = true
    }
    if (payment.value.date == "") {
        errors.value.errDate = true
    }
    if (payment.value.summ == "") {
        errors.value.errSumm = true
    }

    if (payment.value.source_id === 0) {
        errors.value.errSource = true
    }

    if (payment.value.type_id === 0) {
        errors.value.errType = true
    }

    if (errors.value.errClient ||
        errors.value.errContract ||
        errors.value.errSumm ||
        errors.value.errDate ||
        errors.value.errSource ||
        errors.value.errType)
        isError = true

    return isError
}

const reset = () => {
    errors.value.errClient = false
    errors.value.errContract = false
    errors.value.errDate = false
    errors.value.errSumm = false
    errors.value.errType = false
    errors.value.errSource = false
}

const close = () => store.commit("setIsOpenModal")

</script>