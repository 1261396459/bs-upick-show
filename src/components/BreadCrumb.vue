<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in bcList" :key="index">
        <span>{{ item }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    bcList: Array
  }
};
</script>

<style></style>
