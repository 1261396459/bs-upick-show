<template>
  <div>
    <a-list
      class="text-center"
      itemLayout="vertical"
      :dataSource="commentList"
      :pagination="pagination"
    >
      <a-list-item slot="header">
        <a-row>
          <a-col :span="2">共{{ commentList.length }}条</a-col>
          <a-col :span="14">内容预览</a-col>
          <a-col :span="4">时间</a-col>
          <a-col :span="4">操作</a-col>
        </a-row>
      </a-list-item>
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <!-- 先分4列，第2列在分行 -->
        <a-row>
          <!-- 第1列 id -->
          <a-col :span="2">
            {{ item.id }}
          </a-col>
          <!-- 第2列 内容 -->
          <a-col :span="14">
            {{ item.content }}
          </a-col>
          <!-- 第3列 时间 -->
          <a-col :span="4">
            {{ item.time }}
          </a-col>
          <!-- 第4列 管理员操作 -->
          <a-col :span="4">
            <MyLink @click.native="$router.push()">查看</MyLink>
            <span>|</span>
            <MyLink @click.native="onClickDel(item.id)">下架</MyLink>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { personal } from "@/api/personal.js";
import { Modal } from "ant-design-vue";

export default {
  name: "UserHomepageComment",
  components: {},
  props: {
    mystu: String
  },
  data() {
    return {
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getComment(this.mystu, e);
        }
      },
      commentList: [],
      myModal: false
    };
  },
  methods: {
    async _getComment(id, page) {
      const rm = (await personal.listComment(id, page)).data;
      this.test.Log("用户主页-Comment", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新页面总数
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.commentList = rm.data.list;
    },
    async _deleteE(id) {
      const rm = (await personal.delComment(id)).data;
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
          that._getComment(that.mystu, that.pagination.current);
        }
      });
    }
  },
  mounted() {
    this._getComment(this.mystu, this.pagination.current);
  }
};
</script>

<style></style>
