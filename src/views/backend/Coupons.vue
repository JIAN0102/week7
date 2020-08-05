<template>
  <div>
    <Loading :active.sync="isLoading" />

    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
      >
        建立新的優惠券
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

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
      coupons: {},
      tempCoupons: {
        title: '',
        code: '',
        percent: 100,
        enabled: false,
        deadline_at: 0,
      },
      pagination: {},
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page="${page}"`;

      this.$http.get(api).then((res) => {
        this.coupons = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      });
    },
  },
};
</script>

<style>

</style>
