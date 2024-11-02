<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Price Range -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"
          >Price Range</label
        >
        <select v-model="filters.priceRange" class="input-field">
          <option value="">Any Price</option>
          <option value="0-250000">Under $250,000</option>
          <option value="250000-500000">$250,000 - $500,000</option>
          <option value="500000-750000">$500,000 - $750,000</option>
          <option value="750000-1000000">$750,000 - $1,000,000</option>
          <option value="1000000+">$1,000,000+</option>
        </select>
      </div>

      <!-- Property Type -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700"
          >Property Type</label
        >
        <select v-model="filters.propertyType" class="input-field">
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>

      <!-- Bedrooms -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Bedrooms</label>
        <select v-model="filters.bedrooms" class="input-field">
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      <!-- Search Button -->
      <div class="flex items-end">
        <button
          @click="applyFilters"
          class="btn-primary w-full flex items-center justify-center"
        >
          <MagnifyingGlassIcon class="w-5 h-5 mr-2" />
          Search Properties
        </button>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="hasActiveFilters" class="mt-6 flex flex-wrap gap-2">
      <div
        v-for="(value, key) in activeFilters"
        :key="key"
        class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center"
      >
        {{ formatFilterLabel(key, value) }}
        <button @click="removeFilter(key)" class="ml-2 hover:text-blue-900">
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDebounce } from "@vueuse/core";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const filters = ref({
  priceRange: "",
  propertyType: "",
  bedrooms: "",
});

// Debounce filter changes
const debouncedFilters = useDebounce(filters, 300);

// Memoize computed properties
const memoizedActiveFilters = computed(() => {
  return Object.entries(debouncedFilters.value).filter(
    ([_, value]) => value !== ""
  );
});

const hasActiveFilters = computed(() => {
  return memoizedActiveFilters.value.length > 0;
});

const formatFilterLabel = (key, value) => {
  switch (key) {
    case "priceRange":
      return `Price Range: ${value}`;
    case "propertyType":
      return `Property Type: ${value}`;
    case "bedrooms":
      return `Bedrooms: ${value}`;
    default:
      return "";
  }
};

const applyFilters = () => {
  // Implement your filters logic here
};

const removeFilter = (key) => {
  filters.value[key] = "";
};
</script>
