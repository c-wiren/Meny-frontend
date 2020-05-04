<template>
<div id="app">
  <keep-alive include="Menu">
    <!--<transition :name="transitionName">-->
    <router-view />
    <!--</transition>-->
  </keep-alive>
</div>
</template>
<script>
export default {
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>
<style lang="scss">
@import 'assets/custom-vars.scss';
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

.page {
    min-height: 100vh;
    background-color: white;
}
.slide-left-enter-active,
.slide-left-leave-active {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    position: absolute;
    top: 0;
    width: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    position: absolute;
    top: 0;
    width: 100%;
}
.slide-left-leave-to {
    transform: translateX(-30%);
}
.slide-right-enter {
    transform: translateX(-100%);
}
.slide-left-enter {
    transform: translateX(100%);
}
.slide-right-leave-to {
    transform: translateX(30%);
}
</style>
