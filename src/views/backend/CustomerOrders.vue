<template>
  <div>
    <Loading :active.sync="isLoading" />

    <div class="container mt-4">
      <div class="row">
        <div
          class="col-md-4 mb-4"
          v-for="product in products"
          :key="product.id"
        >
          <div class="card border-0 shadow-sm">
            <div class="text-center">
              <img
                class="img-fluid"
                :src="product.imageUrl"
                :alt="product.title"
              >
            </div>
            <div class="card-body">
              <div class="badge badge-primary mb-2">{{ product.category }}</div>
              <h4 class="card-title">{{ product.title }}</h4>
              <p class="card-text">{{ product.content }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div
                  class="h5"
                  v-if="!product.price"
                >
                  {{ product.origin_price }} 元
                </div>
                <div
                  class="h6"
                  v-if="product.price"
                >
                  {{ product.origin_price }} 元
                </div>
                <div
                  class="h5"
                  v-if="product.price"
                >
                  現在只要 {{ product.price }} 元
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="getProductDetail(product)"
              >
                查看產品細節
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="addCart(product)"
              >
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="text-right mb-3">
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="removeAllCartProduct"
        >
          <i class="far fa-trash-alt"> 刪除所有品項</i>
        </button>
      </div>
      <table class="table">
        <thead>
          <th>刪除</th>
          <th>品名</th>
          <th width="150px">
            數量
          </th>
          <th>單位</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="product in cart" :key="product.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartProduct(product.product.id)"
              >
                <i class="far fa-trash-alt" />
              </button>
            </td>
            <td class="align-middle">
              {{ product.product.title }}
            </td>
            <td class="align-middle">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-primary"
                  >
                    +
                  </button>
                </div>
                <input
                  id="inlineFormInputGroupUsername"
                  type="text"
                  class="form-control text-center"
                  :value="product.quantity"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary"
                  >
                    -
                  </button>
                </div>
              </div>
            </td>
            <td class="align-middle">
              {{ product.product.unit }}
            </td>
            <td class="align-middle text-right">
              {{ product.product.price }}
            </td>
          </tr>
        </tbody>
        <tfoot v-if="cart.length">
          <tr>
            <td colspan="4" class="text-right">
              總計
            </td>
            <td class="text-right">
              {{ cartTotal }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="container my-5">
      <div class="d-flex justify-content-center">
        <ValidationObserver
          tag="div"
          class="col-md-6"
          v-slot="{ invalid }"
        >
          <form @submit.prevent="sendOrder">
            <ValidationProvider
              tag="div"
              class="form-group"
              rules="required"
              v-slot="{ errors, classes }"
            >
              <label for="username">收件人姓名</label>
              <input
                type="text"
                id="username"
                class="form-control"
                :class="classes"
                name="收件人姓名"
                v-model="form.name"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="form-group"
              rules="required|email"
              v-slot="{ errors, classes }"
            >
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                :class="classes"
                name="Email"
                v-model="form.email"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="form-group"
              rules="required"
              v-slot="{ errors, classes }"
            >
              <label for="tel">電話</label>
              <input
                type="text"
                id="tel"
                class="form-control"
                :class="classes"
                name="電話"
                v-model="form.tel"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="form-group"
              rules="required"
              v-slot="{ errors, classes }"
            >
              <label for="address">地址</label>
              <input
                type="text"
                id="address"
                class="form-control"
                :class="classes"
                name="地址"
                v-model="form.address"
              >
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="form-group"
              rules="required"
            >
              <label>購買方式</label>
              <select
                class="form-control"
                required
                v-model="form.payment"
              >
                <option value="" selected disabled>請選擇付款方式</option>
                <option value="WebATM">WebATM</option>
                <option value="ATM">ATM</option>
                <option value="CVS">CVS</option>
                <option value="Barcode">Barcode</option>
                <option value="Credit">Credit</option>
                <option value="ApplePay">ApplePay</option>
                <option value="GooglePay">GooglePay</option>
              </select>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="form-group"
              rules="required"
              v-slot="{ errors, classes }"
            >
              <label for="message">留言</label>
              <textarea
                cols="30"
                rows="5"
                id="message"
                class="form-control"
                :class="classes"
                name="留言"
                v-model="form.message"
              ></textarea>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="invalid"
            >
              送出訂單
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">
              {{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="tempProduct.imageUrl"
              class="img-fluid"
              :alt="tempProduct.title" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0" v-html="tempProduct.content"></p>
              <footer class="blockquote-footer text-right">
                {{ tempProduct.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div v-if="!tempProduct.price" class="h4">
                {{ tempProduct.origin_price }} 元
              </div>
              <del v-if="tempProduct.price" class="h6"
                >原價 {{ tempProduct.origin_price }} 元</del
              >
              <div v-if="tempProduct.price" class="h4">
                現在只要 {{ tempProduct.price }} 元
              </div>
            </div>
            <select v-model="tempProduct.num" name class="form-control mt-3">
              <option value="0" disabled selected>
                請選擇數量
              </option>
              <option v-for="num in 10" :key="num" :value="num">
                選購 {{ num }} {{ tempProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3" v-if="tempProduct.num">
              小計
              <strong>{{ tempProduct.price * tempProduct.num }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addCart(tempProduct, tempProduct.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-show="status.loadingStatus === tempProduct.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      tempProduct: {
        num: 0,
      },
      cart: [],
      cartTotal: 0,
      status: {
        loadingStatus: '',
      },
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
    };
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;

      this.$http.get(api).then((res) => {
        this.products = res.data.data;

        this.isLoading = false;
      });
    },
    getProductDetail(product) {
      this.isLoading = true;

      const { id } = product;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      this.$http.get(api).then((res) => {
        this.tempProduct = res.data.data;
        this.$set(this.tempProduct, 'num', 0);

        $('#productModal').modal('show');

        this.isLoading = false;
      });
    },
    getCart() {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(api).then((res) => {
        this.cart = res.data.data;
        this.cartTotal = 0;

        this.cart.forEach((product) => {
          this.cartTotal += product.product.price * product.quantity;
        });

        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },
    addCart(product, quantity = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;

      const cartParm = {
        product: product.id,
        quantity,
      };

      this.$http.post(api, cartParm).then(() => {
        this.$bus.$emit('message', '加入購物車成功', 'success');

        this.getCart();
      }).catch((err) => {
        this.$bus.$emit('message', err.response.data.errors[0], 'danger');
      });
    },
    removeCartProduct(id) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;

      this.$http.delete(api).then(() => {
        this.$bus.$emit('message', '移除購物車成功', 'success');

        this.isLoading = false;

        this.getCart();
      }).catch((err) => {
        this.$bus.$emit('message', err.response.data.message, 'danger');
      });
    },
    removeAllCartProduct() {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;

      this.$http.delete(api).then(() => {
        this.$bus.$emit('message', '成功刪除購物車所有商品', 'success');

        this.isLoading = false;

        this.getCart();
      }).catch((err) => {
        this.$bus.$emit('message', err.response.data.message, 'danger');

        this.isLoading = false;
      });
    },
    sendOrder() {
      this.isLoading = true;

      // const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`;
    },
  },
};
</script>

<style>

</style>
