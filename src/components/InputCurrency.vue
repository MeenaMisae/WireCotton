<template>
  <div class="relative">
    <money3
      id="amount"
      v-model="amount"
      v-bind="config"
      type="number"
      inputmode="numeric"
      class="input-number border rounded h-12 px-5 text-[#959595] w-full shadow-sm"
      :class="{ 'text-inherit': amount > 0 }"
      min="0"
    />
    <div class="input-buttons absolute top-1 right-0 mr-0.5 space-y-1">
      <div class="flex justify-end">
        <button class="quantity-button w-10 flex items-center justify-center" @click="amount++">
          <ChevronLeft class="rotate-90" :stroke="'#94A3B8'" :width="16" />
        </button>
      </div>
      <div class="flex justify-end">
        <button
          class="quantity-button w-10 flex items-center justify-center"
          @click="amount > 0 ? amount-- : 0"
        >
          <ChevronLeft class="-rotate-90" :stroke="'#94A3B8'" :width="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChevronLeft from './icons/ChevronLeft.vue'

const amount = ref()
const config = computed(() => {
  return {
    decimal: ',',
    thousands: '.',
    prefix: 'R$ ',
    suffix: '',
    precision: 2,
    masked: false
  }
})
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-number {
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
  outline-color: transparent;
  border: 1px solid #cbd5e1;
}

.input-number:focus {
  outline: 1px solid #000000;
  outline-offset: -1px;
  border-color: #94a3b8;
}

.input-number:hover {
  border-color: #94a3b8;
}

.quantity-button {
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
  outline-color: transparent;
  opacity: 0.6;
}

.quantity-button:active {
  opacity: 1;
}

.quantity-button:hover {
  background-color: #f1f5f9;
  border-radius: 4px;
}
</style>
