<template>
  <div class="h-screen">
    <div class="flex">
      <SideMenu />
      <div class="pr-10 pl-5 ml-8 w-[100%]">
        <NavBar />
        <div class="flex">
          <div class="w-[100%]">
            <h3 class="text-2xl font-semibold mb-4">Resumos</h3>
            <div class="flex space-x-8 w-full">
              <CardSmall
                v-for="resume in resumes"
                :key="resume.title"
                :title="resume.title"
                :quantity="resume.quantity"
                :icon="resume.icon"
              />
            </div>
            <div class="mt-12 w-[100%]">
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
