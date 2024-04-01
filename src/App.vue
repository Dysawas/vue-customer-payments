<template>
  <div class="container  mx-auto px-4 text-3xl flex flex-col	">
    <ul class="list-decimal">
      <li class="list-item" v-for="payment in payments">
        <div>
          <label for="">Клиент:</label>
          <span class="px-2">{{ payment.client }}</span>
        </div>
        <div>
          <label for="">Контракт:</label>
          <span class="px-2">{{ payment.contract }}</span>
        </div>
        <div>
          <label for="">Сумма:</label>
          <span class="px-2">{{ payment.summ }}</span>
        </div>
        <div>
          <label for="">Дата:</label>
          <span class="px-2">{{ payment.date }}</span>
        </div>
      </li>
    </ul>

    <button @click="getAllPaymentsAsync">Get all payments</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const payments = computed(() => store.state.payments.payments)
const getAllPaymentsAsync = () => store.dispatch('getAllPaymentsAsync')

</script>