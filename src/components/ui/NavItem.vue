<template>
  <router-link
    :to="to"
    class="relative group flex items-center py-2 px-3 rounded-lg transition-all duration-300"
    :class="[
      active ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50',
      isScrolled ? 'text-white hover:bg-white/10' : '',
    ]"
  >
    <component
      :is="icon"
      class="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
      :class="[
        active ? 'text-blue-600' : 'text-gray-400',
        isScrolled ? 'text-white' : '',
      ]"
    />
    <span>{{ text }}</span>
    <span
      class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      :class="{ 'scale-x-100': active }"
    ></span>
  </router-link>
</template>

<script setup>
defineProps({
  to: { type: String, required: true },
  text: { type: String, required: true },
  icon: { type: Object, required: true },
  active: { type: Boolean, default: false },
  isScrolled: { type: Boolean, default: false },
});
</script>
