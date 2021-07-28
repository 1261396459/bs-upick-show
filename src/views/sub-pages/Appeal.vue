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
        <a-list-item flex="auto" slot="header">
          <a-row>
            <a-col :span="2">共{{ pagination.pageSize }}条</a-col>
            <a-col :span="4">用户</a-col>
            <a-col :span="3">申诉类型</a-col>
            <a-col :span="8">详情</a-col>
            <a-col :span="3">描述</a-col>
            <a-col :span="3">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item
          flex="auto"
          slot="renderItem"
          slot-scope="item, index"
          :key="index"
          v-if="item.status / item.status == status"
        >
          <a-row>
            <a-col :span="2">{{ item.id }}</a-col>
            <a-col :span="4">{{ item.userName }}</a-col>
            <a-col :span="3">{{ item.type }}</a-col>
            <a-col :span="8">{{ item.content }}</a-col>
            <a-col :span="3">{{ item.describe }}</a-col>
            <a-col :span="3">
              <MyLink @click.native="onClickPass(item.id)">通过</MyLink>
              <span>|</span>
              <MyLink
                @click.native="
                  $router.push({
                    path: 'detail',
                    query: {
                      id: item.id
                    }
                  })
                "
              >
                查看
              </MyLink>
              <span>|</span>
              <MyLink @click.native="onClickDel(item.id)">下架</MyLink>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { appeal } from "@/api/appeal.js";
import { Modal } from "ant-design-vue";

export default {
  name: "Appeal",
  data() {
    return {
      list: [],
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getList(e, this.status);
        }
      },
      status: 0
    };
  },
  methods: {
    async _getList(page, status) {
      const rm = (await appeal.list(page, status)).data;
      this.test.Log("用户申诉", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新状态
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.list = rm.data.list;
    },
    async _deleteE(id) {
      const rm = (await appeal.delEatest(id)).data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
    },
    async onClickPass(id) {
      const rm = (await appeal.passEatest(id)).data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
    },
    onClickDel(id) {
      const that = this;
      Modal.confirm({
        title: "确认要下架这条内容吗？",
        content: "用户申诉后成功后才可操作还原",
        class: "warning",
        onOk() {
          that._deleteE(id).catch(err => that.$message.error(err.message));
          that._getList(that.pagination.current, that.status);
        }
      });
    }
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
