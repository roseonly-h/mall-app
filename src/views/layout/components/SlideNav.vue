<template>
  <div class="slider-nav">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <a-breadcrumb class="bread-crumb">
      <a-breadcrumb-item>{{
        currentRoute[0] ? currentRoute[0].meta.title : ""
      }}</a-breadcrumb-item>
      <a-breadcrumb-item>
        {{ currentRoute[1] ? currentRoute[1].meta.title : "" }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <ul class="user-info">
      <li class="user-name">
        欢迎您！{{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li class="login-out" @click="loginOut">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航栏上面包屑数据
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    // 监听路由变化,重新刷新面包屑数据
    $route() {
      // console.log(this.$route)
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    // 菜单栏的收放函数
    toggleCollapsed() {
      this.$store.dispatch("changeCollapsed");
    },
    // 登出函数
    loginOut() {
      this.$store.dispatch("loginOut");
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>