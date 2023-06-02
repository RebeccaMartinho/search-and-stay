<template>
  <b-container>
    <div class="text-right my-2">
      <b-button @click="handleShowModal">New rule</b-button>
    </div>
    <RuleModal
      :open="showModal"
      :newRule="true"
      @closeModal="handleShowModal"
    />
    <b-form-checkbox switch class="mr-n2">
      <span class="sr-only">Switch for following text input</span>
    </b-form-checkbox>
    <b-row sm="12">
      <b-col v-for="item in rules" :key="item.id">
        <Rules :rule="item" />
      </b-col>
    </b-row>
    <div class="overflow-auto">
      <b-pagination
        v-model="pagination.current_page"
        :total-rows="pagination.total"
        :per-page="pagination.per_page"
        @page-click="onPageClick"
        aria-controls="my-table"
        align="center"
      ></b-pagination>
    </div>
  </b-container>
</template>

<script>
import Rules from "./Rules.vue";
export default {
  components: { Rules },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      showModal: false,
    };
  },

  computed: {
    rules() {
      return this.$store.state.rules;
    },
    pagination() {
      return this.$store.state.pagination;
    },
  },
  methods: {
    onPageClick(event, page) {
      this.$store.dispatch("getNextRules", page);
      event.preventDefault();
    },
    handleShowModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style></style>
