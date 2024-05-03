import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import OrdersView from '@/views/OrdersView.vue'
import ClientsView from '@/views/ClientsView.vue'
import CreateProductView from '@/views/CreateProductView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { breadcumb: [{ name: 'Início', link: '/' }] }
    },
    {
      path: '/products',
      component: ProductsView,
      meta: { breadcumb: [{ name: 'Início', link: '/' }, { name: 'Produtos' }] }
    },
    {
      path: '/products/create',
      component: CreateProductView,
      meta: {
        breadcumb: [
          { name: 'Início', link: '/' },
          { name: 'Produtos', link: '/products' },
          { name: 'Novo' }
        ]
      }
    },
    {
      path: '/categories',
      component: CategoriesView,
      meta: {
        breadcumb: [{ name: 'Início', link: '/' }, { name: 'Categorias' }]
      }
    },
    {
      path: '/orders',
      component: OrdersView,
      meta: {
        breadcumb: [{ name: 'Início', link: '/' }, { name: 'Pedidos' }]
      }
    },
    {
      path: '/clients',
      component: ClientsView,
      meta: {
        breadcumb: [{ name: 'Início', link: '/' }, { name: 'Clientes' }]
      }
    }
  ]
})

export default router
