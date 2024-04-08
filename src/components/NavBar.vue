<template>
  <div class="flex justify-between py-11 text-xl items-center">
    <div class="">Início</div>
    <div class="flex items-center">
      <Button plain text @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu">
        <span class="text-lg font-questrial mr-2">Meena</span>
        <ChevronLeft class="-rotate-90" />
      </Button>
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TieredMenu from 'primevue/tieredmenu'
import Button from 'primevue/button'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'

const menu = ref()
const items = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Document',
            icon: 'pi pi-file'
          },
          {
            label: 'Image',
            icon: 'pi pi-image'
          },
          {
            label: 'Video',
            icon: 'pi pi-video'
          }
        ]
      },
      {
        label: 'Open',
        icon: 'pi pi-folder-open'
      },
      {
        label: 'Print',
        icon: 'pi pi-print'
      }
    ]
  },
  {
    label: 'Edit',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Copy',
        icon: 'pi pi-copy'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ]
  },
  {
    label: 'Search',
    icon: 'pi pi-search'
  },
  {
    separator: true
  },
  {
    label: 'Share',
    icon: 'pi pi-share-alt',
    items: [
      {
        label: 'Slack',
        icon: 'pi pi-slack'
      },
      {
        label: 'Whatsapp',
        icon: 'pi pi-whatsapp'
      }
    ]
  }
])

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>
