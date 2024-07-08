<template>
  <div class="mt-5 overflow-hidden lg:flex">
    <div class="px-7 lg:px-0">
      <Toast />
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
        <h2 class="hidden text-2xl lg:block">1. Informações do produto</h2>
        <span class="before:content-['*'] before:text-red-500 before:mr-2"
          >Todos os itens são obrigatórios</span
        >
      </div>
      <div class="space-y-5 mt-9 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-7 lg:gap-y-6">
        <div class="flex flex-col gap-y-3">
          <label for="">Nome do produto</label>
          <input
            type="text"
            class="border rounded h-12 px-5 placeholder:text-[#959595] product-name shadow-sm"
            placeholder="Camisa gola V"
            v-model="productName"
          />
          <div class="h-2">
            <span v-if="errors?.name" class="text-red-500">{{ errors.name[0] }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <label for="">Categoria</label>
          <div class="flex card justify-content-center">
            <Dropdown
              v-model="selectedCategory"
              :options="categories"
              optionLabel="name"
              placeholder="Feminino"
              checkmark
              :highlightOnSelect="false"
              class="items-center w-full h-12 md:w-14rem product-category-dropdown"
              @change="loadSubcategories"
            />
          </div>
          <div class="h-2">
            <span v-if="errors?.category" class="text-red-500">{{ errors.category[0] }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-y-3 lg:col-start-2">
          <label for="">Subcategoria</label>
          <div class="flex card justify-content-center">
            <Dropdown
              v-model="selectedSubcategory"
              :options="subcategories"
              optionLabel="name"
              placeholder="Camisa"
              checkmark
              :highlightOnSelect="false"
              class="items-center w-full h-12 md:w-14rem product-sub-category-dropdown"
              @change="loadAttributes"
            />
          </div>
          <div class="h-2">
            <span v-if="errors?.subcategory" class="text-red-500">{{ errors.subcategory[0] }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-y-3 lg:col-start-2" v-if="attributes.length > 0">
          <div
            class="flex flex-col card justify-content-center"
            v-for="attribute in attributes"
            :key="attribute.id"
          >
            <label for="">{{ attribute.name }}</label>
            <Dropdown
              v-model="selectedAttribute[attribute.id]"
              :options="attribute.options"
              optionLabel="name"
              checkmark
              :highlightOnSelect="false"
              class="flex items-center w-full h-12 mt-1 md:w-14rem product-sub-category-dropdown"
            />
            <div class="h-6">
              <span v-if="errors?.attributeOptions" class="text-red-500">{{
                errors.attributeOptions[0]
              }}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-x-5 lg:row-start-2">
          <div class="flex flex-col gap-y-3 w-[50%]">
            <label for="amount">Preço</label>
            <InputCurrency v-model="amount" />
            <div class="h-2">
              <span v-if="errors?.amount" class="text-red-500">{{ errors.amount[0] }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-y-3 w-[50%]">
            <label for="quantity">Quantidade</label>
            <InputQuantity v-model="quantity" />
            <div class="h-2">
              <span v-if="errors?.quantity" class="w-full text-red-500">{{
                errors.quantity[0]
              }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col pt-2 lg:pt-0 gap-y-3 lg:col-start-1 lg:row-start-3">
          <label for="productDescription">Descrição</label>
          <Textarea
            id="productDescription"
            v-model="productDescription"
            placeholder="Camisa feita de 100% de algodão com gola V e detalhes nas costas."
            class="placeholder:text-[#959595] px-4 shadow-sm"
            rows="4"
          />
          <div class="h-2">
            <span v-if="errors?.description" class="text-red-500">{{ errors.description[0] }}</span>
          </div>
          <span>Promoção</span>
          <div class="flex items-center gap-x-3">
            <Checkbox v-model="checked" :binary="true" inputId="discountCheckbox" />
            <label for="discountCheckbox" class="text-[#505050]">Produto promocional?</label>
          </div>
          <transition name="fade">
            <div v-show="checked" class="space-y-3 lg:space-y-1">
              <Slider v-model="discountValue" class="w-full my-2" />
              <div class="flex flex-col lg:space-y-2">
                <span class="text-[#505050] mt-2">Desconto: {{ discountValue }}%</span>
                <div class="flex items-center gap-x-4">
                  <span class="text-[#505050]">Preço final com desconto: </span>
                  <span class="text-lg font-semibold tracking-wider">{{ finalPrice }}</span>
                </div>
              </div>
              <div class="h-2">
                <span v-if="errors?.discount" class="text-red-500">{{ errors.discount[0] }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="flex justify-between w-full mt-4">
        <RouterLink activeClass="font-semibold" to="/products">
          <Button plain text class="gap-x-3">
            <ArrowRightIcon class="rotate-180" />
            Voltar
          </Button>
        </RouterLink>
        <Button plain text class="gap-x-3" @click="goToImageStep">
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
        <h2 class="hidden text-2xl lg:block">2. Imagens do produto</h2>
        <span class="before:content-['*'] before:text-red-500 before:mr-2"
          >Obrigatório no mínimo 1 imagem.</span
        >
      </div>
      <div class="flex items-center justify-between w-40">
        <h3>Total de imagens:</h3>
        <span class="text-xl font-semibold">{{ productImages.length }}</span>
      </div>
      <div class="space-y-4 lg:flex lg:gap-x-4 lg:max-w-full lg:overflow-x-auto lg:space-y-0">
        <div
          v-for="(file, index) in productImages"
          :key="index"
          class="relative border rounded-md shadow h-72 lg:w-60 lg:mb-2"
          id="gallery-items"
        >
          <div class="w-full h-full lg:w-60">
            <div
              class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/35 to-transparent"
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
                class="object-cover object-top w-full h-full rounded-md"
              />
            </a>
            <span class="absolute bottom-0 p-3 text-white">{{ file.name }}</span>
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
          class="flex flex-col items-center justify-center space-y-2 border rounded-lg shadow-lg cursor-pointer h-72 min-w-60"
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
      <div class="h-4">
        <span class="text-red-500" v-if="errors?.files">{{ errors?.files[0] }}</span>
      </div>
      <div class="flex justify-between w-full">
        <Button plain text class="gap-x-3" @click="step--">
          <ArrowRightIcon class="rotate-180" />
          Informações
        </Button>
        <Button plain text class="gap-x-3" @click="goToReviewStep">
          Revisão
          <ArrowRightIcon class="" />
        </Button>
      </div>
    </div>
    <div class="mt-10 lg:mt-0 lg:w-[80%] lg:px-16" id="review-gallery" v-show="step === 3">
      <h2 class="hidden text-2xl lg:block lg:mb-6">3. Revisão do produto</h2>
      <div class="lg:flex">
        <div class="swiper w-80">
          <div class="swiper-wrapper w-96">
            <div
              v-for="image in productImages"
              :key="image.preview"
              class="flex items-center swiper-slide"
            >
              <a :href="image.preview" data-pswp-width="500" data-pswp-height="657">
                <img
                  :src="image.preview"
                  alt="preview-produto"
                  class="object-cover object-top w-full border rounded-lg shadow-md h-96"
                />
              </a>
            </div>
          </div>
          <div class="swiper-button-next">
            <Button
              class="min-w-[2.5rem] mb-8"
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
              class="min-w-[2.5rem] mb-8"
              icon="pi pi-chevron-left"
              iconPos="right"
              plain
              text
            >
            </Button>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="space-y-5 mt-8 lg:mt-0 lg:w-[65%] lg:px-6 px-2">
          <h3 class="text-lg font-semibold">{{ productName }}</h3>
          <p class="text-lg text-[#505050]">
            {{ productDescription }}
          </p>
          <div class="space-x-3">
            <span class="border shadow-md px-2 py-1 bg-[#F8F8F8] rounded">{{
              selectedCategory.name
            }}</span>
            <span class="border shadow-md px-2 py-1 bg-[#F8F8F8] rounded">{{
              selectedSubcategory.name
            }}</span>
            <span class="border shadow-md px-2 py-1 bg-[#F8F8F8] rounded"
              >{{ quantity }} unidades</span
            >
          </div>
          <div class="flex">
            <div v-for="attribute in selectedAttribute" :key="attribute">
              <div v-if="attribute" class="mr-3">
                <span class="border shadow-md px-2 py-1 bg-[#F8F8F8] rounded">{{
                  attribute.name
                }}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-8">
            <div class="flex items-center space-x-1.5">
              <ProductPriceIcon />
              <span class="mt-1 text-lg font-semibold">{{ amount }}</span>
            </div>
            <div class="flex items-center space-x-1.5" v-show="finalPrice">
              <ProductDiscountIcon />
              <span class="text-lg font-semibold mt-0.5">{{ discountValue }}%</span>
            </div>
          </div>
          <div
            class="border shadow-md bg-[#fafafa] py-2 px-5 w-fit h-10 flex items-center justify-center rounded"
            v-if="finalPrice"
          >
            <span class="text-lg">Preço final: R$ {{ finalPrice }}</span>
          </div>
          <div
            class="border shadow-md bg-[#fafafa] py-2 px-5 w-52 h-10 flex items-center justify-center rounded"
            v-else
          >
            <span class="text-lg">Preço final: {{ amount }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-between w-full mt-8">
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
          @click="saveProduct"
        >
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
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
import ProductPriceIcon from '@/components/icons/ProductPriceIcon.vue'
import ProductDiscountIcon from '@/components/icons/ProductDiscountIcon.vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const discountValue = ref(0)
const checked = ref(false)
const selectedCategory = ref('')
const step = ref(1)
const selectedSubcategory = ref('')
const uploadImages = ref()
const productImages = ref([])
const amount = ref(0)
const quantity = ref('')
const productDescription = ref()
const categories = ref([])
const subcategories = ref([])
const attributes = ref([])
const selectedAttribute = ref([])
const productName = ref('')
let errors = ref({})
const toast = useToast()
const router = useRouter()

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Produto criado com sucesso!',
    life: 3000
  })
}

const goToReviewStep = () => {
  const form = new FormData()
  productImages.value.forEach((image) => {
    form.append('files[]', image.file)
  })
  axios
    .post(`${import.meta.env.VITE_ROOT_API}/products/validate-images`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      step.value++
    })
    .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
      setTimeout(() => {
        errors.value = ''
      }, 1000)
    })
}
const goToImageStep = () => {
  const mapAttributes = attributes.value.map((attribute) => ({
    id: attribute.id,
    name: attribute.name
  }))
  const form = new FormData()
  form.append('name', productName.value)
  form.append('category', selectedCategory.value ? JSON.stringify(selectedCategory.value) : '')
  form.append(
    'subcategory',
    selectedSubcategory.value ? JSON.stringify(selectedSubcategory.value) : ''
  )
  form.append('description', productDescription.value ?? '')
  form.append('quantity', quantity.value)
  console.log(quantity.value)
  form.append('attributes', mapAttributes.length >= 1 ? JSON.stringify(mapAttributes) : '')
  form.append(
    'attributeOptions',
    selectedAttribute.value.length >= 1 ? JSON.stringify(selectedAttribute.value) : ''
  )
  if (checked.value) {
    form.append('finalPrice', parseFloat(finalPrice.value) > 0 ? finalPrice.value : '')
    form.append('discount', discountValue.value)
  } else {
    form.append('amount', amount.value > 0 ? amount.value : '')
  }
  axios
    .post(`${import.meta.env.VITE_ROOT_API}/products/validate-info`, form)
    .then((response) => {
      step.value++
    })
    .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
      setTimeout(() => {
        errors.value = ''
      }, 4000)
    })
}

