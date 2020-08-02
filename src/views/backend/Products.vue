<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <ul>
      <li v-for="product in products" :key="product.id">
        <h2>{{ product.title }}</h2>
      </li>
    </ul>
    <Pagination :page="pagination" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      pagination: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      this.$http.get(api).then((res) => {
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      }).catch(() => {
      });
    },
  },
};
</script>

<style>

</style>
