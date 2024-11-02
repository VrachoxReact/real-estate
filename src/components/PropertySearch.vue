<template>
  <div class="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6">
    <div class="space-y-6">
      <!-- Main Search Bar -->
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by location, property type, or keywords..."
          class="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          @focus="showAdvancedSearch = true"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Advanced Search Panel -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <div v-if="showAdvancedSearch" class="space-y-6">
          <!-- Property Type & Price Range -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Property Type</label
              >
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="type in propertyTypes"
                  :key="type"
                  @click="togglePropertyType(type)"
                  class="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                  :class="[
                    filters.types.includes(type)
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
                    'border',
                  ]"
                >
                  {{ type }}
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Price Range</label
              >
              <div class="flex items-center space-x-4">
                <div class="relative flex-1">
                  <span
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >$</span
                  >
                  <input
                    type="number"
                    v-model="filters.minPrice"
                    placeholder="Min"
                    class="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <span class="text-gray-400">-</span>
                <div class="relative flex-1">
                  <span
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >$</span
                  >
                  <input
                    type="number"
                    v-model="filters.maxPrice"
                    placeholder="Max"
                    class="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Features</label
            >
            <div class="flex flex-wrap gap-2">
              <label
                v-for="feature in features"
                :key="feature"
                class="relative inline-flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  :value="feature"
                  v-model="filters.features"
                  class="hidden"
                />
                <span
                  class="px-4 py-2 rounded-lg text-sm border transition-all duration-200"
                  :class="[
                    filters.features.includes(feature)
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
                  ]"
                >
                  {{ feature }}
                </span>
              </label>
            </div>
          </div>

          <!-- Bedrooms & Bathrooms -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Bedrooms</label
              >
              <select
                v-model="filters.bedrooms"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option v-for="n in 5" :key="n" :value="n">
                  {{ n }}+ beds
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Bathrooms</label
              >
              <select
                v-model="filters.bathrooms"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option v-for="n in 4" :key="n" :value="n">
                  {{ n }}+ baths
                </option>
              </select>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-4 border-t">
            <button
              @click="resetFilters"
              class="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Reset Filters
            </button>
            <div class="space-x-3">
              <button
                @click="showAdvancedSearch = false"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                @click="performSearch"
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium"
              >
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["search"]);
const showAdvancedSearch = ref(false);
const searchQuery = ref("");

const propertyTypes = ["House", "Apartment", "Condo", "Villa", "Townhouse"];
const features = ["Parking", "Pool", "Garden", "Gym", "Security", "Elevator"];

const filters = ref({
  types: [],
  minPrice: "",
  maxPrice: "",
  features: [],
  bedrooms: "",
  bathrooms: "",
});

const togglePropertyType = (type) => {
  const index = filters.value.types.indexOf(type);
  if (index === -1) {
    filters.value.types.push(type);
  } else {
    filters.value.types.splice(index, 1);
  }
};

const resetFilters = () => {
  filters.value = {
    types: [],
    minPrice: "",
    maxPrice: "",
    features: [],
    bedrooms: "",
    bathrooms: "",
  };
  searchQuery.value = "";
};

const performSearch = () => {
  emit("search", {
    query: searchQuery.value,
    filters: filters.value,
  });
  showAdvancedSearch.value = false;
};

// Debounced search
let timeout;
watch(
  [searchQuery, filters],
  () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      emit("search", {
        query: searchQuery.value,
        filters: filters.value,
      });
    }, 500);
  },
  { deep: true }
);

// Close advanced search when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".search-container")) {
    showAdvancedSearch.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.search-container {
  position: relative;
}

/* Add any additional component-specific styles here */
</style>
