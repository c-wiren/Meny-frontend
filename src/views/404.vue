<template>
  <b-container class="px-3 my-5">
    <NotFound class="d-block img-fluid m-auto" width="400" />
    <h1 class="text-center my-3">Sidan hittades inte</h1>
    <b-button variant="primary" class="mt-5 mb-4" to="/meny">Till start</b-button>
  </b-container>
</template>
<script>
import NotFound from "@/assets/404.svg";
export default {
  metaInfo: {
    title: "404"
  },
  components: {
    NotFound
  }
};
</script>