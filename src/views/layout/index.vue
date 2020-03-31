<template>
    <div id="layout-warp">
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
    components:{
      layoutHeader,
      layoutMain,
      layoutMenu
    }
  }
</script>

<style scoped lang='scss'>
    #layout-warp{
        display: flex;
        background-color: #f4f4f4;
    }

</style>
