<template>
  <div class="home">
    <left-menu />
    <div :class="{'main-app':true,'extend-app':$store.state.collapsed}">
      <slider-nav />
      <!-- 右侧展示区 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftMenu from "./components/Menu";
import sliderNav from "./components/SlideNav";
export default {
  name: "home",
  components: {
    leftMenu,
    sliderNav,
  },
};
</script>
<style lang="less">
@import url("../../assets/css/home.less");
</style>