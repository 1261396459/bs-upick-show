<template>
  <div>
    <a-list
      class="text-center"
      itemLayout="vertical"
      :dataSource="eatestList"
      :pagination="pagination"
    >
      <a-list-item flex="auto" slot="header">
        <a-row>
          <a-col :span="2">共{{ pagination.pageSize }}条</a-col>
          <a-col :span="4">用户</a-col>
          <a-col :span="8">涉嫌内容提取</a-col>
          <a-col :span="3">时间</a-col>
          <a-col :span="3">待审问题</a-col>
          <a-col :span="3">操作</a-col>
        </a-row>
      </a-list-item>
      <a-list-item
        flex="auto"
        slot="renderItem"
        slot-scope="item, index"
        :key="index"
      >
        <a-row>
          <a-col :span="2">
            {{ item.id }}
          </a-col>
          <a-col :span="4">
            {{ item.userId }}
          </a-col>
          <a-col :span="8">
            {{ item.content }}
          </a-col>
          <a-col :span="3">
            {{ item.created_at }}
          </a-col>
          <a-col :span="3">
            {{ item.type }}
          </a-col>
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
              >查看</MyLink
            >
            <span>|</span>
            <MyLink @click.native="onClickDel(item.id)">下架</MyLink>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { feedback } from "@/api/feedback.js";
import { Modal } from "ant-design-vue";

export default {
  name: "FeedbackEatest",
  components: {},
  data() {
    return {
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getEatest(e);
        }
      },
      eatestList: [],
      myModal: false
    };
  },
  methods: {
    async _getEatest(page) {
      const rm = (await feedback.listEatest(page)).data;
      this.test.Log("Eatest审核-Eatest", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新页面总数
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.eatestList = rm.data.list;
    },
    async _deleteE(id) {
      const rm = (await feedback.delEatest(id)).data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
    },
    async onClickPass(id) {
      const rm = (await feedback.passEatest(id)).data;
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
          that._getEatest(that.pagination.current);
        }
      });
    }
  },
  mounted() {
    this._getEatest(this.pagination.current);
  }
};
</script>

<style></style>
