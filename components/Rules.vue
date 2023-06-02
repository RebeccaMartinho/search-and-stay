<template>
  <div>
    <b-card
      :title="makeShortText(this.rule.name)"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      class=""
      :class="!rule.active ? 'bg-secondary' : ''"
      :id="rule.id"
    >
      <b-button @click="openRule(rule.id)">Show rule</b-button>
      <RuleModal
        :open="showModal"
        :data="ruleData"
        :loader="loading"
        @closeModal="handleCloseModal"
      />
      <b-button @click="handleRemoveRule(rule.id)" variant="primary"
        >Remove</b-button
      >
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
  },
  methods: {
    makeShortText(text) {
      console.log("aqui o text", text);
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
      try {
        const response = await this.$store.dispatch("deleteRule", id);
      } catch (error) {
        console.log(error);
        //tratar
      }
    },
  },
};
</script>

<style></style>
