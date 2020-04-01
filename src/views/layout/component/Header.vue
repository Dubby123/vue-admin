<template>
    <div id="heard-warp">
        <svg-icon icon-class="caidan" />
        <svg-icon icon-class="icon-test"  />
    </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped lang='scss'>
    @import "../../../styles/config.scss";
    #heard-warp{
        position: fixed;
        top: 0;
        right: 0;
        left: 250px;
        height: 75px;
        background-color: #fff;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    svg{
        font-size: 35px;
        cursor: pointer;
    }

</style>
