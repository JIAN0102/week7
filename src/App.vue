<template>
  <div id="app">
    <Toasts />
    <router-view/>
  </div>
</template>

<script>
import Toasts from '@/components/Toasts.vue';

export default {
  components: {
    Toasts,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
