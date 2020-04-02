<template>
    <div id="header-wrap">
        <svg-icon iconClass="caidan" className="menu" @click="toggleMenu()"/>
        <div><span>管理员</span><svg-icon iconClass="icon-test" className="exit"/></div>

    </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      toggleMenu() {
        this.$store.commit('app/SET_COLLAPSE')
      }
    }
  }
</script>

<style scoped lang='scss'>
    @import "../../../styles/config.scss";
    #header-wrap {
        position: fixed;
        top: 0;
        left: $navMenu;
        right: 0;
        height: 75px;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px;
        @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
        @include webkit(transition, all .3s ease 0s);
    }
        svg {
            margin-bottom: -8px;
            font-size: 25px;
            cursor: pointer;
        }

    .open {
        #header-wrap { left: $navMenu; }
    }
    .close {
        #header-wrap { left: $navMenuMin; }
    }

</style>