const saveProduct = () => {
  const mapAttributes = attributes.value.map((attribute) => ({
    id: attribute.id,
    name: attribute.name
  }))
  const form = new FormData()
  form.append('name', productName.value)
  form.append('category', selectedCategory.value ? JSON.stringify(selectedCategory.value) : '')
  form.append(
    'subcategory',
    selectedSubcategory.value ? JSON.stringify(selectedSubcategory.value) : ''
  )
  form.append('description', productDescription.value ?? '')
  form.append('quantity', quantity.value)
  form.append('attributes', mapAttributes.length >= 1 ? JSON.stringify(mapAttributes) : '')
  form.append(
    'attributeOptions',
    selectedAttribute.value.length >= 1 ? JSON.stringify(selectedAttribute.value) : ''
  )
  if (checked.value) {
    form.append('finalPrice', parseFloat(finalPrice.value) > 0 ? finalPrice.value : '')
    form.append('discount', discountValue.value)
  } else {
    form.append('amount', amount.value > 0 ? amount.value : '')
  }
  productImages.value.forEach((image) => {
    form.append('files[]', image.file)
  })
  axios
    .post(`${import.meta.env.VITE_ROOT_API}/products`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      showSuccess()
      router.push({ path: '/products' })
    })
    .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
      setTimeout(() => {
        errors.value = ''
      }, 1000)
    })
}

