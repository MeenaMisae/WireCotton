<template>
  <div class="flex justify-end">
    <RouterLink to="/products/create">
      <button class="flex items-center shadow rounded h-14 w-16 justify-center">
        <ProductPackageBlack />
        <ArrowRightIcon />
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import ProductPackageBlack from '@/components/icons/ProductPackageBlack.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
</script>
