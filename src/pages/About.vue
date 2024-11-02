<template>
  <div>
    <!-- Hero Section with Parallax -->
    <section
      class="relative h-[500px] flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 z-0">
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90"
        ></div>
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          alt="Modern Office Building"
          class="w-full h-full object-cover transform scale-110"
          :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
        />
      </div>
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">About Our Agency</h1>
        <p class="text-xl opacity-90">
          Two decades of excellence in real estate, helping thousands find their
          perfect homes
        </p>
      </div>
    </section>

    <!-- Stats Section with Animation -->
    <section class="relative -mt-16 mb-24 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300"
          >
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                <CountUp
                  :endVal="stat.value"
                  :duration="2.5"
                  :options="{ prefix: stat.prefix, suffix: stat.suffix }"
                />
              </div>
              <div class="text-gray-600 text-sm md:text-base">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="inline-block">
              <h2 class="text-3xl font-bold mb-2">Our Mission</h2>
              <div class="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
            <p class="text-gray-600 leading-relaxed">
              To revolutionize the real estate industry by providing
              unparalleled service, innovative solutions, and a commitment to
              excellence that transforms the way people buy, sell, and invest in
              properties.
            </p>
            <div class="space-y-4">
              <div
                v-for="(point, index) in missionPoints"
                :key="index"
                class="flex items-start space-x-3"
              >
                <div
                  class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <span class="text-gray-700">{{ point }}</span>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="Team Meeting"
              class="rounded-lg shadow-xl"
            />
            <div
              class="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Trusted Excellence</p>
                  <p class="text-sm text-gray-600">20+ Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section with Hover Effects -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Our experienced team of professionals is dedicated to providing
            exceptional service and expertise in every aspect of real estate.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="group relative overflow-hidden rounded-xl bg-white shadow-lg"
          >
            <div class="aspect-w-3 aspect-h-4">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-semibold">{{ member.name }}</h3>
                <p class="text-gray-300 mb-2">{{ member.position }}</p>
                <p class="text-sm text-gray-400">{{ member.description }}</p>
                <div class="flex space-x-4 mt-4">
                  <a
                    href="#"
                    class="text-white hover:text-blue-400 transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="text-white hover:text-blue-400 transition-colors"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section with Interactive Cards -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="value in coreValues"
            :key="value.title"
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            @mouseenter="value.isHovered = true"
            @mouseleave="value.isHovered = false"
          >
            <div class="flex items-center space-x-4 mb-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300"
                :class="[value.isHovered ? 'bg-blue-600' : 'bg-blue-100']"
              >
                <component
                  :is="value.icon"
                  class="w-6 h-6 transition-colors duration-300"
                  :class="[value.isHovered ? 'text-white' : 'text-blue-600']"
                />
              </div>
              <h3 class="text-xl font-semibold">{{ value.title }}</h3>
            </div>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"
      ></div>
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
          alt="Modern Real Estate"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Work with the Best?
        </h2>
        <p class="text-xl text-white/90 mb-8">
          Join thousands of satisfied clients who have found their dream
          properties with us
        </p>
        <router-link
          to="/contact"
          class="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
        >
          Get Started
          <svg
            class="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CountUp from "vue-countup-v3";

// Scroll handling for parallax
const scrollY = ref(0);
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Stats data
const stats = [
  { value: 20, label: "Years Experience", prefix: "", suffix: "+" },
  { value: 1000, label: "Properties Sold", prefix: "", suffix: "+" },
  { value: 500, label: "Happy Clients", prefix: "", suffix: "+" },
  { value: 50, label: "Expert Agents", prefix: "", suffix: "+" },
];

// Mission points
const missionPoints = [
  "Exceptional customer service and support",
  "Innovative property solutions",
  "Transparent and ethical practices",
  "Market-leading expertise",
];

// Team members data
const teamMembers = ref([
  {
    name: "John Smith",
    position: "CEO & Founder",
    description: "25 years of experience in real estate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
  {
    name: "Sarah Johnson",
    position: "Head of Sales",
    description: "Luxury property sales expert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  },
  {
    name: "Michael Chen",
    position: "Chief Operations Officer",
    description: "Operations and client experience specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
]);

// Core values with interactive state
const coreValues = ref([
  {
    title: "Integrity",
    description:
      "We maintain the highest standards of integrity in all our dealings.",
    icon: {
      template:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    },
    isHovered: false,
  },
  {
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service.",
    icon: {
      template:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
    },
    isHovered: false,
  },
  {
    title: "Innovation",
    description: "We embrace innovation to provide better solutions.",
    icon: {
      template:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    },
    isHovered: false,
  },
]);
</script>

<style scoped>
.aspect-w-3 {
  position: relative;
  padding-bottom: 133.333333%;
}

.aspect-w-3 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
