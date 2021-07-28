<template>
  <div>
    <CAdM
      v-if="myModal"
      v-model="myModal"
      :isAdd="myAdd"
      :myid="myid + ''"
      :mysid="mysid"
    />
    <div class="content-head" tip="内容head">
      <BreadCrumb
        class="content-head-item"
        :bcList="['帐号管理', '当前页面']"
      ></BreadCrumb>
      <span class="content-head-item add-bottom page-tip">管理员管理</span>
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
            <a-col :span="6">成员姓名</a-col>
            <a-col :span="6">权限</a-col>
            <a-col :span="6">所属部门</a-col>
            <a-col :span="6">操作</a-col>
          </a-row>
        </a-list-item>
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-row>
            <a-col :span="6">{{ item.name }}</a-col>
            <a-col :span="6">{{ item.level }}</a-col>
            <a-col :span="6">{{ item.department }}</a-col>
            <a-col :span="6">
              <MyLink @click.native="editAd(item.id, item.stu_id)">编辑</MyLink>
              <span>|</span>
              <MyLink @click.native="_deleteAd(item.id)">删除</MyLink>
            </a-col>
          </a-row>
        </a-list-item>
        <a-list-item slot="footer">
          <a-button type="dashed" class="btm" @click="addAd">
            <a-icon type="plus-square" />新增成员
          </a-button>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { manager } from "@/api/manager";
import CAdM from "@/components/modal/CAdM.vue";

export default {
  name: "ControlAdminer",
  components: {
    CAdM
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
      myModal: false,
      myAdd: false,
      myid: null,
      mysid: null
    };
  },
  methods: {
    async _getList() {
      const rm = (await manager.list()).data;
      this.test.Log("管理员管理", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新页面总数
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.list = rm.data.list;
    },
    addAd() {
      this.myid = null;
      this.mysid = null;
      this.myAdd = true;
      this.myModal = true;
    },
    editAd(id, stuid) {
      this.myid = id;
      this.mysid = stuid;
      this.myAdd = false;
      this.myModal = true;
    },
    async _deleteAd(id) {
      const rm = (await manager.del(id)).data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      this._getList();
    }
  },
  mounted() {
    this._getList();
  },
  watch: {
    myModal: function() {
      this._getList();
    }
  }
};
</script>

<style>
.btm {
  width: 80%;
  margin: 10px 0px;
}
</style>
