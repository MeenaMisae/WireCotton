<template>
  <div class="flex items-center justify-center lg:justify-end lg:w-full">
    <div class="flex flex-col items-center step-content lg:flex-row lg:gap-8" :class="{ 'active-step': index === step - 1 }">
      <div
        class="w-9 h-9 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#505050] step-index lg:order-1"
      >
        {{ index + 1 }}
      </div>
      <div class="step-label lg:order-0">
        {{ item }}
      </div>
    </div>
  </div>
  <span
    class="border-t-[1px] border-[#C4C4CB] w-full mt-4 lg:mt-0 lg:h-10 lg:border-t-0 lg:border-r-[1px] lg:mr-9"
    v-show="index < totalItems - 1"
  ></span>
</template>

<script setup>
defineProps({
  item: String,
  index: Number,
  totalItems: Number,
  step: Number
})
</script>

<style scoped>

.active-step .step-index {
  color: #f5f5f5;
  background-color: #7729c5;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
}

.active-step .step-label {
  font-weight: bold;
}
</style>
