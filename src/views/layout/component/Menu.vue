<template>
    <div id="nav-wrap" >
        <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
        <el-menu
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 text-color="#fff"
                 background-color="transparent"
                 active-text-color="#fff"
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
                        <el-menu-item   :index = "subItem.path"  v-if="!subItem.hidden" :key="subItem.id"> {{ subItem.name }}</el-menu-item>
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
        // isCollapse: false
      };
    },
    computed:{
      routerList(){
        return this.$router.options.routes
      },
      isCollapse(){
        return this.$store.state.app.isCollapse
      }
    },
  }
</script>

<style scoped lang='scss'>
    @import "../../../styles/config.scss";
    .logo {
        text-align: center;
        img {
            margin: 28px auto 25px;
            width: 92px;
            @include webkit(transition, all .3s ease 0s);

        }
    }
    #nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #344a5f;
        @include webkit(transition, all .3s ease 0s);
        svg {
            font-size: 20px;
            margin-right: 10px;
        }
    }
    .open {
        #nav-wrap { width: $navMenu; }
    }
    .close {
        #nav-wrap { width: $navMenuMin; }
        .logo img { width: 60%; }
    }
</style>
