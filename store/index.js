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
      // const { data } = await this.$axios.$get();
      const { data } = await this.$axios.$get();
      console.log(data);
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

  async showRule({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.$get();
      console.log(data);
      commit("getRules", data);
    } catch (er) {}
  },

  async removeRule({}, id) {
    await this.$axios.$delete(`/9${id}`);
  },
  async updateRule({}) {
    await this.$axios.$put(`/9${id}`);
  },
};
