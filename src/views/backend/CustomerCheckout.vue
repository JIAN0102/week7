<template>
  <div class="my-5">
    <Loading :active.sync="isLoading" />

    <table class="table">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>購買方式</th>
          <th>商品列表</th>
          <th>應付金額</th>
          <th>付款狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
        >
          <td>{{ order.created.datetime }}</td>
          <td>{{ order.payment }}</td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="(product, index) in order.products"
                :key="index"
              >
                {{ product.product.title }} 數量 {{ product.quantity }}{{product.product.unit}}
              </li>
            </ul>
          </td>
          <td>{{ order.amount }}</td>
          <td>
            <strong
              class="text-success"
              v-show="order.paid"
            >已付款</strong>
            <strong
              class="text-danger"
              v-show="!order.paid"
            >未付款</strong>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary"
                :disabled="order.paid"
                @click.prevent="getProductDetail(order.id)"
              >
                選擇
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="row justify-content-center">
      <form
        class="col-md-6"
        @submit.prevent="payOrder"
      >
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in order.products"
              :key="index"
            >
              <td>{{ product.product.title }}</td>
              <td>{{ product.quantity }} / {{product.product.unit}}</td>
              <td>{{ product.product.price }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colspan="2"
                class="text-right"
              >
                總計
              </td>
              <td class="text-right">
                {{ order.amount }}
              </td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span
                  class="text-success"
                  v-show="order.paid"
                >
                  付款完成
                </span>
                <span
                  class="text-danger"
                  v-show="!order.paid"
                >
                  未付款
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          class="text-right"
          v-show="order.paid === false"
        >
          <button
            type="submit"
            class="btn btn-danger"
          >
            確認付款
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      order: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
      },
      orderId: '',
    };
  },
  created() {
    this.orderId = this.$route.params.id;

    if (this.orderId) {
      this.getProductDetail(this.orderId);
    }

    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders?page=${page}`;

      this.$http.get(api).then((res) => {
        this.orders = res.data.data;

        this.isLoading = false;
      });
    },
    getProductDetail(id) {
      this.isLoading = true;

      this.orderId = id;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${id}`;

      this.$http.get(api).then((res) => {
        this.order = res.data.data;

        this.isLoading = false;
      });
    },
    payOrder() {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`;

      this.$http.post(api).then((res) => {
        if (res.data.data.id) {
          this.isLoading = false;

          this.getOrders();

          this.getProductDetail(this.orderId);
        }
      });
    },
  },
};
</script>

<style>

</style>
