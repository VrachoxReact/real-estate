<template>
  <div
    class="group card overflow-hidden hover:scale-[1.02] transition-all duration-300"
  >
    <!-- Image Container -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <!-- Blur hash placeholder -->
      <img
        :src="blurHashUrl"
        alt=""
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        :class="{ 'opacity-0': imageLoaded }"
      />
      <!-- Main image -->
      <img
        :src="optimizedImageUrl"
        :alt="property.name"
        loading="lazy"
        decoding="async"
        class="relative w-full h-full object-cover transform transition-all duration-500"
        :class="{ 'scale-110': isHovered, 'opacity-0': !imageLoaded }"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ property.name }}</h3>
      <p class="text-gray-600 mb-4">{{ formatLocation(property.location) }}</p>

      <!-- Price -->
      <div class="text-2xl font-bold text-blue-600 mb-4">
        {{ formatPrice(property.price) }}
      </div>

      <!-- Property Details -->
      <div class="flex items-center justify-between text-gray-500">
        <div class="flex items-center">
          <span class="mr-2">{{ property.bedrooms }} beds</span>
          <span class="mr-2">{{ property.bathrooms }} baths</span>
          <span>{{ property.area }} m²</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { optimizeImage, generateBlurHash } from "@/utils/imageOptimizer";

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const imageLoaded = ref(false);
const isHovered = ref(false);

const optimizedImageUrl = computed(() => {
  return optimizeImage(props.property.image, {
    width: 800,
    quality: 80,
    format: "webp",
  });
});

const blurHashUrl = computed(() => {
  return generateBlurHash(props.property.image);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatLocation = (location) => {
  return `${location.address}, ${location.city}`;
};

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const handleImageError = (e) => {
  e.target.src = "/fallback-property-image.jpg";
  imageLoaded.value = true;
};
</script>
