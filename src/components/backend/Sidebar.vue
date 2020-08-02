<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a
      class="navbar-brand"
      href="#"
    >Vue 後台管理系統</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/login"
          >
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/login"
          >
            優惠卷列表
          </router-link>
        </li><li class="nav-item">
          <router-link
            class="nav-link"
            to="/login"
          >
            圖片頁面
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/login"
          >
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/login"
          >
            模擬下單系統
          </router-link>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            @click="signout"
          >
            登出
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    signout() {
      this.$cookie.remove('token');

      this.$router.push('/login');
    },
  },
};
</script>

<style>

</style>
