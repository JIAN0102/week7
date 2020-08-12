<template>
  <div
    style="
      position: fixed;
      top: 24px;
      right: 24px;
      min-width: 320px;
      z-index: 9999;
    "
    >
    <div
      class="toast fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-for="message in messages" :key="message.timestamp"
    >
      <div class="toast-header">
        <div
          class="inline-block rounded mr-2 bg-primary"
          :class="`bg-${message.status}`"
          style="width: 20px; height: 20px"
        >
        </div>
        <strong class="mr-auto">Able Sisters</strong>
        <small>現在</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.$bus.$on('message', (message, status = 'danger') => {
      this.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);

      this.messages.push({
        timestamp,
        message,
        status,
      });

      this.removeMessage(timestamp);
    },
    removeMessage(timestamp) {
      setTimeout(() => {
        this.messages.forEach((message, index) => {
          if (message.timestamp === timestamp) {
            this.messages.splice(index, 1);
          }
        });
      }, 4000);
    },
  },
};
</script>

<style>

</style>
