<template>
  <div>
    <Sidebar />
    <router-view />
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
    };
  },
  created() {
    const token = this.$cookies.get('token');

    const api = `${process.env.VUE_APP_APIPATH}/auth/check`;

    this.setAxiosAuthorization();

    this.$http.post(api, { api_token: token }).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login');
      }
    }).catch(() => {
      this.$router.push('/login');
    });
  },
};
</script>

<style>

</style>
