<template>
  <div>
    <LTSTM
      v-if="isAdd"
      v-model="isAdd"
      @update="_getTopic(pagination.current)"
    />
    <LTSLLM
      v-if="isEdit"
      v-model="isEdit"
      :list="detachLabel"
      :type="value"
      @update="_getLabel"
    />
    <div class="content-head" tip="内容head">
      <BreadCrumb
        class="content-head-item"
        :bcList="['Eatest', '当前页面']"
      ></BreadCrumb>
      <span class="content-head-item add-bottom page-tip">标签话题设置</span>
    </div>
    <div class="content-main">
      <a-list
        itemLayout="vertical"
        :dataSource="listLabelType"
        class="text-center"
      >
        <a-list-item slot="header">
          <a-row>
            <a-col :span="2">标签种类</a-col>
            <a-col :span="2" :offset="18">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-row>
            <a-col :span="2">{{ item }}</a-col>
            <a-col :span="2" :offset="18">
              <MyLink @click.native="editTag(index)">编辑</MyLink>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </div>
    <div class="content-main">
      <a-list
        itemLayout="vertical"
        :dataSource="listTopic"
        :pagination="pagination"
        class="text-center"
      >
        <a-list-item slot="header">
          <a-row>
            <a-col :span="1" :offset="1">序号</a-col>
            <a-col :span="5" :offset="2">话题名称</a-col>
            <a-col :span="3" :offset="3">当前发帖数</a-col>
            <a-col :span="4" :offset="4">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-row>
            <a-col :span="1" :offset="1">{{ item.id }}</a-col>
            <a-col :span="5" :offset="2">{{ item.topicName }}</a-col>
            <a-col :span="3" :offset="3">{{ item.eatestSum }}</a-col>
            <a-col :span="4" :offset="4">
              <MyLink @click.native="_topTopic(item.id)">置顶</MyLink>
              <span>|</span>
              <MyLink @click.native="delTopic(item.id)">删除</MyLink>
            </a-col>
          </a-row>
        </a-list-item>
        <a-list-item slot="footer">
          <a-button type="dashed" class="btm" @click="addTopic">
            <a-icon type="plus-square" />新增话题
          </a-button>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { lts } from "@/api/lts.js";
import { Modal } from "ant-design-vue";
import LTSTM from "@/components/modal/LTSTM.vue";
import LTSLLM from "@/components/modal/LTSLLM.vue";

export default {
  name: "LabelTopicSet",
  components: {
    LTSTM,
    LTSLLM
  },
  data() {
    return {
      listLabel: [],
      listTopic: [],
      listLabelType: ["分类", "地点", "情景"],
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getList(e);
        }
      },
      isAdd: false,
      isEdit: false,
      value: 0
    };
  },
  methods: {
    async _getLabel() {
      const rm = (await lts.listLabel()).data;
      this.test.Log("label", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      this.listLabel = rm.data.list;
    },
    async _getTopic(page) {
      const rm = (await lts.listTopic(page)).data;
      this.test.Log("topic", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.listTopic = rm.data.list;
    },
    async _getList() {
      this._getLabel();
      this._getTopic(this.pagination.current);
    },
    async _topTopic(id) {
      const rm = (await lts.topTopic(id)).data;
      this.$message.info(rm.status);
    },
    async _delTopic(id) {
      const rm = (await lts.delTopic(id)).data;
      this.$message.info(rm.status);
    },
    delTopic(id) {
      const that = this;
      Modal.confirm({
        title: "确认要删除话题吗？",
        class: "warning",
        onOk() {
          that._delTopic(id).catch(err => that.$message.error(err.message));
          that._getList();
        }
      });
    },
    editTag(e) {
      this.isEdit = true;
      this.value = e;
    },
    addTopic() {
      this.isAdd = true;
    }
  },
  mounted() {
    this._getList();
  },
  computed: {
    detachLabel() {
      return this.listLabel.filter(item => {
        if (item.type == this.value) return item;
      });
    }
  }
};
</script>

<style></style>
