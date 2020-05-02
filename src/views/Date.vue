<template>
<div class="overlay">
  <b-container>
    {{$route.params._id}}
  </b-container>
</div>
</template>
<script>
export default {}
</script>
<style>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: white;
}
</style>
