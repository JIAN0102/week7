<template>
  <div class="container">
    <Loading :active.sync="isLoading" />

    <form
      class="form-signin"
      @submit.prevent="signin"
    >
      <h1 class="h3 mb-3 font-weight-normal">
        請先登入
      </h1>
      <div class="form-group">
        <label
          for="inputEmail"
          class="sr-only"
        >Email address</label>
        <input
          id="inputEmail"
          type="email"
          class="form-control"
          v-model="user.email"
          placeholder="Email address"
          required
          autofocus
        >
      </div>
      <div class="form-group">
        <label
          for="inputPassword"
          class="sr-only"
        >Password</label>
        <input
          id="inputPassword"
          type="password"
          class="form-control"
          v-model="user.password"
          placeholder="Password"
          required
        >
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        登入
      </button>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;

      this.$http.post(api, this.user).then((res) => {
        const { token } = res.data;
        const { expired } = res.data;

        // 登入成功將回傳的 token 以及 expired 寫入 cookie
        this.$cookies.set('token', token, new Date(expired * 1000));

        this.$bus.$emit('message', `${res.data.message}`, 'success');

        this.isLoading = false;

        this.$router.push('/admin');
      }).catch((err) => {
        this.$bus.$emit('message', `${err.response.data.message}`, 'danger');

        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 400px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
