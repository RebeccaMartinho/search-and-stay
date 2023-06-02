<template>
  <div>
    <vue-snotify></vue-snotify>
    <Navbar />
    <RulesList />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RulesList from "../components/RulesLists.vue";
export default {
  components: { Navbar, RulesList },
  name: "IndexPage",
  head: {
    title: "House rules!",
  },
  computed: {
    rules() {
      return this.$store.state.rules.entities;
    },
  },
  async created() {
    try {
      this.$store.dispatch("getRules");
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
</script>
