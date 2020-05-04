<template>
<div>
  <b-link class="position-absolute" @click="$router.go(-1)">
    <b-icon icon="chevron-left" scale="1.4" />Meny</b-link>
  {{dish.name}}
</div>
</template>
<script>
export default {
  data() {
    return {
      dish: this.$store.state.dishes[this.$route.params._id]
    }
  }
}
</script>
