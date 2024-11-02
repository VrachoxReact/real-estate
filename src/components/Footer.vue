<template>
  <footer class="bg-gray-900 text-white p-6 text-center">
    <p>&copy; 2023 Real Estate Agency. All rights reserved.</p>
    <div class="mt-2">
      <router-link to="/" class="hover:text-yellow-400">Home</router-link> |
      <router-link to="/properties" class="hover:text-yellow-400"
        >Properties</router-link
      >
      |
      <router-link to="/about" class="hover:text-yellow-400">About</router-link>
      |
      <router-link to="/contact" class="hover:text-yellow-400"
        >Contact</router-link
      >
    </div>
    <div class="mt-4 space-x-4">
      <a href="#" target="_blank" class="hover:text-yellow-400"
        ><i class="fab fa-facebook"></i
      ></a>
      <a href="#" target="_blank" class="hover:text-yellow-400"
        ><i class="fab fa-twitter"></i
      ></a>
      <a href="#" target="_blank" class="hover:text-yellow-400"
        ><i class="fab fa-instagram"></i
      ></a>
    </div>
  </footer>
</template>

<script setup></script>
