export const state = () => ({
  rules: {},
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
  async getRules({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.$get();
      console.log(data, "GET RULES");
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (er) {}
  },
  async getNextRules({ state, commit, dispatch }, page) {
    try {
      console.log(page);
      const { data } = await this.$axios.$get(`?page=${page}`);
      console.log(data);
      commit("getRules", data.entities);
      commit("getPagination", data.pagination);
    } catch (er) {}
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
      const { data } = await this.$axios.$put(`${params.id}`, {
        house_rules: params,
      });
      this.dispatch("getRules");
    } catch (error) {
      console.log(error);
    }
    return data;
  },
  async newRule({}, params) {
    console.log("chegou NEWRULE?", params);
    try {
      const response = await this.$axios.$post("/", {
        house_rules: params,
      });
      console.log("aqui response", response);
      this.dispatch("getRules");
    } catch (error) {
      console.log(error);
    }
    return data;
  },
  async deleteRule({}, id) {
    try {
      const response = await this.$axios.$delete(`${id}`);
      console.log(response);
      this.dispatch("getRules");
    } catch (error) {
      console.log(error);
    }
    return response;
  },
};
