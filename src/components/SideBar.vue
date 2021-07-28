<template>
  <div>
    <a-menu
      theme="dark"
      mode="inline"
      :defaultSelectedKeys="menuDefaultSelectedKeys"
      :defaultOpenKeys="menuDefaultOpenKeys"
      @select="onSelect"
    >
      <template v-for="item in menu">
        <a-sub-menu v-if="item.children" :key="item.key">
          <span slot="title">
            <a-icon v-if="item.iconType" :type="item.iconType" />
            <span>{{ item.title }}</span>
          </span>
          <a-menu-item v-for="child in item.children" :key="child.key">
            <a-icon v-if="child.iconType" :type="child.iconType" />
            <span>{{ child.title }}</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.key">
          <a-icon v-if="item.iconType" :type="item.iconType" />
          <span>{{ item.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    data: JSON,
    menuDefaultSelectedKeys: [],
    menuDefaultOpenKeys: [],
    menu: Array
  },
  methods: {
    onSelect(e) {
      this.$router.replace("/" + e.key);
    }
  }
};
</script>

<style></style>
