<template>
  <div>
    <Loading :active.sync="isLoading" />

    <table class="table mt-4">
      <thead>
        <tr>
          <th>圖片縮圖</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="storage in storages"
          :key="storage.id"
        >
          <td>
            <img
              :src="storage.path"
              style="max-width: 300px"
            >
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                class="btn btn-outline-danger"
                @click.prevent="openModal(storage)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      id="deleteModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除資料</span>
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
            是否刪除該筆資料 (刪除後將無法恢復)。
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
              @click.prevent="deleteStorage"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination :page="pagination" @emitPages="getStorages" />
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
      storages: [],
      pagination: {},
      tempStorage: {},
    };
  },
  created() {
    this.getStorages();
  },
  methods: {
    getStorages(page = 1) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`;

      this.$http.get(api).then((res) => {
        this.storages = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      });
    },
    openModal(storage) {
      $('#deleteModal').modal('show');

      this.tempStorage = storage;
    },
    deleteStorage() {
      this.isLoading = true;

      const { id } = this.tempStorage;

      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${id}`;

      this.$http.delete(api).then(() => {
        $('#deleteModal').modal('hide');

        this.isLoading = false;

        this.getStorages();
      }).catch(() => {
        $('#deleteModal').modal('hide');

        this.isLoading = false;
      });
    },
  },
};
</script>

<style>

</style>
