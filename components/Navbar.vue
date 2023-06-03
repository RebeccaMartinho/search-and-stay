<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">House rules</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item href="#">About</b-nav-item>
          <!-- <b-nav-item href="#">Contato</b-nav-item> -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item href="#">Login</b-nav-item> -->
          <b-nav-item @click="handleLogout" href="#">{{
            isLoggedIn ? "Logout" : "Login"
          }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  methods: {
    handleLogout() {
      this.$store.dispatch("auth/removeToken");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>
