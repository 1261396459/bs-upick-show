<template>
  <div>
    <div class="content-head" tip="内容head">
      <BreadCrumb
        class="content-head-item"
        :bcList="['Eatest', '当前页面']"
      ></BreadCrumb>
      <div class="content-head-item" style="justify-content: center;">
        <a-input-search
          style="width: 40%;"
          v-model="searchValue"
          placeholder="请输入"
          enter-button="搜索"
          @search="onSearch"
          allow-clear
        />
      </div>
      <div class="content-head-item">
        <span
          >筛选话题：
          <a-radio-button v-for="(v, k) in topicList" :key="k">{{
            v.topicName
          }}</a-radio-button>
        </span>
      </div>
      <div class="content-head-item add-bottom">
        <span
          >内容排序：
          <a-radio-group v-model="value" @change="onChange">
            <a-radio :value="0">点赞优先</a-radio>
            <a-radio :value="1">评论优先</a-radio>
            <a-radio :value="2">收藏优先</a-radio>
          </a-radio-group>
        </span>
      </div>
    </div>
    <div class="content-main">
      <a-list
        itemLayout="vertical"
        :dataSource="rankList"
        class="text-center"
        :pagination="pagination"
      >
        <a-list-item slot="header">
          <a-row>
            <a-col :span="2">共{{ list.length }}条</a-col>
            <a-col :span="18" style="text-align: left;">内容预览</a-col>
            <a-col :span="4">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <!-- 先分4列，第2列在分行 -->
          <a-row class="row-vertical-center">
            <!-- 第1列 id -->
            <a-col :span="2">
              {{ item.id }}
            </a-col>
            <!-- 第2列 主要信息 -->
            <a-col :span="12" style="text-align: left;">
              <!-- 标题 -->
              <a-row> 标题 : {{ item.title }} </a-row>
              <!-- 标签 -->
              <a-row>
                <a-tag
                  v-for="(v, k) in mytool.Unpack(item.label)"
                  :key="k"
                  color="blue"
                >
                  {{ v }}
                </a-tag>
                <a-tag color="red">
                  {{ item.topic }}
                </a-tag>
              </a-row>
              <!-- 文本信息 -->
              <a-row style="height: 40px;">
                {{ item.content }}
              </a-row>
              <!-- 其他账户信息和用户操作信息 -->
              <a-row class="row-horizontal-between">
                <!-- 头像 -->
                <a-col :xs="8" :lg="2">
                  <a-avatar icon="user" :src="mytool.Unpack(item.avatar)" />
                </a-col>
                <!-- 昵称 -->
                <a-col :xs="8" :lg="4">
                  {{ item.publisher_name }}
                </a-col>
                <!-- 时间 -->
                <a-col :xs="8" :lg="6">
                  {{ item.time }}
                </a-col>
                <!-- 用户操作信息 -->
                <a-col :xs="24" :lg="6" class="row-horizontal-around">
                  <span>
                    <a-icon type="star" />
                    {{ item.collections }}
                  </span>
                  |
                  <span>
                    <a-icon type="like" />
                    {{ item.like }}
                  </span>
                  |
                  <span>
                    <a-icon type="credit-card" />
                    {{ item.commentSum }}
                  </span>
                </a-col>
              </a-row>
            </a-col>
            <!-- 第3列 图片 -->
            <a-col :span="6">
              <a-avatar
                shape="square"
                :size="90"
                :src="imgValue"
                :alt="imgValue"
                icon="picture"
                v-for="(imgValue, imgIndex) in JSON.parse(item.img)"
                :key="imgIndex"
                style="margin: 5px; padding: 5px; border: 1px solid #D9D9D9"
              />
            </a-col>
            <!-- 第4列 管理员操作 -->
            <a-col :span="4">
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
  </div>
</template>

<script>
import { eatest } from "@/api/eatest";
import { Modal } from "ant-design-vue";

export default {
  name: "EatestFlow",
  data() {
    return {
      list: [],
      topicList: Set,
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getList(e);
        }
      },
      searchValue: "",
      value: 1,
      rankList: []
    };
  },
  methods: {
    async _getList(page) {
      let rm = null;
      if (this.searchValue != "") {
        rm = (await eatest.searchEatest(this.searchValue, page)).data;
        this.test.Log("eatest信息流-搜索", rm);
        if (rm.code != 0) {
          this.$message.info(rm.status);
          return;
        }
      } else {
        rm = (await eatest.list(page)).data;
        this.test.Log("eatest信息流-eatest", rm);
        if (rm.code != 0) {
          this.$message.info(rm.status);
          return;
        }
      }
      // 更新页面总数
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.list = rm.data.list;
      this.rankList = this.getRankList();
    },
    async _getTopicList(page) {
      const rm = (await eatest.listTopic(page)).data;
      this.test.Log("eatest信息流-topic", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新话题
      this.topicList = rm.data.list;
    },
    async _deleteE(id) {
      const rm = (await eatest.del(id)).data;
      this.test.Log("eatest信息流", rm);
      this.$message.info(rm.status);
    },
    getRankList() {
      // 按顺序排列list
      let rank = this.list;
      let rankFun = Function;
      switch (this.value) {
        case 0:
          rankFun = (a, b) => {
            return a.like - b.like;
          };
          break;
        case 1:
          rankFun = (a, b) => {
            return a.commentSum - b.commentSum;
          };
          break;
        case 2:
          rankFun = (a, b) => {
            return a.collections - b.collections;
          };
          break;
        default:
          rankFun = (a, b) => {
            return a.id - b.id;
          };
          break;
      }
      rank = rank.sort(rankFun);
      return rank.reverse();
    },
    onClickDel(id) {
      const that = this;
      Modal.confirm({
        title: "确认要下架这条内容吗？",
        content: "用户申诉后成功后才可操作还原",
        class: "warning",
        onOk() {
          that._deleteE(id).catch(err => that.$message.error(err.message));
          that._getList(that.pagination.current);
        }
      });
    },
    onSearch() {
      this._getList(this.pagination.current);
    },
    onChange() {
      this.rankList = this.getRankList();
    }
  },
  mounted() {
    this._getTopicList(0);
    this._getList(this.pagination.current);
  }
};
</script>

<style></style>
