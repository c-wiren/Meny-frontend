<template>
  <b-container class="my-2 px-3">
    <b-link class="pt-3 float-right" to="/login">Logga in</b-link>
    <div class="text-center py-1 pb-4 w-50 m-auto">
      <img width="70" src="/logo2.png" />
    </div>
    <EatingImage class="d-block img-fluid m-auto" width="400" />
    <h1 class="text-center my-3">Planera din mat</h1>
    <b-button variant="primary" class="my-5">Skapa konto</b-button>
  </b-container>
</template>
<script>
import EatingImage from "@/assets/eating.svg";
export default {
  metaInfo: {
    title: "Planera din mat"
  },
  created() {
    if (this.$store.state.user) this.$router.replace("/menu");
  },
  components: {
    EatingImage
  }
};
</script>