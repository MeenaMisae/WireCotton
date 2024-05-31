<template>
  <div class="mt-5 lg:flex overflow-hidden">
    <div class="px-7 lg:px-0">
      <div
        class="grid grid-cols-5 lg:grid-cols-1 gap-x-4 lg:gap-5 lg:flex lg:items-center lg:flex-col lg:ml-1"
      >
        <StepItem
          v-for="(item, index) in items"
          :key="item.label"
          :item="item.label"
          :index="index"
          :totalItems="items.length"
          :step="step"
        />
      </div>
    </div>
    <div class="mt-10 lg:mt-0 lg:w-full lg:px-16" v-show="step === 1">
      <div class="flex justify-between">
        <h2 class="text-2xl hidden lg:block">1. Informações do produto</h2>
        <span class="before:content-['*'] before:text-red-500 before:mr-2"
          >Todos os itens são obrigatórios</span
        >
      </div>
      <div class="mt-7 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-7 lg:gap-y-4">
        <div class="flex flex-col gap-y-3">
          <label for="">Nome do produto</label>
          <input
            type="text"
            class="border rounded h-12 px-5 placeholder:text-[#959595] product-name shadow-sm"
            placeholder="Camisa gola V"
          />
        </div>
        <div class="flex flex-col gap-y-3">
          <label for="">Categoria</label>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="selectedCategory"
              :options="categories"
              optionLabel="name"
              placeholder="Feminino"
              checkmark
              :highlightOnSelect="false"
              class="w-full md:w-14rem h-12 items-center product-category-dropdown"
            />
          </div>
        </div>
        <div class="flex flex-col gap-y-3 lg:col-start-2">
          <label for="">Subcategoria</label>
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="selectedSubcategory"
              :options="subcategories"
              optionLabel="name"
              placeholder="Camisa"
              checkmark
              :highlightOnSelect="false"
              class="w-full md:w-14rem h-12 items-center product-sub-category-dropdown"
            />
          </div>
        </div>
        <div class="flex gap-x-5 lg:row-start-2">
          <div class="flex flex-col gap-y-3 w-[50%]">
            <label for="amount">Preço</label>
            <InputCurrency />
          </div>
          <div class="flex flex-col gap-y-3 w-[50%]">
            <label for="quantity">Quantidade</label>
            <InputQuantity />
          </div>
        </div>
        <div class="flex flex-col gap-y-3 lg:col-start-2">
          <span>Promoção</span>
          <div class="flex items-center gap-x-3">
            <Checkbox v-model="checked" :binary="true" inputId="discountCheckbox" />
            <label for="discountCheckbox" class="text-[#505050]">Produto promocional?</label>
          </div>
          <transition name="fade">
            <div v-show="checked" class="space-y-3 lg:space-y-1">
              <Slider v-model="discountValue" class="w-full my-2" />
              <div class="flex flex-col">
                <span class="text-[#505050] mt-2">Desconto: {{ discountValue }}%</span>
                <div class="flex gap-x-4 items-center">
                  <span class="text-[#505050]">Preço final com desconto: </span>
                  <span class="font-semibold text-lg tracking-wider">R$23,50</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="flex flex-col gap-y-3 lg:col-start-1 lg:row-start-3">
          <label for="productDescription">Descrição</label>
          <Textarea
            id="productDescription"
            placeholder="Camisa feita de 100% de algodão com gola V e detalhes nas costas."
            class="placeholder:text-[#959595] px-4 shadow-sm"
            rows="4"
          />
        </div>
      </div>
      <div class="w-full flex justify-between mt-4">
        <RouterLink activeClass="font-semibold" to="/products">
          <Button plain text class="gap-x-3">
            <ArrowRightIcon class="rotate-180" />
            Voltar
          </Button>
        </RouterLink>
        <Button plain text class="gap-x-3" @click="step++">
          Imagens
          <ArrowRightIcon class="" />
        </Button>
      </div>
    </div>
    <div
      class="mt-7 lg:mt-0 space-y-4 lg:w-[60vw] lg:overflow-x-auto lg:ml-16"
      id="gallery"
      v-show="step === 2"
    >
      <div class="flex justify-between w-full">
        <h2 class="text-2xl hidden lg:block">2. Imagens do produto</h2>
        <span class="before:content-['*'] before:text-red-500 before:mr-2"
          >Obrigatório no mínimo 1 imagem.</span
        >
      </div>
      <div class="flex w-40 justify-between items-center">
        <h3>Total de imagens:</h3>
        <span class="text-xl font-semibold">{{ productImages.length }}</span>
      </div>
      <div class="lg:flex lg:gap-x-4 lg:max-w-full lg:overflow-x-auto space-y-4 lg:space-y-0">
        <div
          v-for="(file, index) in productImages"
          :key="index"
          class="h-72 shadow border relative rounded-md lg:w-60 lg:mb-2"
          id="gallery-items"
        >
          <div class="h-full w-full lg:w-60">
            <div
              class="h-20 w-full bg-gradient-to-t from-black/35 to-transparent absolute bottom-0"
            ></div>
            <a
              :href="file.preview"
              @click="showPhotoSwipe"
              target="_blank"
              data-pswp-width="500"
              data-pswp-height="657"
              rel="noreferrer"
            >
              <img
                :src="file.preview"
                alt="preview-produto"
                class="object-cover h-full w-full object-top rounded-md"
              />
            </a>
            <span class="absolute bottom-0 text-white p-3">{{ file.name }}</span>
            <SpeedDial
              @click="selectImage(index)"
              @show="destroyPhotoSwipe"
              :model="imageOptions"
              direction="up"
              class="absolute bottom-0 right-0 p-3 speed-dial"
            />
          </div>
        </div>
        <label
          for="uploadImages"
          class="border shadow-lg flex justify-center items-center flex-col space-y-2 h-72 min-w-60 cursor-pointer rounded-lg"
        >
          <CloudUploadIcon />
          <span class="text-[#626262]">Adicionar imagem</span>
        </label>
        <input
          ref="uploadImages"
          id="uploadImages"
          type="file"
          @change="previewImages"
          hidden
          multiple
          accept="image/*"
        />
      </div>
      <div class="w-full flex justify-between">
        <Button plain text class="gap-x-3" @click="step--">
          <ArrowRightIcon class="rotate-180" />
          Informações
        </Button>
        <Button plain text class="gap-x-3" @click="step++">
          Revisão
          <ArrowRightIcon class="" />
        </Button>
      </div>
    </div>
    <div class="mt-10 lg:mt-0 lg:w-full lg:px-16" id="review-gallery" v-show="step === 3">
      <div class="swiper w-72">
        <div class="swiper-wrapper w-96">
          <div v-for="image in productImages" :key="image.preview" class="swiper-slide flex items-center">
            <a :href="image.preview" data-pswp-width="500" data-pswp-height="657">
              <img
                :src="image.preview"
                alt="preview-produto"
                class="object-cover h-72 w-full rounded-md"
              />
            </a>
          </div>
        </div>
        <div class="swiper-button-next">
          <Button
          class="min-w-[2rem]"
          icon="pi pi-chevron-right"
          iconClass="text-lg"
          iconPos="right"
          plain
          text
        >
        </Button>
        </div>
        <div class="swiper-button-prev">
          <Button
          class="min-w-[2rem]"
          icon="pi pi-chevron-left"
          iconClass="text-lg"
          iconPos="right"
          plain
          text
        >
        </Button>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="w-full flex justify-between mt-4">
        <Button plain text class="gap-x-3" @click="step--">
          <ArrowRightIcon class="rotate-180" />
          Imagens
        </Button>
        <Button
          label="Adicionar produto"
          class="gap-x-2 hover:bg-black hover:text-white"
          icon="pi pi-arrow-right"
          iconPos="right"
          plain
          text
        >
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import StepItem from '@/components/StepItem.vue'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Slider from 'primevue/slider'
import InputQuantity from '@/components/InputQuantity.vue'
import InputCurrency from '@/components/InputCurrency.vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import CloudUploadIcon from '@/components/icons/CloudUploadIcon.vue'
import SpeedDial from 'primevue/speeddial'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import Swiper from 'swiper'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const discountValue = ref(25)
const checked = ref(false)
const selectedCategory = ref()
const step = ref(2)
const selectedSubcategory = ref(1)
const uploadImages = ref()
const productImages = ref([])

