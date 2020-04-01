<template>
    <div id="menu-warp">
        <el-menu default-active="1-1" class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="transparent"
                 text-color="#ffffff"
                 :router="true"
        >
            <template v-for="(item ,index) in routerList" >
                <el-submenu :index="''+index"  v-if="!item.hidden"  :key="item.id">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
<!--                    子菜单-->
                    <template v-for="subItem in item.children" >
                        <el-menu-item   :index = "subItem.path"   :key="subItem.id"> {{ subItem.name }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
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
    computed:{
      routerList(){
        return this.$router.options.routes
      }
    },
    methods: {

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
