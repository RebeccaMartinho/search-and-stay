export default function ({ $axios, store, route, redirect, error }) {
  $axios.onResponse(() => {});

  // $axios.setToken(
  //   "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8",
  //   "Bearer"
  // );
  $axios.onResponseError((err) => {});
}
