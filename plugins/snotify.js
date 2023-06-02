import "vue-snotify/styles/material.css";
import Vue from "vue";
import Snotify, { SnotifyPosition } from "vue-snotify";

const options = {
  toast: {
    position: SnotifyPosition.rightTop,
    timeout: 3500,
  },
};

Vue.use(Snotify, options);
