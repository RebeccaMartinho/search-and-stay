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
    await this.$axios.setToken(
      "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8",
      "Bearer"
    );
    commit("setToken", true);
  },
  removeToken({ commit }) {
    this.$axios.setToken(false);
    commit("setToken", false);
  },
};
