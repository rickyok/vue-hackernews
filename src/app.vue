<template>
  <div id="wrapper">
    <!-- header -->
    <!-- main view -->
    <component is="{{view}}"
      class="view"
      params="{{params}}"
      keep-alive
      v-transition
      transition-mode="out-in">
    </component>
  </div>
</template>

<script>
module.exports = {
  el: '#app',
  data: {
    view: '',
    params: {
      userId: null,
      itemId: null
    }
  },
  filters: {
    fromNow: require('./filters/from-now'),
    domain: require('./filters/domain')
  },
  components: {
    'login-view': require('./views/login-view.vue'),
    'main-view': require('./views/main-view.vue')
  }
}
</script>

<style lang="stylus">
</style>