<template>
  <div
    class="flex justify-between lg:h-auto lg:py-8 h-14 text-xl items-center ml-8 lg:ml-0 sticky top-0 z-50 lg:static bg-[#FFFFFF]"
  >
    <div>
      <Breadcrumb :model="elements" class="font-questrial text-[23px] p-0">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary" :class="{ 'font-semibold': $route.path === item.route }">{{
                item.label
              }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-color font-semibold">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
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
import { watch, ref } from 'vue'
import OverlayPanel from 'primevue/overlaypanel'
import Avatar from 'primevue/avatar'
import TieredMenu from 'primevue/tieredmenu'
import Button from 'primevue/button'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import SearchLensIcon from './icons/SearchLensIcon.vue'
import NotificationBellIcon from './icons/NotificationBellIcon.vue'
import Breadcrumb from 'primevue/breadcrumb'
import { useRoute } from 'vue-router'

defineProps({
  title: String
})
const openNotifications = ref()
const toggleNotifications = (event) => {
  openNotifications.value.toggle(event)
}
const route = useRoute()
const elements = ref([])
watch(route, (newRoute) => {
  const newElements = []
  const breadcumb = newRoute.meta.breadcumb
  breadcumb.forEach((item) => {
    newElements.push({ label: item.name, route: item.link })
    elements.value = newElements
  })
})
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
