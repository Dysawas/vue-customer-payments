<template>
  <div class="container  mx-auto px-4	">
    <h1 class="text-xl font-semibold	">Список платежей</h1>
    <Actions />
    <TablePayments />
    <button @click="getAllPaymentsAsync">Get all payments</button>
  </div>
</template>

<script setup>
import Actions from "./components/Actions.vue";
import TablePayments from "./components/TablePayments.vue";
import { useStore } from 'vuex'

const store = useStore()

const getAllPaymentsAsync = () => store.dispatch('getAllPaymentsAsync')

</script>