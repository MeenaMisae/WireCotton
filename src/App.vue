<template>
  <div class="h-screen lg:overflow-auto" :class="{ 'overflow-hidden': hide }">
    <div class="flex">
      <SideMenu @visible-side-menu="hideOverflow" />
      <div class="lg:pr-10 lg:pl-5 lg:ml-8 w-[100%] px-6">
        <NavBar />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue'
import NavBar from './components/NavBar.vue'
import { ref } from 'vue'

const hide = ref()
function hideOverflow(event: boolean) {
  hide.value = event
}
</script>
