<template>
  <div class="flex justify-between py-8 text-xl items-center ml-8 lg:ml-0">
    <div>Início</div>
    <div class="lg:flex items-center hidden">
      <Button plain text>
        <SearchLensIcon />
      </Button>
      <Button plain text @click="toggleNotifications">
        <NotificationBellIcon v-badge.contrast :width="24" :height="24" />
      </Button>
      <OverlayPanel ref="openNotifications" class="ml-2"> <div>Notificações</div> </OverlayPanel>

      <Button plain text @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu">
        <Avatar label="M" class="mr-3 h-9 w-9" shape="circle" />
        <span class="text-lg font-questrial mr-2">Meena</span>
        <ChevronLeft class="-rotate-90" />
      </Button>
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OverlayPanel from 'primevue/overlaypanel'
import Avatar from 'primevue/avatar'
import TieredMenu from 'primevue/tieredmenu'
import Button from 'primevue/button'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import SearchLensIcon from './icons/SearchLensIcon.vue'
import NotificationBellIcon from './icons/NotificationBellIcon.vue'

const openNotifications = ref()
const toggleNotifications = (event) => {
  openNotifications.value.toggle(event)
}
const menu = ref()
const items = ref([
  {
    label: 'Perfil',
    icon: 'pi pi-user'
  },
  {
    label: 'Configurações',
    icon: 'pi pi-cog'
  },
  {
    separator: true
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out'
  }
])

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>
