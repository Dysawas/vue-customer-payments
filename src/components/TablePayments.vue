<template>
    <table class="table-auto my-2 w-full">
        <thead class="border-y-2 h-11">
            <tr>
                <th>Клиент</th>
                <th>Договор №</th>
                <th>Тип платежа</th>
                <th>Дата</th>
                <th>Сумма (руб)</th>
                <th>Источник платежа</th>
                <th>Статус</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="payment in payments" class="text-center border-b-2 h-14">
                <td>{{ payment.client }}</td>
                <td>{{ payment.contract }}</td>
                <td>{{ types.find(t => t.id === payment.type_id).title }}</td>
                <td>{{ new Date(payment.date).toLocaleDateString() }}</td>
                <td>{{ payment.summ }}</td>
                <td>{{ payment.source_id > 0 ? sources.find(s => s.id === payment.source_id).title : "-"}}</td>
                <td>
                    <span class="text-white p-1 " :class="[getStatusColor(payment)]">
                        {{ statuses.find(status => status.id === payment.status_id).title }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const payments = computed(() => store.state.payments.payments)
const sources = computed(() => store.state.payments.sources)
const types = computed(() => store.state.payments.types)
const statuses = computed(() => store.state.payments.statuses)

const enumStatuses = {
    confirmed: 3,
    paid: 2,
    notPaid: 1
}

const getStatusColor = (payment) => {
    
    const defaultStatusColor = "bg-blue-400"
    const bgSlate500 = "bg-slate-500"
    const bgOrange400 = "bg-orange-400"
    const bgGreen600 = "bg-green-600"

    if (payment.status_id === enumStatuses.paid)
        return bgOrange400
    else if (payment.status_id === enumStatuses.notPaid)
        return bgSlate500
    else if (payment.status_id === enumStatuses.confirmed)
        return bgGreen600
    else
        return defaultStatusColor
}


</script>
