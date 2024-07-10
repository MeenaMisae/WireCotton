<template>
  <div>
    <Toast />
    <div class="card">
      <Toolbar class="mb-6">
        <template #start>
          <RouterLink to="/products/create">
            <Button label="Novo" icon="pi pi-plus" class="mr-2" @click="openNew" />
          </RouterLink>
          <Button
            label="Excluir"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
        </template>

        <template #end>
          <InputText v-model="filters['global'].value" placeholder="Pesquisar..." />
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            class="mr-2"
            auto
          />
          <Button label="Exportar" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedProducts"
        :value="products"
        dataKey=""
        :paginator="true"
        :rows="4"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Mostrando {first} de {last} do total de {totalRecords} produtos"
      >
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="code" header="SKU" sortable style="min-width: 12rem"></Column>
        <Column field="name" header="Nome" sortable style="min-width: 12rem"> </Column>
        <Column header="Imagem" style="min-width: 12rem">
          <template #body="slotProps">
            <img
              :src="slotProps.data.images[0]"
              :alt="slotProps.data.image"
              class="rounded"
              style="width: 64px"
            />
          </template>
        </Column>
        <Column field="price" header="Preço" sortable style="min-width: 12rem">
          <template #body="slotProps"> R$ {{ formatCurrency(slotProps.data.price) }} </template>
        </Column>
        <Column field="category" header="Categoria" sortable style="min-width: 12rem"></Column>
        <Column field="quantity" header="Quantidade" sortable style="min-width: 12rem">
          <template #body="slotProps">
            {{ slotProps.data.quantity }}
          </template>
        </Column>
        <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.inventoryStatus"
              :severity="getStatusLabel(slotProps.data.inventoryStatus)"
            />
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 11rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-5"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
    >
      <div class="flex flex-col gap-6">
        <img
          v-if="product.image"
          :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
          :alt="product.image"
          class="block pb-4 m-auto"
        />
        <div>
          <label for="name" class="block mb-3 font-bold">Name</label>
          <InputText
            id="name"
            v-model.trim="product.name"
            required="true"
            autofocus
            :invalid="submitted && !product.name"
            fluid
          />
          <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
        </div>
        <div>
          <label for="description" class="block mb-3 font-bold">Description</label>
          <Textarea
            id="description"
            v-model="product.description"
            required="true"
            rows="3"
            cols="20"
            fluid
          />
        </div>
        <div>
          <label for="inventoryStatus" class="block mb-3 font-bold">Inventory Status</label>
          <Select
            id="inventoryStatus"
            v-model="product.inventoryStatus"
            :options="statuses"
            optionLabel="label"
            placeholder="Select a Status"
            fluid
          ></Select>
        </div>

        <div>
          <span class="block mb-4 font-bold">Category</span>
          <div class="grid grid-cols-12 gap-4">
            <div class="flex items-center col-span-6 gap-2">
              <RadioButton
                id="category1"
                v-model="product.category"
                name="category"
                value="Accessories"
              />
              <label for="category1">Accessories</label>
            </div>
            <div class="flex items-center col-span-6 gap-2">
              <RadioButton
                id="category2"
                v-model="product.category"
                name="category"
                value="Clothing"
              />
              <label for="category2">Clothing</label>
            </div>
            <div class="flex items-center col-span-6 gap-2">
              <RadioButton
                id="category3"
                v-model="product.category"
                name="category"
                value="Electronics"
              />
              <label for="category3">Electronics</label>
            </div>
            <div class="flex items-center col-span-6 gap-2">
              <RadioButton
                id="category4"
                v-model="product.category"
                name="category"
                value="Fitness"
              />
              <label for="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6">
            <label for="price" class="block mb-3 font-bold">Price</label>
            <InputNumber
              id="price"
              v-model="product.price"
              mode="currency"
              currency="USD"
              locale="en-US"
              fluid
            />
          </div>
          <div class="col-span-6">
            <label for="quantity" class="block mb-3 font-bold">Quantity</label>
            <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="product"
          >Você tem certeza que quer excluir o produto <b>{{ product.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button label="Não" icon="pi pi-times" text @click="deleteProductDialog = false" />
        <Button label="Sim" icon="pi pi-check" @click="deleteProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="product">Are you sure you want to delete the selected products?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Tag from 'primevue/tag'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import axios from 'axios'
import Toast from 'primevue/toast'

onMounted(() => {
  axios
    .get(`${import.meta.env.VITE_ROOT_API}/products`)
    .then((response) => {
      products.value = response.data
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

const toast = useToast()
const dt = ref()
const products = ref()
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const submitted = ref(false)
const statuses = ref([
  { label: 'EM ESTOQUE', value: 'instock' },
  { label: 'BAIXO ESTOQUE', value: 'lowstock' },
  { label: 'FORA DE ESTOQUE', value: 'outofstock' }
])

const formatCurrency = (value) => {
  if (value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }
  return ''
}
const openNew = () => {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}
const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}
const saveProduct = () => {
  submitted.value = true

  if (product?.value.name?.trim()) {
    if (product.value.id) {
      product.value.inventoryStatus = product.value.inventoryStatus.value
        ? product.value.inventoryStatus.value
        : product.value.inventoryStatus
      products.value[findIndexById(product.value.id)] = product.value
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Updated',
        life: 3000
      })
    } else {
      product.value.id = createId()
      product.value.code = createId()
      product.value.image = 'product-placeholder.svg'
      product.value.inventoryStatus = product.value.inventoryStatus
        ? product.value.inventoryStatus.value
        : 'INSTOCK'
      products.value.push(product.value)
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Created',
        life: 3000
      })
    }

    productDialog.value = false
    product.value = {}
  }
}
const editProduct = (prod) => {
  product.value = { ...prod }
  productDialog.value = true
}
const confirmDeleteProduct = (prod) => {
  product.value = prod
  deleteProductDialog.value = true
}
const deleteProduct = () => {
  products.value = products.value.filter((val) => val.id !== product.value.id)
  deleteProductDialog.value = false
  axios
    .delete(`${import.meta.env.VITE_ROOT_API}/products/${product.value.id}`)
    .then((response) => {
      console.log(response)
      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Produto apagado',
        life: 3000
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }

  return index
}
const createId = () => {
  let id = ''
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}
const exportCSV = () => {
  dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = () => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val))
  deleteProductsDialog.value = false
  selectedProducts.value = null
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'EM ESTOQUE':
      return 'success'

    case 'BAIXO ESTOQUE':
      return 'warn'

    case 'FORA DE ESTOQUE':
      return 'danger'

    default:
      return null
  }
}
</script>
