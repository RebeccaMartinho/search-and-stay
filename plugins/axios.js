export default function ({ $axios, store, route, redirect, error }) {
  $axios.onResponse(() => {});
  $axios.onResponseError((err) => {});
}
