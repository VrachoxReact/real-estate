<template>
  <section class="max-w-7xl mx-auto p-4">
    <div class="mb-8">
      <h2 class="text-3xl font-bold mb-6">Our Properties</h2>
      <PropertySearch @search="handleSearch" />
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <!-- Filters Sidebar -->
      <div class="w-full md:w-64 space-y-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold mb-4">Sort By</h3>
          <select v-model="sortBy" class="w-full p-2 border rounded">
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold mb-4">Property Features</h3>
          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="features.parking"
                class="form-checkbox"
              />
              <span>Parking</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="features.pool"
                class="form-checkbox"
              />
              <span>Swimming Pool</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="features.garden"
                class="form-checkbox"
              />
              <span>Garden</span>
            </label>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold mb-4">Price Range</h3>
          <div class="space-y-2">
            <input
              type="number"
              v-model="priceRange.min"
              placeholder="Min Price"
              class="w-full p-2 border rounded"
            />
            <input
              type="number"
              v-model="priceRange.max"
              placeholder="Max Price"
              class="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <!-- Properties Grid -->
      <div class="flex-1">
        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
        </div>
        <div
          v-else-if="filteredProperties.length === 0"
          class="text-center py-8"
        >
          <p class="text-gray-500">
            No properties found matching your criteria.
          </p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <PropertyCard
            v-for="property in filteredProperties"
            :key="property.id"
            :property="property"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="px-4 py-2 rounded"
            :class="{
              'bg-blue-600 text-white': currentPage === page,
              'bg-gray-200 hover:bg-gray-300': currentPage !== page,
            }"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePropertyStore } from "@/stores/propertyStore";
import PropertySearch from "@/components/PropertySearch.vue";
import PropertyCard from "@/components/PropertyCard.vue";

const propertyStore = usePropertyStore();
const loading = ref(false);
const sortBy = ref("newest");
const currentPage = ref(1);
const itemsPerPage = 6;

const features = ref({
  parking: false,
  pool: false,
  garden: false,
});

const priceRange = ref({
  min: "",
  max: "",
});

const searchQuery = ref("");

// Get properties from the store
const filteredProperties = computed(() => {
  let result = [...propertyStore.properties];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (property) =>
        property.name.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.location.city.toLowerCase().includes(query)
    );
  }

  // Apply feature filters
  if (features.value.parking) {
    result = result.filter((p) => p.features.includes("parking"));
  }
  if (features.value.pool) {
    result = result.filter((p) => p.features.includes("pool"));
  }
  if (features.value.garden) {
    result = result.filter((p) => p.features.includes("garden"));
  }

  // Apply price range filter
  if (priceRange.value.min) {
    result = result.filter(
      (p) =>
        parseFloat(p.price.replace(/[^0-9.-]+/g, "")) >= priceRange.value.min
    );
  }
  if (priceRange.value.max) {
    result = result.filter(
      (p) =>
        parseFloat(p.price.replace(/[^0-9.-]+/g, "")) <= priceRange.value.max
    );
  }

  // Apply sorting
  switch (sortBy.value) {
    case "price-asc":
      result.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
          parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
      );
      break;
    case "price-desc":
      result.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
          parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
      );
      break;
    case "newest":
      result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
  }

  // Apply pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return result.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(propertyStore.properties.length / itemsPerPage);
});

const handleSearch = (searchData) => {
  searchQuery.value = searchData.query;
  currentPage.value = 1; // Reset to first page when searching
};

onMounted(() => {
  propertyStore.initializeFavorites();
});
</script>