let selectedImageIndex = null
let selectedImage = null
let files = null
let updateFile = null

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: '#gallery-items',
  pswpModule: () => import('photoswipe'),
  showHideAnimationType: 'fade'
})

const reviewImages = new PhotoSwipeLightbox({
  gallery: '#review-gallery',
  children: 'a',
  pswpModule: () => import('photoswipe'),
  showHideAnimationType: 'fade'
})

// watch(productImages, (n, o) => {
//   console.log(n)
// })
onMounted(() => {
  lightbox.init()
  reviewImages.init()
  const swiper = new Swiper('.swiper', {
    modules: [Pagination, Navigation],
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination'
    },
    loop: true
  })
})

const categories = ref([
  { name: 'Masculino', code: 'M' },
  { name: 'Feminino', code: 'F' },
  { name: 'Unissex', code: 'U' }
])

const items = ref([
  {
    label: 'Informações'
  },
  {
    label: 'Imagens'
  },
  {
    label: 'Revisão'
  }
])

function selectImage(index) {
  selectedImageIndex = index
  selectedImage = productImages.value[index]
}

function destroyPhotoSwipe() {
  lightbox.destroy()
}

function showPhotoSwipe() {
  lightbox.init()
}

const imageOptions = ref([
  {
    label: 'Alterar',
    icon: 'pi pi-pencil',
    command: () => {
      if (selectedImage) {
        updateFile = selectedImage
        uploadImages.value.click()
      }
    }
  },
  {
    label: 'Excluir',
    icon: 'pi pi-trash',
    command: () => {
      if (selectedImage) {
        const index = productImages.value.indexOf(selectedImage)
        if (index !== -1) {
          productImages.value.splice(index, 1)
          selectedImage = null
        }
      }
      console.log(productImages.value)
    }
  }
])
function previewImages(e) {
  files = e.target.files
  if (updateFile) {
    const file = files[0]
    if (file) {
      productImages.value[selectedImageIndex] = {
        name: file.name,
        preview: URL.createObjectURL(file)
      }
      updateFile = null
      return
    }
  }
  Object.values(files).forEach((element) => {
    productImages.value.push({ name: element.name, preview: URL.createObjectURL(element) })
  })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.swiper-pagination-bullet-active {
	background-color: #FFFFFF !important;
  border-width: 1px;
  border-style: solid;
  border-color: #A7A7A7 !important;
}

.swiper-pagination-bullet {
	background-color: #A7A7A7 !important;
  margin-left: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: #A7A7A7 !important;
}

.swiper-button-prev {
    color: black;
}

.swiper-button-next {
    color: black; 
}

.swiper-button-next::after, .swiper-button-prev::after {
    content: "";
    display: none;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.speed-dial > .p-speeddial-button {
  background-color: transparent;
  border: 0;
  position: relative;
  top: 7px;
}
.product-category-dropdown > .p-dropdown-label.p-inputtext.p-placeholder,
.product-category-dropdown > .p-dropdown-label.p-inputtext,
.product-sub-category-dropdown > .p-dropdown-label.p-inputtext.p-placeholder,
.product-sub-category-dropdown > .p-dropdown-label.p-inputtext {
  margin-left: 0.8rem;
}

.product-name:hover {
  border-color: #94a3b8;
}

.product-name {
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
  border: 1px solid #cbd5e1;
  outline-color: transparent;
}

.product-name:focus {
  outline: 1px solid #000000;
  outline-offset: -1px;
  border-color: #94a3b8;
}

@media screen and (min-width: 1024px) {
  *::-webkit-scrollbar {
    height: 5px;
    width: 10px;
  }
  *::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #e1e1e1;
  }

  *::-webkit-scrollbar-track:hover {
    background-color: #b8c0c2;
  }

  *::-webkit-scrollbar-track:active {
    background-color: #b8c0c2;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #505050;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #505050;
  }

  *::-webkit-scrollbar-thumb:active {
    background-color: #505050;
  }
}
</style>
