<template>
  <div>
    <Sidebar />
    <div class="px-5">
      <router-view v-if="checkAuth" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/backend/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      checkAuth: false,
    };
  },
  created() {
    const token = this.$cookies.get('token');

    const api = `${process.env.VUE_APP_APIPATH}/auth/check`;

    this.setAxiosAuthorization();

    this.$http.post(api, { api_token: token }).then((res) => {
      if (!res.data.success) {
        this.checkAuth = false;
        this.$router.push('/login');
      }
      this.checkAuth = true;
    }).catch(() => {
      this.checkAuth = false;
      this.$router.push('/login');
    });
  },
};
</script>

<style>

</style>
