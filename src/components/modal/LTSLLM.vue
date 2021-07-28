<template>
  <a-modal
    :visible="true"
    @cancel="onCancel"
    :destroyOnClose="true"
    :footer="null"
    :title="listLabelType[type]"
  >
    <LTSLM v-if="isAdd" v-model="isAdd" :type="type" @update="updateList" />
    <a-list class="text-center" itemLayout="vertical" :dataSource="list">
      <a-list-item
        slot="renderItem"
        slot-scope="item, index"
        :key="index"
        class="row-horizontal-between"
      >
        <span>{{ item.labelName }}</span>
        <MyLink @click.native="delLabel(item.id)">删除</MyLink>
      </a-list-item>
      <a-list-item slot="footer">
        <a-button type="dashed" class="btm" @click="addLabel">
          <a-icon type="plus-square" />新增标签
        </a-button>
      </a-list-item>
    </a-list>
  </a-modal>
</template>

<script>
import { lts } from "@/api/lts.js";
import LTSLM from "@/components/modal/LTSLM.vue";
import { Modal } from "ant-design-vue";
export default {
  components: {
    LTSLM
  },
  props: {
    value: Boolean,
    list: Array,
    type: Number
  },
  data() {
    return {
      labelName: "",
      isAdd: false,
      listLabelType: ["分类", "地点", "情景"]
    };
  },
  methods: {
    addLabel() {
      this.isAdd = true;
    },
    onCancel() {
      this.$emit("input", false);
    },
    async _add() {
      const rm = (await lts.addLabel(this.labelName, this.type)).data;
      this.$message.info(rm.status);
      this.onCancel();
    },
    async _delLabel(id) {
      const rm = (await lts.delLabel(id)).data;
      this.$message.info(rm.status);
    },
    delLabel(id) {
      const that = this;
      Modal.confirm({
        title: "确认要删除话题吗？",
        class: "warning",
        onOk() {
          that._delLabel(id).catch(err => that.$message.error(err.message));
          that.updateList();
        }
      });
    },
    updateList() {
      this.$emit("update");
    }
  },
  computed: {
    typeTran() {
      if (this.checked) return 1;
      return 0;
    }
  }
};
</script>

<style></style>
