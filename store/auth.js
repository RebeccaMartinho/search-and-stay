export const state = () => ({
  isLoggedIn: false,
});

export const mutations = {
  setToken(state, payload) {
    state.isLoggedIn = payload;
  },
};
export const actions = {
  async setToken({ state, commit }) {
    await this.$axios.setToken(process.env.TOKEN, "Bearer");
    commit("setToken", true);
  },
  removeToken({ commit }) {
    this.$axios.setToken(false);
    commit("setToken", false);
  },
};
