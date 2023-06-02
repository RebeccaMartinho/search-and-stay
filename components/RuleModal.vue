<template>
  <div>
    <b-modal
      v-model="open"
      ok-title="Save"
      :title="newRule ? 'New rule' : 'Edit Rule'"
      @ok="handleOk"
      @cancel="handleCancel"
      @close="handleCancel"
    >
      <template #default="{}" v-if="data">
        <b-form>
          <b-form-group
            id="input-group-2"
            label="Rule's name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Enter rule's name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-checkbox v-model="form.active" switch>
            {{ form.active ? "Active" : "Inactive" }}</b-form-checkbox
          >
        </b-form>
      </template>
      <template v-else>
        <div class="text-center">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teste: false,
      switchValue: false,
      form: {
        active: true,
        id: 0,
        name: null,
        order: null,
      },
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    newRule: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({
        id: 1,
        name: "",
        active: 1,
        order: 0,
      }),
    },
    loading: Boolean,
    default: true,
  },
  watch: {
    data() {
      console.log("val open e data", this.open, this.data, this.form);
      if (this.open && this.data && !this.newRule) {
        this.form = {
          ...this.data,
          active: !!this.data.active ? true : false,
        };
      }
    },
  },
  methods: {
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    async handleSubmit() {
      try {
        const response = null;
        if (!this.newRule) {
          response = await this.$store.dispatch("updateRule", this.form);
        } else {
          response = await this.$store.dispatch("newRule", {
            name: this.form.name,
            active: this.form.active ? 1 : 0,
          });
        }
        this.ruleData = response;
      } catch (error) {
        console.log(error);
        //tratar
      }
      this.$emit("closeModal");
    },
    handleCancel(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.$emit("closeModal");
      this.clearFields();
    },
    clearFields() {
      this.form = {
        name: null,
        active: true,
      };
    },
  },
};
</script>

<style></style>
