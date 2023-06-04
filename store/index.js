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
  },
  getPagination(state, payload) {
    state.pagination = payload;
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
  async getNextRules({ commit }, query) {
    try {
      const { data } = await this.$axios.$get(query);
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (er) {}
  },
  async changeRuleStatus({ commit }, query) {
    try {
      const { data } = await this.$axios.$get(query);
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (err) {}
  },
  async showRule({}, id) {
    try {
      const { data } = await this.$axios.$get(`${id}`);
      return data;
    } catch (er) {}
  },
  async updateRule({}, params) {
    try {
      await this.$axios.$put(`${params.id}`, {
        house_rules: params,
      });
      this.dispatch("getRules");
    } catch (error) {}
  },
  async newRule({}, params) {
    try {
      await this.$axios.$post("/", {
        house_rules: params,
      });
      this.dispatch("getRules");
    } catch (error) {}
  },
  async deleteRule({}, id) {
    try {
      await this.$axios.$delete(`${id}`);
      this.dispatch("getRules");
    } catch (error) {}
  },
};
