<template>
  <div
    class="h-screen min-w-[100%] lg:min-w-fit lg:min-h-screen sticky top-0 z-50 lg:static bg-[#FFFFFF]"
    :class="{ 'min-w-fit': !appear }"
  >
    <div :class="{ 'w-0': showMenuBtn, 'mr-0': !showMenuBtn, hidden: appear }" v-show="showMenuBtn">
      <div class="lg:mt-[2.4rem]">
        <Button
          plain
          text
          @click="toggleMenu"
          class="flex items-center bg-[#FFFFFF] h-[3.5rem] lg:h-auto"
        >
          <div class="hidden lg:flex rotate-180">
            <ChevronLeft :width="20" :stroke="'#292929'" />
          </div>
          <div class="flex lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-menu-deep"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6h16" />
              <path d="M7 12h13" />
              <path d="M10 18h10" />
            </svg>
          </div>
        </Button>
      </div>
    </div>

    <transition :name="slideFade">
      <div
        class="lg:py-9 py-5 lg:w-72 shadow-lg px-5 fixed top-0 left-0 w-screen h-screen lg:static"
        :class="{ 'lg:fixed': !appear }"
        v-show="appear"
      >
        <div class="h-[80%] lg:h-[70%]">
          <div class="flex items-center justify-between lg:w-56 ml-4">
            <h1 class="text-3xl">wire: cotton</h1>
            <Button plain text @click="toggleMenu">
              <ChevronLeft :width="20" :stroke="'#292929'" />
            </Button>
          </div>
          <div class="mt-14 ml-4">
            <ul class="space-y-12">
              <li class="text-2xl lg:text-xl menu-item">
                <RouterLink activeClass="font-semibold" to="/">Início</RouterLink>
              </li>
              <li class="text-2xl lg:text-xl menu-item">
                <RouterLink activeClass="font-semibold" to="/products">Produtos</RouterLink>
              </li>
              <li class="text-2xl lg:text-xl menu-item">
                <RouterLink activeClass="font-semibold" to="/categories">Categorias</RouterLink>
              </li>
              <li class="text-2xl lg:text-xl menu-item">
                <RouterLink activeClass="font-semibold" to="/orders">Pedidos</RouterLink>
              </li>
              <li class="text-2xl lg:text-xl menu-item">
                <RouterLink activeClass="font-semibold" to="/clients">Clientes</RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="lg:hidden divide-y-2 space-y-4">
            <div class="flex items-center justify-between">
              <Button plain text class="gap-x-3">
                <i class="pi pi-cog text-xl"></i>
                <span class="font-questrial">Configurações</span>
              </Button>
              <Button plain text>
                <NotificationBellIcon v-badge.contrast :width="20" :height="20" />
              </Button>
            </div>
            <div class="pt-4">
              <Button
                plain
                text
                class="font-questrial flex justify-between min-w-[100%] text-left items-center pl-2 pr-4"
              >
                <div class="flex items-center gap-5">
                  <div>
                    <Avatar label="MM" class="h-12 w-12 text-xl font-questrial" shape="circle" />
                  </div>
                  <div class="flex flex-col justify-start">
                    <span class="text-lg">Meena</span>
                    <span>meenamisae@gmail.com</span>
                  </div>
                </div>
                <div class="flex items-center">
                  <i class="pi pi-angle-right text-xl"></i>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div
          class="bg-black text-white justify-center w-60 h-48 items-center rounded-2xl bg-gradient-to-br to-neutral-950 to-1% via-[#2b2b2b] via-65% from-neutral-950 hidden lg:flex"
        >
          <div class="w-44 h-32 relative">
            <ProductPackage class="mb-4" />
            <h3 class="text-lg">Novos produtos</h3>
            <p>Aumentar a variedade do e-commerce</p>
            <div class="absolute left-36 -bottom-4">
              <router-link to="/products/create">
                <Button
                  icon="pi pi-arrow-right"
                  severity="secondary"
                  text
                  class="text-white hover:text-black h-8"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import ProductPackage from '@/components/icons/ProductPackage.vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import NotificationBellIcon from './icons/NotificationBellIcon.vue'
import Button from 'primevue/button'
import { ref, onMounted } from 'vue'
import Avatar from 'primevue/avatar'

const appear = ref(false)
const showMenuBtn = ref(true)
const slideFade = ref('')
const emit = defineEmits(['visibleSideMenu'])
let windowWidth = ref(window.innerWidth)

onMounted(() => {
  detectWindowSize()
  window.addEventListener('resize', detectWindowSize)
})
const detectWindowSize = () => {
  if (windowWidth.value < 1200) {
    const listItems = document.getElementsByClassName('menu-item')
    Array.from(listItems).forEach((item) => {
      item.addEventListener('click', toggleMenu)
    })
  } else {
    const listItems = document.getElementsByClassName('menu-item')
    Array.from(listItems).forEach((item) => {
      item.removeEventListener('click', toggleMenu)
    })
    appear.value = true
  }
}
const toggleMenu = () => {
  appear.value = !appear.value
  appear.value ? emit('visibleSideMenu', true) : emit('visibleSideMenu', false)
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
  opacity: 0;
}
</style>
