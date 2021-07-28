<template>
  <div>
    <CUM
      v-if="myModal"
      v-model="myModal"
      :myid="myid + ''"
      :mystatus="mystatus + ''"
    ></CUM>
    <div class="content-head" tip="内容head">
      <BreadCrumb
        class="content-head-item"
        :bcList="['帐号管理', '当前页面']"
      ></BreadCrumb>
      <div class="content-head-item add-bottom page-tip">
        <span>用户管理</span>
        <a-input-search
          style="width: 40%;"
          v-model="searchValue"
          placeholder="请输入"
          enter-button="搜索"
          @search="onSearch"
          allow-clear
        />
        <a-checkbox v-model="isNormal">状态异常</a-checkbox>
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
            <a-col :span="2"> 共{{ list.length }}条 </a-col>
            <a-col :span="4">用户</a-col>
            <a-col :span="4">学号</a-col>
            <a-col :span="3">发帖数</a-col>
            <a-col :span="5">状态</a-col>
            <a-col :span="6">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item
          slot="renderItem"
          slot-scope="item, index"
          :key="index"
          v-if="item.status != 0 || !isNormal"
        >
          <a-row>
            <a-col :span="2">{{ item.id }}</a-col>
            <a-col :span="4">
              {{ item.nickname }}
            </a-col>
            <a-col :span="4">
              {{ item.stu_id }}
            </a-col>
            <a-col :span="3">
              {{ item.eatestSum }}
            </a-col>
            <a-col :span="5">
              {{ theStatus(item.status) }}
            </a-col>
            <a-col :span="6">
              <MyLink @click.native="editU(item.id, item.status)">
                更改状态
              </MyLink>
              <span>|</span>
              <MyLink @click.native="lookU(item.id)">查看</MyLink>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { user } from "@/api/user";
import CUM from "@/components/modal/CUM.vue";

export default {
  name: "ControlUser",
  components: {
    CUM
  },
  data() {
    return {
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getList(e);
        }
      },
      list: [],
      searchValue: "",
      myModal: false,
      myid: "",
      mystatus: "",
      isNormal: false
    };
  },
  methods: {
    async _getList(page) {
      let rm = null;
      if (this.searchValue != "") {
        rm = (await user.search(this.searchValue, page, this.isN)).data;
        this.test.Log("用户管理-搜索", rm);
        if (rm.code != 0) {
          this.$message.info(rm.status);
          return;
        }
      } else {
        rm = (await user.list(page)).data;
        this.test.Log("用户管理", rm);
        if (rm.code != 0) {
          this.$message.info(rm.status);
          return;
        }
      }
      // 更新页面总数
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.list = rm.data.list;
    },
    editU(id, status) {
      this.myid = id;
      this.mystatus = status;
      this.myModal = true;
    },
    lookU(id) {
      this.$router.push({
        path: "/home",
        query: { id }
      });
    },
    onSearch() {
      if (this.searchValue.length > 20) {
        this.$message.warn("超过20长度限制,请重新输入");
        return;
      }
      this._getList(this.pagination.current);
    },
    theStatus(e) {
      let s = "";
      switch (e) {
        case 0:
          s = "正常";
          break;
        case 1:
          s = "禁言一天";
          break;
        case 2:
          s = "禁言三天";
          break;
        case 3:
          s = "永久禁言";
          break;
        default:
          s = "未知的状态";
          break;
      }
      return s;
    }
  },
  mounted() {
    this._getList(1);
  },
  watch: {
    myModal: function() {
      this._getList(this.pagination.current);
    }
  },
  computed: {
    isN: function() {
      let clf = 0;
      if (this.isNormal) {
        clf = 1;
      }
      return clf;
    }
  }
};
</script>

<style></style>
