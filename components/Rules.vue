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
      <b-card-text> {{ rule }} </b-card-text>
      <b-button href="#" variant="primary">Open</b-button>
      <b-button href="#" variant="primary">Edit</b-button>
      <b-button href="#" variant="primary">Remove</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Rules",
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
  },
};
</script>

<style></style>
