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
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Camisa"
              checkmark
              :highlightOnSelect="false"
              class="w-full md:w-14rem h-12 items-center product-sub-category-dropdown"
            />
          </div>
        </div>
        <div class="flex gap-x-5">
          <div class="flex flex-col gap-y-3">
            <label>Preço</label>
            <InputNumber
              v-model="value1"
              inputId="stacked-buttons"
              showButtons
              mode="currency"
              currency="BRL"
              class="product-price"
            />
          </div>
          <div class="flex flex-col gap-y-3">
            <label for="minmax-buttons">Quantidade</label>
            <InputNumber
              v-model.number="value2"
              inputId="minmax-buttons"
              mode="decimal"
              showButtons
              :min="0"
              :max="100"
              class="h-12 product-quantity"
            />
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <span>Promoção</span>
          <div class="flex items-center gap-x-3">
            <Checkbox v-model="checked" :binary="true" />
            <label for="">Produto promocional?</label>
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
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'

const checked = ref(false)
const selectedCategory = ref()
const value1 = ref(0)
const value2 = ref(25)
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

.product-price > .p-inputnumber-input {
  width: 50%;
}

.product-quantity > .p-inputnumber-input {
  width: 50%;
}
</style>
