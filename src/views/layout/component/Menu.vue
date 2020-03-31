<template>
    <div id="menu-warp">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse"
                 background-color="transparent"
                 text-color="#ffffff"

        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
  export default {
    name: "Menu",
    data() {
      return {
        isCollapse: false
      };
    },
    created(){
     console.log(' this.$route', this.$route)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped lang='scss'>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: 400px;
        height: 100vh;

    }
    #menu-warp{
        width: 240px;
        height: 100vh;
        background-color: #344a5f;

    }

</style>
