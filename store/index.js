export const state = () => ({
  rules: {},
  status: "all",
  pagination: {
    total: 1,
    count: 1,
    per_page: 1,
    current_page: 1,
    total_pages: 1,
    links: {
      next: "http://sys-dev.searchandstay.com/api/admin/house_rules?page=2",
      prev: null,
    },
  },
});

export const mutations = {
  getRules(state, payload) {
    state.rules = payload;
    console.log("aqui", payload, state);
  },
  getPagination(state, payload) {
    state.pagination = payload;
    console.log("aqui", payload, state);
  },
};

export const actions = {
  async getRules({ state, commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.$get();
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (er) {}
  },
  async getNextRules({ state, commit, dispatch }, query) {
    try {
      const { data } = await this.$axios.$get(query);
      console.log(data);
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (er) {}
  },
  async changeRuleStatus({ state, commit, dispatch }, query) {
    try {
      const { data } = await this.$axios.$get(query);
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (err) {
      console.log(err);
    }
  },
  async showRule({ state, commit, dispatch }, id) {
    try {
      const { data } = await this.$axios.$get(`${id}`);
      console.log(data, "show rule");
      return data;
      // commit("getRules", data);
    } catch (er) {}
  },
  async updateRule({}, params) {
    console.log("chegou?", params);
    try {
      await this.$axios.$put(`${params.id}`, {
        house_rules: params,
      });
      this.dispatch("getRules");
    } catch (error) {
      console.log(error);
    }
  },
  async newRule({}, params) {
    console.log("chegou NEWRULE?", params);
    try {
      await this.$axios.$post("/", {
        house_rules: params,
      });
      this.dispatch("getRules");
    } catch (error) {
      console.log(error);
    }
  },
  async deleteRule({}, id) {
    try {
      await this.$axios.$delete(`${id}`);
      this.dispatch("getRules");
    } catch (error) {
      console.log(error);
    }
  },
};
