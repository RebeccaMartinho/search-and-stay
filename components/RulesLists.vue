<template>
  <b-container fluid="xl" class="col-10">
    <div v-if="loading" class="my-2">
      <b-skeleton animation="wave" width="55%"></b-skeleton>
      <b-skeleton animation="wave" width="70%"></b-skeleton>
      <b-skeleton class="ml-auto" type="button"></b-skeleton>
      <b-row v-for="n in 5" :key="n">
        <b-col class="d-none d-md-block my-2" cols="12" md="6">
          <b-skeleton-img no-aspect height="200px"></b-skeleton-img>
        </b-col>
        <b-col class="my-2" cols="12" md="6">
          <b-skeleton-img no-aspect height="200px"></b-skeleton-img>
        </b-col>
      </b-row>
    </div>
    <div v-else class="">
      <div class="m-2 rounded p-2">
        <h1>House Rules!</h1>
        <small>Here you can create, update, read or delete rules</small>
      </div>
      <div class="d-flex justify-content-between my-2">
        <b-button-group>
          <b-button
            @click="handleStatus('active')"
            :variant="`${status === 'active' ? 'primary' : 'outline-primary'}`"
            >Active</b-button
          >
          <b-button
            @click="handleStatus('inactive')"
            :variant="`${
              status === 'inactive' ? 'primary' : 'outline-primary'
            }`"
            >Inactive</b-button
          >
          <b-button
            @click="handleStatus('all')"
            :variant="`${status === 'all' ? 'primary' : 'outline-primary'}`"
            >All</b-button
          >
        </b-button-group>

        <b-button variant="primary" @click="handleShowModal"
          >New rule +</b-button
        >
      </div>
      <RuleModal
        :open="showModal"
        :newRule="true"
        @closeModal="handleShowModal"
      />
      <b-row class="justify-content-center">
        <b-col
          class="px-0 py-2 flex-wrap justify-content-center mb-4"
          v-for="(item, index) in rules"
          :key="item.id"
          cols="12"
          md="3"
        >
          <Rules :rule="item" :number="index + 1" />
        </b-col>
      </b-row>
      <div
        class="overflow-auto my-2"
        v-if="hasRules && pagination.total_pages > 1"
      >
        <b-pagination
          v-model="pagination.current_page"
          :total-rows="pagination.total"
          :per-page="pagination.per_page"
          @page-click="onPageClick"
          aria-controls="my-table"
          align="center"
        ></b-pagination>
      </div>
      <div
        v-else-if="!hasRules"
        class="d-flex align-items-center justify-content-center"
      >
        <span>There are no rules. How about creating a new one?</span>
      </div>
    </div>
  </b-container>
</template>

<script>
import Rules from "./Rules.vue";
export default {
  components: { Rules },
  data() {
    return {
      loading: true,
      perPage: 3,
      currentPage: 1,
      showModal: false,
      status: "all",
    };
  },

  computed: {
    rules() {
      return this.$store.state.rules;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    hasRules() {
      return this.rules && this.rules.length > 0;
    },
  },
  async created() {
    try {
      this.loading = true;
      await this.$store.dispatch("getRules");
    } catch (error) {
      return Promise.reject(error);
    }
    this.loading = false;
  },
  methods: {
    onPageClick(event, page) {
      event.preventDefault();
      this.currentPage = page;
      let query =
        this.status === "all"
          ? `?page=${page}`
          : `?active=${this.status === "active" ? 1 : 0}&page=${page}`;
      this.$store.dispatch("getNextRules", query);
    },
    handleStatus(status) {
      let query =
        status === "all"
          ? `?page=1`
          : `?active=${status === "active" ? 1 : 0}&page=1`;
      this.$store.dispatch("changeRuleStatus", query);
      this.status = status;
    },
    handleShowModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style></style>
