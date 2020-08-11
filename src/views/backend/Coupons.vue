<template>
  <div>
    <Loading :active.sync="isLoading" />

    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        @click="openModal('create')"
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
      <tbody>
        <tr
          v-for="coupon in coupons"
          :key="coupon.id"
        >
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td>{{ coupon.deadline.datetime }}</td>
          <td>
            <span
              v-if="coupon.enabled"
              class="text-success"
            >已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', coupon)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{status === 'create' ? '建立優惠券' : '更新優惠券'}}
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
          <form>
            <div class="form-group">
              <label for="coupon-title" class="form-label">標題</label>
              <input
                type="text"
                id="coupon-title"
                class="form-control"
                placeholder="請輸入標題"
                v-model="tempCoupon.title"
              >
            </div>
            <div class="form-group">
              <label for="coupon-code" class="form-label">優惠碼</label>
              <input
                type="text"
                id="coupon-code"
                class="form-control"
                placeholder="請輸入優惠碼"
                v-model="tempCoupon.code"
              >
            </div>
            <div class="form-group">
              <label for="coupon-date" class="form-label">到期日</label>
              <input
                type="date"
                id="coupon-date"
                class="form-control"
                v-model="due_date"
              >
            </div>
            <div class="form-group">
              <label for="coupon-time" class="form-label">到期時間</label>
              <input
                type="time"
                class="form-control"
                id="coupon-time"
                step="1"
                v-model="due_time"
              >
            </div>
            <div class="form-group">
              <label for="coupon-percent" class="form-label">折扣百分比</label>
              <input
                type="number"
                id="coupon-percent"
                class="form-control"
                placeholder="請輸入折扣數量"
                v-model="tempCoupon.percent"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  id="coupon-enabled"
                  class="form-check-input"
                  v-model="tempCoupon.enabled"
                >
                <label for="coupon-enabled" class="form-check-label"
                >是否啟用</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCoupon"
          >
            {{status === 'create' ? '新增優惠券' : '更新優惠券'}}
          </button>
        </div>
      </div>
      </div>
    </div>

    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>刪除產品</span>
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
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupon"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination :page="pagination" />
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      coupons: [],
      tempCoupon: {
        title: '',
        code: '',
        percent: 100,
        enabled: false,
        deadline_at: 0,
      },
      due_date: '',
      due_time: '',
      status: '',
      pagination: {},
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    openModal(type, coupon) {
      this.status = type;

      switch (type) {
        case 'create':
          this.tempCoupon = {
            enabled: false,
          };
          $('#couponModal').modal('show');
          break;
        case 'edit': {
          this.tempCoupon = JSON.parse(JSON.stringify(coupon));
          const deadlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = deadlineAt;
          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          this.tempCoupon = JSON.parse(JSON.stringify(coupon));
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    getCoupons(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page="${page}"`;

      this.$http.get(api).then((res) => {
        this.coupons = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      });
    },
    updateCoupon() {
      this.isLoading = true;

      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = 'post';
      let couponStatus = '新增 Coupon 成功!';

      if (this.status !== 'create') {
        const { id } = this.tempCoupon;

        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;
        httpMethod = 'patch';
        couponStatus = '更新 Coupon 成功!';
      }

      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;

      this.$http[httpMethod](api, this.tempCoupon).then(() => {
        $('#couponModal').modal('hide');

        this.isLoading = false;
        this.$bus.$emit('message', couponStatus, 'success');

        this.getCoupons();
      }).catch(() => {
        $('#couponModal').modal('hide');

        this.isLoading = false;
        this.$bus.$emit('message', '新增、修改 Coupon 發生錯誤', 'danger');
      });
    },
    deleteCoupon() {
      this.isLoading = true;

      const { id } = this.tempCoupon;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;

      this.$http.delete(api).then(() => {
        this.isLoading = false;
        $('#delCouponModal').modal('hide');

        this.getCoupons();
      });
    },
  },
};
</script>

<style>

</style>
