<template>
    <div id="main-warp">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: "Main"
  }
</script>

<style scoped lang='scss'>
    #main-warp{
        position: fixed;
        top:95px;
        left: 270px;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
    }

</style>
