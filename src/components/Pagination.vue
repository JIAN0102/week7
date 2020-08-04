<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{'disabled': page.current_page === 1}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(page.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{'active': item === page.current_page}"
          v-for="(item, index) in page.total_pages"
          :key="index"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(item)"
          >
            {{ item }}
          </a>
        </li>
        <li
          class="page-item"
          :class="{'disabled': page.current_page === page.total_pages}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(page.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    changePage(nowPage) {
      // if (nowPage === this.page.current_page) return;
      this.$emit('emitPages', nowPage);
    },
  },
};
</script>

<style>

</style>
