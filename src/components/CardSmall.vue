<template>
  <div class="shadow-md w-40 h-36 flex items-center justify-center flex-col">
    <div class="flex items-center justify-center">
      <component :is="iconComponent" />
      <span class="text-3xl ml-2 font-semibold">{{ quantity }}</span>
    </div>
    <p class="text-xl mt-3">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import ProductPackageBlack from './icons/ProductPackageBlack.vue'
import ProductCategoryTag from './icons/ProductCategoryTag.vue'
import ProductOrdersTruck from './icons/ProductOrdersTruck.vue'
import ProductClients from './icons/ProductClients.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  quantity: Number,
  icon: String
})
const iconComponent = ref({})

onMounted(() => {
  switch (props.icon) {
    case 'ProductPackageBlack':
      iconComponent.value = ProductPackageBlack
      break
    case 'ProductCategoryTag':
      iconComponent.value = ProductCategoryTag
      break
    case 'ProductOrdersTruck':
      iconComponent.value = ProductOrdersTruck
      break
    case 'ProductClients':
      iconComponent.value = ProductClients
      break
    default:
      iconComponent.value = {}
  }
})
</script>
