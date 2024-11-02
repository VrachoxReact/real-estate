<template>
  <header
    class="fixed w-full top-0 z-50 transition-all duration-500"
    :class="[
      headerClasses,
      { 'translate-y-0': !isHidden, '-translate-y-full': isHidden },
    ]"
  >
    <!-- Announcement Banner -->
    <div
      v-if="showAnnouncement"
      class="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3"
    >
      <div class="container mx-auto px-4 text-center text-sm font-medium">
        <span>✨ New properties available in your area! </span>
        <button
          @click="showAnnouncement = false"
          class="ml-2 underline hover:text-blue-200 transition-colors duration-200"
        >
          View Now
        </button>
      </div>
    </div>

    <div class="relative bg-opacity-98 backdrop-blur-md shadow-sm">
      <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-18">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <div
                class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transform transition-transform group-hover:rotate-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex flex-col">
              <span
                class="text-2xl font-bold tracking-tight"
                :class="{
                  'text-gray-900': !isScrolled,
                  'text-white': isScrolled,
                }"
              >
                RealEstate
              </span>
              <span
                class="text-sm text-gray-500"
                :class="{ 'text-gray-400': isScrolled }"
                >Premium Living</span
              >
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center px-4 py-2 rounded-lg transition-colors duration-300"
              :class="[
                currentRoute === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100',
                isScrolled && currentRoute !== item.path
                  ? 'text-white hover:bg-white/10'
                  : '',
              ]"
            >
              <component :is="item.icon" class="mr-2" />
              <span>{{ item.name }}</span>
            </router-link>

            <!-- Quick Search -->
            <button
              @click="toggleSearch"
              class="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100"
              :class="{
                'text-gray-600': !isScrolled,
                'text-white hover:bg-white/10': isScrolled,
              }"
            >
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <!-- CTA Button -->
            <router-link
              to="/contact"
              class="ml-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="lg:hidden relative w-10 h-10 focus:outline-none group"
            aria-label="Toggle Menu"
          >
            <div
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <span
                class="block w-6 h-0.5 transition-all duration-300"
                :class="[
                  menuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1',
                  isScrolled ? 'bg-white' : 'bg-gray-600',
                ]"
              ></span>
              <span
                class="block w-6 h-0.5 transition-all duration-300"
                :class="[
                  menuOpen ? 'opacity-0' : 'opacity-100',
                  isScrolled ? 'bg-white' : 'bg-gray-600',
                ]"
              ></span>
              <span
                class="block w-6 h-0.5 transition-all duration-300"
                :class="[
                  menuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1',
                  isScrolled ? 'bg-white' : 'bg-gray-600',
                ]"
              ></span>
            </div>
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="menuOpen" class="lg:hidden absolute top-full left-0 right-0">
          <div
            class="bg-white/95 backdrop-blur-lg shadow-xl rounded-b-2xl border-t border-gray-100 py-4"
          >
            <div class="container mx-auto px-4 space-y-2">
              <router-link
                v-for="item in navigationItems"
                :key="item.path"
                :to="item.path"
                class="flex items-center p-3 rounded-xl transition-colors duration-200"
                :class="{
                  'bg-blue-50 text-blue-600': currentRoute === item.path,
                  'hover:bg-gray-50': currentRoute !== item.path,
                }"
                @click="closeMenu"
              >
                <component :is="item.icon" class="w-5 h-5 mr-3" />
                {{ item.name }}
              </router-link>

              <router-link
                to="/contact"
                class="block mt-4 px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200"
                @click="closeMenu"
              >
                Get Started
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Search Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSearch"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      >
        <div class="container mx-auto px-4 pt-20">
          <div class="bg-white rounded-2xl shadow-2xl p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-semibold">Quick Search</h2>
              <button
                @click="closeSearch"
                class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <PropertySearch @search="handleSearch" />
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PropertySearch from "./PropertySearch.vue";
import NavItem from "./ui/NavItem.vue";

// Navigation items with icons
const navigationItems = [
  {
    name: "Home",
    path: "/",
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
    },
  },
  {
    name: "Properties",
    path: "/properties",
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>',
    },
  },
  {
    name: "About",
    path: "/about",
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    },
  },
  {
    name: "Contact",
    path: "/contact",
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    },
  },
];

const route = useRoute();
const router = useRouter();
const menuOpen = ref(false);
const showSearch = ref(false);
const isScrolled = ref(false);
const lastScrollY = ref(0);
const isHidden = ref(false);
const showAnnouncement = ref(true);

// Computed properties
const currentRoute = computed(() => route.path);

const headerClasses = computed(() => ({
  "bg-white": !isScrolled.value,
  "bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg": isScrolled.value,
}));

// Methods
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = "";
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeSearch = () => {
  showSearch.value = false;
  document.body.style.overflow = "";
};

const handleSearch = (searchData) => {
  closeSearch();
  router.push({
    path: "/properties",
    query: { search: searchData.query },
  });
};

// Scroll handling with improved performance
const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // Update header background
  isScrolled.value = currentScrollY > 50;

  // Hide/show header based on scroll direction
  if (currentScrollY > lastScrollY.value && currentScrollY > 400) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }

  lastScrollY.value = currentScrollY;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
