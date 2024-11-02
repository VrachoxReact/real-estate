<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[600px] flex items-center justify-center">
      <div class="absolute inset-0 overflow-hidden">
        <!-- Blur hash placeholder -->
        <img
          :src="heroBlurHash"
          alt=""
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          :class="{ 'opacity-0': heroImageLoaded }"
        />
        <!-- Main hero image -->
        <img
          :src="optimizedHeroImage"
          alt="Luxury Home"
          class="w-full h-full object-cover transition-opacity duration-300"
          :class="{ 'opacity-0': !heroImageLoaded }"
          @load="handleHeroImageLoad"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"
        ></div>
      </div>
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Find Your Perfect Home
        </h1>
        <p class="text-xl mb-8">
          Discover the finest properties in prime locations
        </p>
        <PropertySearch
          @search="handleSearch"
          class="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl"
        />
      </div>
    </section>

    <!-- Featured Properties Section -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Featured Properties</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Explore our hand-picked selection of premium properties
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Properties Grid -->
      <div
        v-else-if="featuredProperties.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <PropertyCard
          v-for="property in featuredProperties"
          :key="property.id"
          :property="property"
        />
      </div>

      <!-- No Properties State -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500">No properties available at the moment.</p>
      </div>
    </section>

    <!-- Market Insights Section -->
    <section class="py-16 max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">
        Latest Market Insights
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="insight in marketInsights"
          :key="insight.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            :src="insight.image"
            :alt="insight.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ insight.title }}</h3>
            <p class="text-gray-600 mb-4">{{ insight.excerpt }}</p>
            <router-link
              :to="insight.link"
              class="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Read More
              <ArrowRightIcon class="w-4 h-4 ml-1" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import { usePropertyStore } from "@/stores/propertyStore";
import PropertyCard from "@/components/PropertyCard.vue";
import PropertySearch from "@/components/PropertySearch.vue";
import { optimizeImage, generateBlurHash } from "@/utils/imageOptimizer";

const propertyStore = usePropertyStore();
const loading = ref(true);

// Get featured properties
const featuredProperties = computed(() => {
  return propertyStore.properties.filter((property) => property.featured);
});

onMounted(async () => {
  if (propertyStore.properties.length === 0) {
    await propertyStore.fetchProperties();
  }
  loading.value = false;
});

const marketInsights = ref([
  {
    id: 1,
    title: "2024 Real Estate Market Trends",
    excerpt:
      "Discover the latest trends shaping the real estate market in 2024.",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5",
    link: "/blog/market-trends-2024",
  },
  {
    id: 2,
    title: "Investment Opportunities",
    excerpt: "Learn about the best investment opportunities in today's market.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    link: "/blog/investment-opportunities",
  },
  {
    id: 3,
    title: "Home Buying Guide",
    excerpt: "Everything you need to know about buying your dream home.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    link: "/blog/home-buying-guide",
  },
]);

const handleSearch = (searchParams) => {
  // Implement search logic
  console.log("Search params:", searchParams);
};

const heroImageLoaded = ref(false);

const heroImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

const optimizedHeroImage = computed(() => {
  return optimizeImage(heroImage, {
    width: 1920,
    quality: 85,
    format: "webp",
  });
});

const heroBlurHash = computed(() => {
  return generateBlurHash(heroImage);
});

const handleHeroImageLoad = () => {
  heroImageLoaded.value = true;
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
