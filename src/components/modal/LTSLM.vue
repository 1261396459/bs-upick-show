<template>
  <a-modal
    :visible="true"
    @cancel="onCancel"
    :destroyOnClose="true"
    :footer="null"
    title="推荐标签"
  >
    <div class="centre">
      <a-input v-model="labelName" />
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
    value: Boolean,
    type: Number
  },
  data() {
    return {
      labelName: ""
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
      const rm = (await lts.addLabel(this.labelName, this.type)).data;
      this.$message.info(rm.status);
      this.$emit("update");
      this.onCancel();
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
