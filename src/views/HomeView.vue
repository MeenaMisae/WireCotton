<template>
  <div class="flex flex-col lg:flex-row">
    <div class="w-[100%]">
      <h3 class="text-2xl font-semibold mb-4">Resumos</h3>
      <div class="lg:flex flex-col lg:flex-row grid grid-cols-2 w-full gap-5">
        <!-- <CardSmall
          v-for="resume in resumes"
          :key="resume.title"
          :title="resume.title"
          :quantity="resume.quantity"
          :icon="resume.icon"
        /> -->
      </div>
      <div class="lg:mt-12 mt-8 w-[100%]">
        <div>
          <ProductPendingOrders />
        </div>
      </div>
    </div>
    <ProductsBestSelling />
  </div>
</template>
<script setup>
import CardSmall from '@/components/CardSmall.vue'
import ProductPendingOrders from '@/components/ProductPendingOrders.vue'
import ProductsBestSelling from '@/components/ProductsBestSelling.vue'
import { ref } from 'vue'

const resumes = ref([
  { title: 'Produtos', quantity: 22, icon: 'ProductPackageBlack' },
  { title: 'Categorias', quantity: 5, icon: 'ProductCategoryTag' },
  { title: 'Pedidos', quantity: 4, icon: 'ProductOrdersTruck' },
  { title: 'Clientes', quantity: 80, icon: 'ProductClients' }
])
</script>
