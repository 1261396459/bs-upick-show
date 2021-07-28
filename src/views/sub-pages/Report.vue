<template>
  <div>
    <div class="content-head" tip="内容head">
      <BreadCrumb
        class="content-head-item"
        :bcList="['用户申诉', '当前页面']"
      ></BreadCrumb>

      <div class="content-head-item">
        <div class="head-select">
          <a-radio-group v-model="status">
            <a-radio-button :value="0">未处理</a-radio-button>
            <a-radio-button :value="1">已处理</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="content-main">
      <a-list
        class="text-center"
        itemLayout="vertical"
        :dataSource="list"
        :pagination="pagination"
      >
        <a-list-item slot="header">
          <a-row>
            <a-col :span="1">共{{ pagination.pageSize }}条</a-col>
            <a-col :span="3">用户</a-col>
            <a-col :span="3">举报对象</a-col>
            <a-col :span="4">举报描述/评论</a-col>
            <a-col :span="2">举报时间</a-col>
            <a-col :span="2">理由</a-col>
            <a-col :span="6">证明</a-col>
            <a-col :span="3">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item
          slot="renderItem"
          slot-scope="item, index"
          :key="index"
          v-if="item.status == status"
        >
          <a-row>
            <a-col :span="1">{{ item.id }}</a-col>
            <a-col :span="3">{{ item.userName }}</a-col>
            <a-col :span="3">{{ item.targetName }}</a-col>
            <a-col :span="4">{{ item.describe }}</a-col>
            <a-col :span="2">{{ item.time }}</a-col>
            <a-col :span="2">{{ item.reason }}</a-col>
            <a-col :span="6">
              <a-avatar
                shape="square"
                :size="90"
                :src="imgValue"
                :alt="imgValue"
                icon="picture"
                v-for="(imgValue, imgIndex) in item.prove"
                :key="imgIndex"
                style="margin: 5px; padding: 5px; border: 1px solid #D9D9D9"
              />
            </a-col>
            <a-col :span="3">
              <MyLink>无效</MyLink>
              <span>|</span>
              <MyLink>查看</MyLink>
              <span>|</span>
              <MyLink>下架</MyLink>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { report } from "@/api/report.js";

export default {
  name: "Report",
  data() {
    return {
      list: [],
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getList(e);
        }
      },
      status: 0
    };
  },
  methods: {
    async _getList(page, status) {
      const rm = (await report.list(page, status)).data;
      this.test.Log("举报管理", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新状态
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.list = rm.data.list;
    },
    editTag() {}
  },
  mounted() {
    this._getList(this.pagination.current, this.status);
  },
  watch: {
    status: function() {
      this._getList(this.pagination.current, this.status);
    }
  }
};
</script>

<style></style>
