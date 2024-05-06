<template>
  <div class="flex items-center justify-center lg:justify-normal">
    <div class="flex flex-col items-center step-content" :class="{ 'active-step': index === 0 }">
      <div
        class="w-9 h-9 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#505050] step-index"
      >
        {{ index + 1 }}
      </div>
      <div class="step-label">
        {{ item }}
      </div>
    </div>
  </div>
  <span
    class="border-t-[1px] border-[#C4C4CB] w-full mt-4 lg:mt-0 lg:border-l-4 lg:border-t-0"
    v-if="index < totalItems - 1"
  ></span>
</template>

<script setup>
defineProps({
  item: String,
  index: Number,
  totalItems: Number
})
</script>

<style scoped>
.active-step .step-index {
  color: #f5f5f5;
  background-color: #7729c5;
}

.active-step .step-label {
  font-weight: bold;
}
</style>
