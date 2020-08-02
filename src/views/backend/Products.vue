<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Pagination />
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
        console.log(res);
        this.products = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style>

</style>
