<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    :class="[
      elevated ? 'shadow-lg hover:shadow-xl' : '',
      interactive ? 'cursor-pointer transform hover:-translate-y-1' : '',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  elevated: Boolean,
  interactive: Boolean,
});
</script>
