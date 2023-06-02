<template>
  <b-container>
    <div v-if="loading" class="my-2">
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
    <div v-else>
      <div class="text-right my-2">
        <b-button variant="success" @click="handleShowModal"
          >New rule +</b-button
        >
      </div>
      <RuleModal
        :open="showModal"
        :newRule="true"
        @closeModal="handleShowModal"
      />

      <b-row>
        <b-col
          class="px-0 py-2"
          v-for="item in rules"
          :key="item.id"
          cols="12"
          md="6"
        >
          <Rules :rule="item" />
        </b-col>
      </b-row>
      <div class="overflow-auto my-2">
        <b-pagination
          v-model="pagination.current_page"
          :total-rows="pagination.total"
          :per-page="pagination.per_page"
          @page-click="onPageClick"
          aria-controls="my-table"
          align="center"
        ></b-pagination>
        <b-form-checkbox
          v-model="onlyActives"
          switch
          class=""
          @change="handleSwitch"
        >
          <span>{{ "Only actives" }}</span>
        </b-form-checkbox>
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
      onlyActives: false,
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
      this.$store.dispatch("getNextRules", page);
      event.preventDefault();
    },
    handleShowModal() {
      this.showModal = !this.showModal;
    },
    handleSwitch() {
      console.log("valor", this.onlyActives);
    },
  },
};
</script>

<style></style>
