<template>
  <div :class="{ 'w-0': showMenuBtn, 'mr-0': !showMenuBtn, hidden: appear }" v-show="showMenuBtn">
    <div class="lg:mt-[2.4rem] mt-[1.6rem]">
      <Button plain text @click="toggle" class="rotate-180">
        <ChevronLeft />
      </Button>
    </div>
  </div>
  <transition :name="slideFade">
    <div
      class="py-9 lg:w-72 shadow-lg px-5 lg:min-h-screen min-w-full lg:min-w-fit"
      v-show="appear"
    >
      <div class="flex items-center justify-between lg:w-56 ml-4">
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
        <div class="w-44 h-32 relative">
          <ProductPackage class="mb-4" />
          <h3 class="text-lg">Novos produtos</h3>
          <p>Aumentar a variedade do e-commerce</p>
          <div class="absolute left-36 -bottom-4">
            <Button
              icon="pi pi-arrow-right"
              severity="secondary"
              text
              class="text-white hover:text-black h-8"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import ProductPackage from '@/components/icons/ProductPackage.vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import Button from 'primevue/button'
import { ref, onMounted } from 'vue'

const appear = ref(false)
const showMenuBtn = ref(true)
const slideFade = ref('')
onMounted(() => {
  detectWindowSize()
  window.addEventListener('resize', detectWindowSize)
})
const detectWindowSize = () => {
  appear.value = window.innerWidth >= 1200
}
const toggle = () => {
  appear.value = !appear.value
  showMenuBtn.value = !appear.value
  slideFade.value = 'slide-fade'
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
}
</style>
