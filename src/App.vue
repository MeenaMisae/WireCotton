<template>
  <div class="h-screen">
    <div class="flex">
      <SideMenu />
      <div class="pl-5 ml-8">
        <NavBar />
        <div class="flex">
          <div>
            <h3 class="text-2xl font-semibold mb-4">Resumos</h3>
            <div class="flex space-x-8">
              <CardSmall
                v-for="resume in resumes"
                :key="resume.title"
                :title="resume.title"
                :quantity="resume.quantity"
                :icon="resume.icon"
              />
            </div>
            <div class="mt-12 max-w-[46rem]">
              <div>
                <ProductPendingOrders />
              </div>
            </div>
          </div>
          <ProductsBestSelling />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue'
import NavBar from './components/NavBar.vue'
import CardSmall from './components/CardSmall.vue'
import { ref } from 'vue'

import ProductPendingOrders from './components/ProductPendingOrders.vue'
import ProductsBestSelling from './components/ProductsBestSelling.vue'

const resumes = ref([
  { title: 'Produtos', quantity: 22, icon: 'ProductPackageBlack' },
  { title: 'Categorias', quantity: 5, icon: 'ProductCategoryTag' },
  { title: 'Pedidos', quantity: 4, icon: 'ProductOrdersTruck' },
  { title: 'Clientes', quantity: 80, icon: 'ProductClients' }
])
</script>
