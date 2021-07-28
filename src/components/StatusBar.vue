<template>
  <div>
    <a-avatar :alt="name" icon="user" :src="avatarSrc"></a-avatar>
    <a-button type="link">{{ name }}</a-button>
  </div>
</template>

<script>
export default {
  name: "StatusBar",
  props: {
    avatarSrc: String,
    name: String
  },
  methods: {}
};
</script>

<style></style>
