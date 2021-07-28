<template>
  <a-modal
    :visible="true"
    @cancel="onCancel"
    :destroyOnClose="true"
    :footer="null"
    title="话题"
  >
    <div class="centre">
      <a-input v-model="topicName" />
      <a-checkbox v-model="checked">置顶</a-checkbox>
    </div>
    <div class="gaping invert">
      <a-button type="primary" icon="save" @click="onClickSubmit">
        确定
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import { lts } from "@/api/lts.js";
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      topicName: "",
      checked: false
    };
  },
  methods: {
    onClickSubmit() {
      this._add();
    },
    onCancel() {
      this.$emit("input", false);
    },
    async _add() {
      const rm = (await lts.addTopic(this.topicName, this.isTop)).data;
      this.$message.info(rm.status);
      this.$emit("update");
      this.onCancel();
    }
  },
  computed: {
    isTop() {
      if (this.checked) return 1;
      return 0;
    }
  }
};
</script>

<style>
.gaping {
  padding: 10px;
}
.invert {
  display: flex;
  flex-direction: row-reverse;
}
</style>