const finalPrice = computed(() => {
  if (checked.value) {
    const discount = (amount.value * discountValue.value) / 100
    return `${(amount.value - discount).toFixed(2)}`
  }
  return null
})

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
    }
  })

  axios
    .get(`${import.meta.env.VITE_ROOT_API}/products/categories`)
    .then((res) => {
      const response = res.data.categories
      const parentCategories = response.filter((category) => category.parent_id === null)
      const categoryArray = parentCategories.map((category) => ({
        name: category.name,
        code: category.id
      }))
      categories.value = categoryArray
    })
    .catch((error) => {
      console.log(error)
    })
})

const loadSubcategories = () => {
  axios
    .get(`${import.meta.env.VITE_ROOT_API}/products/categories`)
    .then((res) => {
      const response = res.data.categories
      const children = response.filter(
        (category) => category.parent_id === selectedCategory.value.code
      )
      const subcategoryArray = children.map((child) => ({
        name: child.name,
        code: child.id
      }))
      subcategories.value = subcategoryArray
    })
    .catch((error) => {
      console.log(error)
    })
}

const loadAttributes = () => {
  axios
    .get(`${import.meta.env.VITE_ROOT_API}/products/attributes/${selectedSubcategory.value.code}`)
    .then((res) => {
      const response = res.data
      attributes.value = response.attributes.map((attribute) => {
        return {
          ...attribute,
          options: attribute.attribute_options.map((option) => ({
            name: option.value,
            code: option.id
          }))
        }
      })
    })
}

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
          // Object.values(files).forEach((index, file) => {
          //   console.log(index[file])

          //   if (file === selectedImage.file) {
          //     // erase file
          //     // delete file[index]
          //     console.log(file[index])
          //   }
          // })
          selectedImage = null
        }
      }
      const swiper = new Swiper('.swiper', {
        modules: [Pagination, Navigation],
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
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
        preview: URL.createObjectURL(file),
        file: file
      }
      updateFile = null
      return
    }
  }
  Object.values(files).forEach((element) => {
    productImages.value.push({
      name: element.name,
      preview: URL.createObjectURL(element),
      file: element
    })
    const swiper = new Swiper('.swiper', {
      modules: [Pagination, Navigation],
      direction: 'horizontal',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.swiper-pagination-bullet-active {
  background-color: #ffffff !important;
  border-width: 1px;
  border-style: solid;
  border-color: #a7a7a7 !important;
}

.swiper-pagination-bullet {
  background-color: #a7a7a7 !important;
  margin-left: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: #a7a7a7 !important;
}

.swiper-button-prev {
  color: black;
  margin-top: 6px;
}

.swiper-button-next {
  color: black;
  margin-top: 6px;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  content: '';
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
