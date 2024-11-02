<template>
  <div v-if="property" class="max-w-7xl mx-auto px-4 py-12">
    <!-- Property Gallery -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <div class="col-span-4 md:col-span-2 lg:col-span-3 relative group">
        <img
          :src="property.image"
          :alt="property.name"
          class="w-full h-[500px] object-cover rounded-lg"
        />
        <div
          class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <button
            class="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-lg text-gray-900 font-medium hover:bg-white transition-colors"
          >
            View All Photos
          </button>
        </div>
      </div>
      <div class="hidden md:grid md:col-span-2 lg:col-span-1 gap-4">
        <img
          v-for="n in 3"
          :key="n"
          :src="`https://via.placeholder.com/400x300?text=Photo+${n + 1}`"
          :alt="`Property photo ${n + 1}`"
          class="w-full h-[158px] object-cover rounded-lg"
        />
      </div>
    </div>

    <!-- Property Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start gap-6 mb-12"
    >
      <div>
        <div class="flex items-center gap-3 text-sm text-gray-600 mb-2">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{{
            property.type
          }}</span>
          <span
            >Added {{ new Date(property.dateAdded).toLocaleDateString() }}</span
          >
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {{ property.name }}
        </h1>
        <p class="text-gray-600 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {{ property.location.address }}, {{ property.location.city }}
        </p>
      </div>
      <div class="flex flex-col items-end gap-4">
        <div class="text-right">
          <p
            class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {{ property.price }}
          </p>
          <p class="text-gray-600">
            {{
              Math.round(
                parseInt(property.price.replace(/\D/g, "")) /
                  property.squareFeet
              )
            }}/sq ft
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="toggleFavorite(property.id)"
            class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            :class="{ 'border-red-200 bg-red-50': isFavorite(property.id) }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="{
                'text-red-500 fill-current': isFavorite(property.id),
                'text-gray-400': !isFavorite(property.id),
              }"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{{ isFavorite(property.id) ? "Saved" : "Save" }}</span>
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Overview -->
        <section class="bg-white p-6 rounded-xl shadow-sm">
          <h2 class="text-2xl font-bold mb-6">Overview</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div class="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="text-2xl font-bold">{{ property.bedrooms }}</span>
              <span class="text-gray-600">Bedrooms</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span class="text-2xl font-bold">{{ property.bathrooms }}</span>
              <span class="text-gray-600">Bathrooms</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span class="text-2xl font-bold">{{ property.squareFeet }}</span>
              <span class="text-gray-600">Sq Ft</span>
            </div>
            <div class="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="text-2xl font-bold">{{ property.yearBuilt }}</span>
              <span class="text-gray-600">Year Built</span>
            </div>
          </div>
          <p class="text-gray-600 leading-relaxed">
            {{ property.description }}
          </p>
        </section>

        <!-- Features & Amenities -->
        <section class="bg-white p-6 rounded-xl shadow-sm">
          <h2 class="text-2xl font-bold mb-6">Features & Amenities</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="amenity in property.amenities"
              :key="amenity"
              class="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ amenity }}</span>
            </div>
          </div>
        </section>

        <!-- Virtual Tour -->
        <section class="bg-white p-6 rounded-xl shadow-sm">
          <h2 class="text-2xl font-bold mb-6">Virtual Tour</h2>
          <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
            <!-- Add virtual tour component or iframe here -->
            <div class="flex items-center justify-center">
              <p class="text-gray-500">Virtual Tour Coming Soon</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="space-y-8">
        <!-- Contact Form -->
        <section class="bg-white p-6 rounded-xl shadow-sm sticky top-24">
          <h2 class="text-2xl font-bold mb-6">Contact Agent</h2>
          <form @submit.prevent="handleContact" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Name</label
              >
              <input
                type="text"
                v-model="contactForm.name"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                type="email"
                v-model="contactForm.email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Phone</label
              >
              <input
                type="tel"
                v-model="contactForm.phone"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Message</label
              >
              <textarea
                v-model="contactForm.message"
                rows="4"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePropertyStore } from "@/stores/propertyStore";

const route = useRoute();
const propertyStore = usePropertyStore();
const property = ref(null);
const contactForm = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const { toggleFavorite, isFavorite } = propertyStore;

onMounted(async () => {
  const propertyId = parseInt(route.params.id);
  property.value = propertyStore.properties.find((p) => p.id === propertyId);
  if (!property.value) {
    // Handle property not found
    console.error("Property not found");
  }
});

const handleContact = async () => {
  // Here you would typically send the contact form data to your backend
  console.log("Contact form submitted:", contactForm.value);
  // Show success message
  alert("Thank you for your message! We will get back to you soon.");
  // Reset form
  contactForm.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
};
</script>
