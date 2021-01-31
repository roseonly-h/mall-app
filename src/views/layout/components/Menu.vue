<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
      class="ant-menu"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu :key="route.name" v-if="!route.meta.hidden">
          <span slot="title">
            <a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }} </span>
          </span>
          <template v-for="children in route.children">
            <a-menu-item :key="children.name" v-if="!children.meta.hidden">
              <router-link :to="{ name: children.name }">
                <a-icon :type="children.meta.icon" />
                {{ children.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    // 默认打开的路由
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
    // 默认选中的菜单栏
    defaultSelectKey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : "";
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='less'>
.menu-list {
  width: 200px;
  position: fixed;
  height: 100%;
  .ant-menu {
    height: 100%;
  }
}
</style>