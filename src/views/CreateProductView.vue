<template>
  <div class="mt-5 lg:flex">
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
    <div class="mt-10 lg:mt-0 lg:ml-16" v-show="step === 1">
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
    <div class="mt-7 lg:mt-0 lg:ml-16 space-y-4" v-show="step === 2">
      <div class="flex justify-between">
        <h2 class="text-2xl hidden lg:block">2. Imagens do produto</h2>
        <span class="before:content-['*'] before:text-red-500 before:mr-2"
          >Obrigatório no mínimo 1 imagem.</span
        >
      </div>
      <div class="flex w-40 justify-between items-center">
        <h3>Total de imagens:</h3>
        <span class="text-xl font-semibold">{{ productImages.length }}</span>
      </div>
      <div
        v-for="(file, index) in productImages"
        :key="index"
        class="h-72 shadow border relative rounded-md"
      >
        <div class="h-full w-full">
          <div class="h-full w-full bg-gradient-to-t from-black/10 to-transparent absolute"></div>
          <img
            :src="file.image.preview"
            alt="preview-produto"
            class="object-cover h-full w-full object-top rounded-md"
          />
          <span class="absolute bottom-0 text-white p-3">{{ file.image.name }}</span>
          <span class="absolute bottom-0 right-0 p-3"
            ><svg
              width="29"
              height="19"
              viewBox="0 0 29 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.4451 10.4141C20.8346 10.4141 21.1504 10.0983 21.1504 9.70876C21.1504 9.31921 20.8346 9.00342 20.4451 9.00342C20.0555 9.00342 19.7397 9.31921 19.7397 9.70876C19.7397 10.0983 20.0555 10.4141 20.4451 10.4141Z"
                stroke="#FCFEFE"
                stroke-width="1.69283"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.4451 5.47661C20.8346 5.47661 21.1504 5.16082 21.1504 4.77126C21.1504 4.38171 20.8346 4.06592 20.4451 4.06592C20.0555 4.06592 19.7397 4.38171 19.7397 4.77126C19.7397 5.16082 20.0555 5.47661 20.4451 5.47661Z"
                stroke="#FCFEFE"
                stroke-width="1.69283"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.4451 15.3516C20.8346 15.3516 21.1504 15.0358 21.1504 14.6463C21.1504 14.2567 20.8346 13.9409 20.4451 13.9409C20.0555 13.9409 19.7397 14.2567 19.7397 14.6463C19.7397 15.0358 20.0555 15.3516 20.4451 15.3516Z"
                stroke="#FCFEFE"
                stroke-width="1.69283"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <label
        for="uploadImages"
        class="border shadow-md flex justify-center items-center flex-col space-y-2 h-64 cursor-pointer"
      >
        <CloudUploadIcon />
        <span class="text-[#626262]">Adicionar imagem</span>
      </label>
      <input
        id="uploadImages"
        type="file"
        @change="previewImages"
        hidden
        multiple
        accept="image/*"
      />
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
    <div class="mt-10 lg:mt-0 lg:ml-14" v-show="step === 3">
      <span class="before:content-['*'] before:text-red-500 before:mr-2"
        >Todos os itens são obrigatórios</span
      >
      <div class="mt-7 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2">
        <div class="flex flex-col gap-y-3 lg:gap-0">
          <label for="">Nome do produto</label>
          <input
            type="text"
            class="border rounded h-12 px-5 placeholder:text-[#959595] product-name shadow-sm"
            placeholder="Camisa gola V"
          />
        </div>
        <div class="flex flex-col gap-y-3 lg:gap-0">
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
        <div class="flex flex-col gap-y-3 lg:gap-0 lg:col-start-2">
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
          <div class="flex flex-col gap-y-3 w-[50%] lg:gap-0">
            <label for="amount">Preço</label>
            <InputCurrency />
          </div>
          <div class="flex flex-col gap-y-3 w-[50%] lg:gap-0">
            <label for="quantity">Quantidade</label>
            <InputQuantity />
          </div>
        </div>
        <div class="flex flex-col gap-y-3 lg:gap-0">
          <span>Promoção</span>
          <div class="flex items-center gap-x-3">
            <Checkbox v-model="checked" :binary="true" inputId="discountCheckbox" />
            <label for="discountCheckbox" class="text-[#505050]">Produto promocional?</label>
          </div>
          <transition name="fade">
            <div v-show="checked" class="space-y-3">
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
        <div class="flex flex-col gap-y-3 lg:gap-0">
          <label for="productDescription">Descrição</label>
          <Textarea
            id="productDescription"
            placeholder="Camisa feita de 100% de algodão com gola V e detalhes nas costas."
            class="placeholder:text-[#959595] px-4 shadow-sm"
            rows="4"
          />
        </div>
        <div class="w-full flex justify-between">
          <Button plain text class="gap-x-3" @click="step--">
            <ArrowRightIcon class="rotate-180" />
            Imagens
          </Button>
          <Button plain text class="gap-x-3">
            Criar Produto
            <ArrowRightIcon class="" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const discountValue = ref(25)
const checked = ref(false)
const selectedCategory = ref()
const step = ref(2)
const selectedSubcategory = ref(1)

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

const productImages = ref([])
function previewImages(e) {
  let files = e.target.files
  Object.values(files).forEach((element) => {
    productImages.value.push({
      image: { name: element.name, preview: URL.createObjectURL(element) }
    })
  })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>
