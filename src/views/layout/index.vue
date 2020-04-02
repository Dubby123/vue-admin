<template>
    <div id="layout-warp" :class="[ menuStatus ? 'close':'open']">
        <layoutMenu/>
        <div>
            <layoutHeader/>
            <layoutMain/>
        </div>

    </div>
</template>

<script>
  import layoutHeader from './component/Header'
  import layoutMain from './component/Main'
  import layoutMenu from './component/Menu'

  export default {
    name: "index",
    components: {
      layoutHeader,
      layoutMain,
      layoutMenu
    },
    computed: {
      menuStatus() {
        return this.$store.state.app.isCollapse
      }
    }
  }
</script>

<style scoped lang='scss'>
    #layout-warp{
        display: flex;
    }
</style>
