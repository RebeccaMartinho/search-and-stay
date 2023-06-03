<template>
  <div class="col-12">
    <b-card
      :title="makeShortText(this.rule.name)"
      :img-src="`${number % 2 === 0 ? img : imgOdd}`"
      img-alt="Image"
      img-top
      header-tag="h5"
      tag="article"
      class="bg-info rounded-3 card-img"
      :id="rule.id"
    >
      <b-badge v-if="!rule.active" variant="danger">Inactive rule</b-badge>
      <b-badge v-else variant="success">Active rule</b-badge>
      <b-row class="d-flex justify-content-end">
        <b-button variant="primary" class="mr-3" @click="openRule(rule.id)">
          <b-icon icon="eye"></b-icon
        ></b-button>
        <b-button
          class="mr-3"
          @click="handleRemoveRule(rule.id)"
          variant="danger"
          ><b-icon icon="trash"></b-icon
        ></b-button>
      </b-row>
      <RuleModal
        :open="showModal"
        :data="ruleData"
        :loader="loading"
        @closeModal="handleCloseModal"
      />
    </b-card>
  </div>
</template>

<script>
import RuleModal from "./RuleModal.vue";
export default {
  components: { RuleModal },
  name: "Rules",
  data() {
    return {
      showModal: false,
      ruleData: null,
      loading: false,
      img: require("@/assets/w1.svg"),
      imgOdd: require("@/assets/w2.svg"),
    };
  },
  props: {
    rule: {
      type: Object,
      default: () => ({
        id: 1,
        name: "Rule test",
        active: 1,
        order: 0,
      }),
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    makeShortText(text) {
      return `${text.substring(0, 20)}${text.length > 20 ? "..." : ""}`;
    },
    async openRule(id) {
      this.loading = true;
      this.showModal = !this.showModal;
      try {
        const response = await this.$store.dispatch("showRule", id);
        this.ruleData = response;
        this.loading = false;
      } catch (error) {}
    },
    handleCloseModal() {
      this.showModal = false;
      this.ruleData = null;
    },
    async handleRemoveRule(id) {
      this.$snotify.confirm(
        "Are you sure you want to remove this rule?",
        "Confirm",
        {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: true,
          buttons: [
            {
              text: "Yes",
              action: async (toast) => {
                this.$snotify.remove(toast.id);
                try {
                  await this.$store.dispatch("deleteRule", id);
                  this.$snotify.success("Your rule has been removed.");
                } catch (error) {
                  this.$snotify.error(
                    "Your rule has not been removed. Please, try again"
                  );
                }
              },
              timeout: 5000,
              closeOnClick: true,
              bold: false,
            },
            {
              text: "Cancel",
              action: (toast) => {
                this.$snotify.remove(toast.id);
              },
            },
          ],
        }
      );
    },
  },
};
</script>

<style>
.card-img,
.card-img-top {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}
.card {
  border-radius: 50px;
}
.card-body {
  padding: 30px;
}
</style>
