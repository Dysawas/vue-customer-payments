<template>
  <div class="container  mx-auto px-4">
    <h1 class="text-xl font-semibold mb-3">Список платежей</h1>
    <Modal>
      <FormPayment />
    </Modal>
    <Actions />
    <TablePayments />
  </div>
</template>

<script setup>
import Actions from "./components/Actions.vue";
import Modal from "./components/Modal.vue";
import TablePayments from "./components/TablePayments.vue";
import FormPayment from "./components/FormPayment.vue"
import { useStore } from 'vuex'
import { onBeforeMount } from "vue";

const store = useStore()

onBeforeMount(() => {
  getAllPaymentsAsync()
})

const getAllPaymentsAsync = () => store.dispatch('getAllPaymentsAsync')

</script>