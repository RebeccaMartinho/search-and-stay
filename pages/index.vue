<template>
  <div>
    <vue-snotify></vue-snotify>
    <div v-if="isLoggedIn">
      <Navbar />
      <RulesList />
    </div>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RulesList from "../components/RulesLists.vue";
import Login from "../components/Login.vue";
export default {
  components: { Navbar, RulesList, Login },
  name: "IndexPage",
  head: {
    title: "House rules!",
  },
  computed: {
    rules() {
      return this.$store.state.rules.entities;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>
