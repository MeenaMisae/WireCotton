<template>
  <div class="mt-5">
    <div class="px-7 lg:px-0">
      <div class="grid grid-cols-5 lg:grid-cols-1 gap-x-4">
        <StepItem
          v-for="(item, index) in items"
          :key="item.label"
          :item="item.label"
          :index="index"
          :totalItems="items.length"
        />
      </div>
    </div>
    <div class="mt-10">
      <span class="before:content-['*'] before:text-red-500 before:mr-2"
        >Todos os itens são obrigatórios</span
      >
      <div class="mt-7 space-y-5">
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
        <div class="flex flex-col gap-y-3">
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
        <div class="flex gap-x-5">
          <div class="flex flex-col gap-y-3 w-[50%]">
            <label for="amount">Preço</label>
            <InputCurrency />
          </div>
          <div class="flex flex-col gap-y-3 w-[50%]">
            <label for="quantity">Quantidade</label>
            <InputQuantity />
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <span>Promoção</span>
          <div class="flex items-center gap-x-3">
            <Checkbox v-model="checked" :binary="true" />
            <label for="" class="text-[#505050]">Produto promocional?</label>
          </div>
          <div v-show="checked">
            <Slider v-model="discountValue" class="w-full" />
            <div class="flex flex-col">
              <span class="text-[#505050]">Desconto: {{ discountValue }}%</span>
              <div class="flex gap-x-4 items-center">
                <span class="text-[#505050]">Preço final com desconto: </span>
                <span class="font-semibold text-lg">a</span>
              </div>
            </div>
          </div>
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

const discountValue = ref(0)
const checked = ref(false)
const selectedCategory = ref()

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
</script>

<style>
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
