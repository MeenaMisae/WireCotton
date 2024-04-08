<template>
  <div class="flex justify-between py-4">
    <h3 class="text-2xl font-semibold">Pedidos em Aberto</h3>
    <div class="flex items-center">
      <p class="mr-2">ver todos</p>
      <ChevronLeft class="rotate-180" />
    </div>
  </div>
  <div class="shadow-md">
    <Accordion :activeIndex="0" class="font-questrial">
      <AccordionTab>
        <template #header>
          <div class="flex justify-between w-full px-2">
            <span>Pedido #8341</span>
            <div class="flex space-x-8">
              <span class="flex items-center gap-2">
                <ProductDateIcon />
                10/12
              </span>
              <span class="flex items-center gap-2">
                <ProductPriceIcon />
                160,00
              </span>
              <span class="mr-3">detalhes</span>
            </div>
          </div>
        </template>
        <div class="px-2">
          <div class="flex">
            <div class="w-full space-y-3 px-4">
              <p><span class="mr-3">3x</span> Camisa algodão preta</p>
              <p><span class="mr-3">1x</span> Calça moletom verde</p>
            </div>
            <div class="flex self-end justify-end w-full items-center space-x-3">
              <p class="font-semibold">pedido completo</p>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab>
        <template #header>
          <div class="flex justify-between w-full px-2">
            <span>Pedido #8341</span>
            <div class="flex space-x-8">
              <span class="flex items-center gap-2">
                <ProductDateIcon />
                10/12
              </span>
              <span class="flex items-center gap-2">
                <ProductPriceIcon />
                160,00
              </span>
              <span class="mr-3">detalhes</span>
            </div>
          </div>
        </template>
        <div class="px-2">
          <div class="flex">
            <div class="w-full space-y-3 px-4">
              <p><span class="mr-3">3x</span> Camisa algodão preta</p>
              <p><span class="mr-3">1x</span> Calça moletom verde</p>
            </div>
            <div class="flex self-end justify-end w-full items-center space-x-3">
              <p class="font-semibold">pedido completo</p>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab>
        <template #header>
          <div class="flex justify-between w-full px-2">
            <span>Pedido #8341</span>
            <div class="flex space-x-8">
              <span class="flex items-center gap-2">
                <ProductDateIcon />
                10/12
              </span>
              <span class="flex items-center gap-2">
                <ProductPriceIcon />
                160,00
              </span>
              <span class="mr-3">detalhes</span>
            </div>
          </div>
        </template>
        <div class="px-2">
          <div class="flex">
            <div class="w-full space-y-3 px-4">
              <p><span class="mr-3">3x</span> Camisa algodão preta</p>
              <p><span class="mr-3">1x</span> Calça moletom verde</p>
            </div>
            <div class="flex self-end justify-end w-full items-center space-x-3">
              <p class="font-semibold">pedido completo</p>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab>
        <template #header>
          <div class="flex justify-between w-full px-2">
            <span>Pedido #8341</span>
            <div class="flex space-x-8">
              <span class="flex items-center gap-2">
                <ProductDateIcon />
                10/12
              </span>
              <span class="flex items-center gap-2">
                <ProductPriceIcon />
                160,00
              </span>
              <span class="mr-3">detalhes</span>
            </div>
          </div>
        </template>
        <div class="px-2">
          <div class="flex">
            <div class="w-full space-y-3 px-4">
              <p><span class="mr-3">3x</span> Camisa algodão preta</p>
              <p><span class="mr-3">1x</span> Calça moletom verde</p>
            </div>
            <div class="flex self-end justify-end w-full items-center space-x-3">
              <p class="font-semibold">pedido completo</p>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab>
        <template #header>
          <div class="flex justify-between w-full px-2">
            <span>Pedido #8341</span>
            <div class="flex space-x-8">
              <span class="flex items-center gap-2">
                <ProductDateIcon />
                10/12
              </span>
              <span class="flex items-center gap-2">
                <ProductPriceIcon />
                160,00
              </span>
              <span class="mr-3">detalhes</span>
            </div>
          </div>
        </template>
        <div class="px-2">
          <div class="flex">
            <div class="w-full space-y-3 px-4">
              <p><span class="mr-3">3x</span> Camisa algodão preta</p>
              <p><span class="mr-3">1x</span> Calça moletom verde</p>
            </div>
            <div class="flex self-end justify-end w-full items-center space-x-3">
              <p class="font-semibold">pedido completo</p>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
    <hr />
    <div class="w-full justify-center flex items-center h-12">
      ver todos
      <ChevronLeft class="rotate-180 ml-2" />
    </div>
  </div>
</template>

<script setup>
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import ProductDateIcon from './icons/ProductDateIcon.vue'
import ProductPriceIcon from './icons/ProductPriceIcon.vue'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
</script>
