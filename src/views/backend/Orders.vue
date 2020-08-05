<template>
  <div>
    <Loading :active.sync="isLoading" />

    <table class="table mt-4">
      <thead>
        <tr>
          <th>下單時間</th>
          <th>購買款項</th>
          <th>付款方式</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
        >
          <td>{{ order.created.datetime }}</td>
          <td>
            <ul>
              <li
                v-for="(product, index) in order.products"
                :key="index"
              >
                {{ product.product.title }}
                數量：{{ product.quantity }}{{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>
            {{ order.payment }}
          </td>
          <td>
            {{ order.amount }}
          </td>
          <td>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                :id="order.id"
                v-model="order.paid"
                @change="setOrderPaidState(order)"
              >
              <label
                class="custom-control-label"
                :for="order.id"
              >
                <strong
                  class="text-success"
                  v-if="order.paid"
                >
                  已付款
                </strong>
                <span
                  class="text-muted"
                  v-else
                >
                  尚未付款
                </span>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :page="pagination" @emitPages="getOrders" />
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
      orders: [],
      pagination: {},
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;

      this.$http.get(api).then((res) => {
        this.orders = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      });
    },
    setOrderPaidState(order) {
      this.isLoading = true;

      const { id } = order;

      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}/paid`;

      if (!order.paid) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}/unpaid`;
      }

      this.$http.patch(api, order.id).then(() => {
        this.isLoading = false;

        this.getOrders();
      }).catch(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style>

</style>
