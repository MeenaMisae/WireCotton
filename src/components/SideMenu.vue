<template>
  <transition name="slide-fade" mode="out-in">
    <div class="py-9 w-72 shadow-lg px-5 min-h-screen" v-if="appear">
      <div class="flex items-center justify-between w-56 ml-4" v-show="appear">
        <h1 class="text-3xl">wire: cotton</h1>
        <Button plain text @click="toggle">
          <ChevronLeft />
        </Button>
      </div>
      <div class="mt-14 ml-4">
        <ul class="space-y-12">
          <li class="text-xl">
            <a href="">Início</a>
          </li>
          <li class="text-xl">
            <a href="">Produtos</a>
          </li>
          <li class="text-xl">
            <a href="">Categorias</a>
          </li>
          <li class="text-xl">
            <a href="">Pedidos</a>
          </li>
          <li class="text-xl">
            <a href="">Clientes</a>
          </li>
        </ul>
      </div>
      <div
        class="bg-black text-white flex justify-center w-60 h-48 items-center rounded-2xl mt-16 2xl:mt-32 bg-gradient-to-br to-neutral-950 to-1% via-[#2b2b2b] via-65% from-neutral-950"
      >
        <div class="w-44 h-32">
          <ProductPackage class="mb-4" />
          <h3 class="text-lg">Novos produtos</h3>
          <p>Aumentar a variedade do eccomerce</p>
        </div>
      </div>
    </div>
  </transition>
  <div class="py-9 px-5" v-if="!appear">
    <Button plain text @click="toggle" class="rotate-180">
      <ChevronLeft />
    </Button>
  </div>
</template>

<script setup lang="ts">
import ProductPackage from '@/components/icons/ProductPackage.vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const appear = ref(true)
function toggle() {
  appear.value = !appear.value
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
