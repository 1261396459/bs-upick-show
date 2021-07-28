<template>
  <a-modal
    :visible="true"
    @cancel="onCancel"
    :destroyOnClose="true"
    :footer="null"
    title="更改状态"
  >
    <div class="centre">
      <a-radio-group v-model="status">
        <a-radio value="0">正常</a-radio>
        <div class="gaping"></div>
        <a-radio value="1">禁言一天</a-radio>
        <a-radio value="2">禁言三天</a-radio>
        <a-radio value="3">永久禁言</a-radio>
      </a-radio-group>
    </div>
    <div class="gaping invert">
      <a-button type="primary" icon="save" @click="onClickSubmit">
        保存
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import { user } from "@/api/user.js";
export default {
  props: {
    value: Boolean,
    myid: String,
    mystatus: String
  },
  data() {
    return {
      status: "0"
    };
  },
  methods: {
    onClickSubmit() {
      this._updU();
    },
    onCancel() {
      this.$emit("input", false);
    },
    async _updU() {
      const rm = (await user.update(this.myid, this.status)).data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      this.onCancel();
    }
  },
  watch: {
    //value变化时更新status
    value: function() {
      this.status = this.mystatus;
    }
  },
  mounted() {
    this.status = this.mystatus;
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
