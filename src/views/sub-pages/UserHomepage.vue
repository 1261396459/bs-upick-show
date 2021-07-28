<template>
  <div>
    <CUM
      v-if="myModal"
      v-model="myModal"
      :myid="one.id + ''"
      :mystatus="one.status + ''"
    ></CUM>
    <div class="content-head" tip="内容head">
      <BreadCrumb class="content-head-item" :bcList="['当前页面']"></BreadCrumb>

      <div class="content-head-item">
        <div class="head-select">
          <a-radio-group v-model="isEatest">
            <a-radio-button :value="true">eatest</a-radio-button>
            <a-radio-button :value="false">评论</a-radio-button>
          </a-radio-group>
        </div>

        <div class="head-item-adjust">
          <a-row style="font-size: 12px; white-space: nowrap;">
            <a-col :span="12">
              <p>发帖量：{{ one.eatestSum }}</p>
              <p>评论量：{{ one.commentSum }}</p>
            </a-col>
            <a-col :span="12">
              <p>收获点赞：{{ one.likedSum }}</p>
              <p>被收藏量：{{ one.collectedSum }}</p>
            </a-col>
          </a-row>
          <StatusBar
            :avatarSrc="mytool.Unpack(one.avatar)"
            :name="one.nickname"
          />
          <span>{{ one.stu_id }}</span>
          <a-button
            @click="
              () => {
                this.myModal = true;
              }
            "
          >
            状态
          </a-button>
        </div>
      </div>
    </div>
    <div class="content-main">
      <EatestList v-if="isEatest" :mystu="mystu"></EatestList>
      <CommentList v-else :mystu="mystu"></CommentList>
    </div>
  </div>
</template>

<script>
import { personal } from "@/api/personal.js";
import EatestList from "./UserHomeSub/EatestList.vue";
import CommentList from "./UserHomeSub/CommentList.vue";
import CUM from "@/components/modal/CUM.vue";
import StatusBar from "@/components/StatusBar.vue";

export default {
  name: "UserHomepage",
  components: {
    EatestList,
    CommentList,
    CUM,
    StatusBar
  },
  data() {
    return {
      mystu: "",
      one: {},
      pagination: {
        total: 1,
        pageSize: 10 // 每页 10 item
      },
      isEatest: true,
      myModal: false
    };
  },
  methods: {
    async _getMe() {
      const rm = (await personal.one(this.mystu)).data;
      this.test.Log("用户主页", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新状态
      this.one = rm.data[0];
    }
  },
  mounted() {
    this.mystu = this.$route.query.id;
    this._getMe();
  },
  watch: {}
};
</script>

<style>
.head-item-adjust {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 40%;
}
</style>
