<template>
  <a-modal
    :visible="true"
    @cancel="onCancel"
    :destroyOnClose="true"
    :footer="null"
  >
    <a-form>
      <a-form-item label="学号添加">
        <a-input
          placeholder="请输入"
          v-model="stuid"
          :disabled="!isAdd"
        ></a-input>
      </a-form-item>
      <a-form-item label="所属部门">
        <a-select @change="handleCChange" :defaultValue="department">
          <a-select-option
            v-for="(item, index) in dList"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="权限设置">
        <a-select @change="handleLChange" :defaultValue="level">
          <a-select-option
            v-for="(item, index) in lList"
            :key="index"
            :value="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" icon="save" @click="onClickSubmit">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { manager } from "@/api/manager.js";
export default {
  props: {
    isAdd: Boolean,
    value: Boolean,
    myid: String,
    mysid: String
  },
  data() {
    return {
      uid: "",
      stuid: "",
      department: "",
      level: "",
      dList: ["产品经理组", "产品运营部", "技术开发部"],
      lList: ["0", "1"]
    };
  },
  methods: {
    handleCChange(select) {
      this.department = select;
    },
    handleLChange(select) {
      this.level = select;
    },
    onClickSubmit() {
      if (this.isAdd) {
        this._addU();
      } else {
        this._updU();
      }
    },
    onCancel() {
      this.$emit("input", false);
    },
    async _addU() {
      const rm = (await manager.add(this.stuid, this.department, this.level))
        .data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      this.onCancel();
    },
    async _updU() {
      const rm = (await manager.update(this.uid, this.department, this.level))
        .data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      this.onCancel();
    }
  },
  watch: {
    //myid变化时更新uid
    myid: function() {
      this.uid = this.myid;
    },
    mysid: function() {
      this.stuid = this.mysid;
    }
  },
  mounted() {
    this.stuid = this.mysid;
    this.uid = this.myid;
    this.department = this.dList[0];
    this.level = this.lList[0];
  }
};
</script>

<style></style>
