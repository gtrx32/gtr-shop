<template>
  <div class="max-w-7xl mx-auto px-6 py-8 space-y-8">

    <!-- FILTERS -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 bg-white p-5 rounded-2xl border shadow-sm">

      <input
          v-model="filters.name"
          placeholder="Поиск по названию"
          class="px-4 py-2 border rounded-xl"
      />

      <input
          v-model.number="filters.price_min"
          type="number"
          placeholder="Цена от"
          class="px-4 py-2 border rounded-xl"
      />

      <input
          v-model.number="filters.price_max"
          type="number"
          placeholder="Цена до"
          class="px-4 py-2 border rounded-xl"
      />

      <select v-model="filters.sort" class="px-4 py-2 border rounded-xl">
        <option value="id">По умолчанию</option>
        <option value="price">Цена</option>
        <option value="rating">Рейтинг</option>
      </select>

      <select v-model="filters.order" class="px-4 py-2 border rounded-xl">
        <option value="desc">По убыванию</option>
        <option value="asc">По возрастанию</option>
      </select>

      <label class="flex items-center gap-2 col-span-full">
        <input type="checkbox" v-model="filters.in_stock" />
        Только в наличии
      </label>
    </div>

    <!-- GRID -->
    <div
        v-if="pending"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
          v-for="i in 9"
          :key="i"
          class="h-96 rounded-2xl bg-neutral-100 animate-pulse"
      />
    </div>

    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
          v-for="p in products"
          :key="p.id"
          class="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition"
      >
        <!-- IMAGE -->
        <div class="relative aspect-square bg-neutral-100 overflow-hidden">
          <img
              v-if="p.image"
              :src="p.image"
              class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div
              v-if="p.stock === 0"
              class="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold"
          >
            Нет в наличии
          </div>
        </div>

        <!-- BODY -->
        <div class="p-4 space-y-3">
          <div class="font-semibold text-lg line-clamp-2">
            {{ p.name }}
          </div>

          <div class="text-sm text-neutral-500 line-clamp-2">
            {{ p.description }}
          </div>

          <div class="flex justify-between items-center">
            <div class="text-xl font-bold">
              {{ p.price.toLocaleString() }} ₽
            </div>

            <div v-if="p.rating" class="text-amber-500 text-sm">
              ⭐ {{ p.rating.toFixed(1) }}
              <span class="text-neutral-400">
                ({{ p.reviews_count ?? 0 }})
              </span>
            </div>
          </div>

          <button
              class="w-full mt-2 py-2 rounded-xl font-medium transition
              bg-black text-white hover:bg-neutral-800
              disabled:bg-neutral-300"
              :disabled="p.stock === 0"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- PAGINATION -->
    <div
        v-if="meta"
        class="flex justify-center gap-2 flex-wrap pt-6"
    >
      <button
          v-for="p in pages"
          :key="p"
          @click="page = p"
          class="px-4 py-2 rounded-lg border transition"
          :class="p === meta.current_page
          ? 'bg-black text-white'
          : 'hover:bg-neutral-100'"
      >
        {{ p }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import type { ApiPaginatedResponse } from '~/types/api'

const { apiFetch } = useApi()

const page = ref(1)
const perPage = 9

const filters = reactive({
  name: '',
  price_min: undefined as number | undefined,
  price_max: undefined as number | undefined,
  in_stock: false,
  sort: 'id',
  order: 'desc',
})

const { data, pending } =
    await useAsyncData<ApiPaginatedResponse<Product>>(
        () => `products-${page.value}-${JSON.stringify(filters)}`,
        () =>
            apiFetch('/api/products', {
              query: {
                ...filters,
                page: page.value,
                per_page: perPage,
              },
            }),
        { watch: [page, filters] }
    )

const products = computed(() => data.value?.data ?? [])
const meta = computed(() => data.value?.meta)

const pages = computed(() => {
  if (!meta.value) return []
  const start = Math.max(1, meta.value.current_page - 2)
  const end = Math.min(meta.value.last_page, start + 4)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>
