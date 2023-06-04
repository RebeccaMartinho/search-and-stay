<template>
  <b-container
    class="vh-100 d-flex flex-column align-items-center justify-content-center bg-primary"
    fluid="xl"
  >
    <div class="w-50 bg-light p-5 rounded-lg">
      <h1 class="text-center">House rules</h1>
      <p class="text-center">Welcome back!</p>

      <b-form
        @submit="onSubmit"
        @reset="onReset"
        v-if="show"
        class="mx-auto bg-light p-5 rounded-lg"
      >
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            :state="emailState"
            trim
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter email"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter a valid email
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            :state="passwordState"
            v-model="form.password"
            placeholder="Enter password"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 8 letters
          </b-form-invalid-feedback>
        </b-form-group>
        <div class="d-flex justify-content-end">
          <b-button type="submit" variant="primary" class="mr-2"
            >Login</b-button
          >
          <b-button type="reset" variant="info" class="ml-2">Reset</b-button>
        </div>
      </b-form>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "teste@mail.com",
        password: "12345678",
      },
      show: true,
    };
  },
  computed: {
    emailState() {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const checkEmail = emailRegex.test(this.form.email);
      return this.form.email.length > 2 && checkEmail ? true : false;
    },
    passwordState() {
      return this.form.password.length > 7 ? true : false;
    },
  },
  methods: {
    validateEmail() {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      this.emailState = emailRegex.test(this.form.email);
    },
    async onSubmit(event) {
      event.preventDefault();
      await this.$store.dispatch("auth/setToken");
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
