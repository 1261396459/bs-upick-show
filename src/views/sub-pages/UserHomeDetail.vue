<template>
  <div>
    <div class="content-head" tip="内容head">
      <div class="content-head-item add-bottom">
        <BreadCrumb :bcList="['当前页面']"></BreadCrumb>
        <a-button @click="onDelEatest(one.id)">下架</a-button>
      </div>
    </div>
    <div class="main-adjust">
      <div class="leftSector">
        <div>
          <a-avatar
            shape="square"
            style="margin: 5px; padding: 5px; height: 500px; width: 400px;"
            :src="mytool.Unpack(one.img)[defaultImg]"
          />
        </div>
        <div>
          <a-avatar
            shape="square"
            :size="90"
            :src="imgValue"
            :alt="imgValue"
            icon="picture"
            v-for="(imgValue, imgIndex) in mytool.Unpack(one.img)"
            :key="imgIndex"
            style="margin: 5px; padding: 5px; border: 1px solid #D9D9D9"
            @click="
              e => {
                defaultImg = imgIndex;
              }
            "
          />
        </div>
      </div>
      <div class="rightSector">
        <div class="perInfor">
          <div class="title col-gapping">{{ one.title }}</div>
          <div class="content col-gapping">{{ one.content }}</div>
          <div class="row-horizontal-between col-gapping">
            <div>
              <a-tag
                v-for="(v, k) in mytool.Unpack(one.label)"
                :key="k"
                color="blue"
              >
                {{ v }}
              </a-tag>
            </div>
            <a-tag color="red">{{ one.topic }}</a-tag>
          </div>
          <div class="row-horizontal-between">
            <StatusBar
              :avatarSrc="mytool.Unpack(one.avatar)"
              :name="one.nickname"
            />
            <div class="time">{{ one.time }}</div>
          </div>
        </div>
        <div class="">
          <div class="title">评论{{ list.length }}</div>
          <div class="row-horizontal-between" v-for="(v, k) in list" :key="k">
            <StatusBar
              :avatarSrc="mytool.Unpack(v.fromAvatar)"
              :name="v.fromName"
            />
            <span class="content">{{ v.content }}</span>
            <span class="time">{{ v.time }}</span>
            <MyLink @click.native="onDelComment(v.id)">下架</MyLink>
            <div
              v-for="(item, index) in v.reply"
              :key="index"
              style="margin-left: 5px;"
            >
              <StatusBar
                :avatarSrc="mytool.Unpack(item.fromAvatar)"
                :name="item.fromName"
              />
              <span>回复</span>
              <StatusBar
                :avatarSrc="mytool.Unpack(item.toAvatar)"
                :name="item.toName"
              />
              <span class="content">{{ item.content }}</span>
              <span class="time">{{ item.time }}</span>
              <MyLink @click.native="onDelComment(item.id)">下架</MyLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detail } from "@/api/detail.js";
import StatusBar from "@/components/StatusBar.vue";
import { Modal } from "ant-design-vue";

export default {
  name: "UserHomeDetail",
  components: {
    StatusBar
  },
  data() {
    return {
      myid: 0,
      one: {},
      list: [],
      pagination: {
        total: 1,
        pageSize: 10 // 每页 10 item
      },
      isEatest: true,
      myModal: false,
      defaultImg: 0
    };
  },
  methods: {
    async _getOne() {
      const rm = (await detail.one(this.myid)).data;
      this.test.Log("eatest详情-me", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新状态
      this.one = rm.data;
    },
    async _getList() {
      const rm = (await detail.list(this.myid)).data;
      this.test.Log("eatest详情-list", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新状态
      this.list = rm.data.list;
    },
    async _deleteE(id) {
      const rm = (await detail.delEatest(id)).data;
      this.$message.info(rm.status);
    },
    async _deleteC(id) {
      const rm = (await detail.delComment(id)).data;
      this.$message.info(rm.status);
    },
    onDelEatest(id) {
      const that = this;
      Modal.confirm({
        title: "确认要下架这条内容吗？",
        content: "用户申诉后成功后才可操作还原",
        class: "warning",
        onOk() {
          that._deleteE(id).catch(err => that.$message.error(err.message));
          that.$router.go(-1);
        }
      });
    },
    onDelComment(id) {
      const that = this;
      Modal.confirm({
        title: "确认要下架这条内容吗？",
        content: "用户申诉后成功后才可操作还原",
        class: "warning",
        onOk() {
          that._deleteC(id).catch(err => that.$message.error(err.message));
          that._getList();
        }
      });
    }
  },
  mounted() {
    this.myid = this.$route.query.id;
    this._getOne();
    this._getList();
  },
  watch: {}
};
</script>

<style scoped lang="less">
@import url("../../main.less");
.main-adjust {
  .row-horizontal-around();
}
.leftSector {
  margin: @baseMargin;
  background-color: @themeContent;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-right: 50px;
}
.rightSector {
  margin: @baseMargin;
  background-color: @themeContent;
  width: 40%;
}
.col-gapping {
  margin-bottom: 8px;
}
.perInfor {
  display: block;
  padding: 12px;
  box-shadow: 0px 0 5px 0 #bdbdbd; /*阴影*/
}
.title {
  font-size: 16px;
  font-family: "PingFangSC-Medium";
}
.content {
  .row-vertical-center();
  font-size: 12px;
  font-family: "PingFangSC-Regular";
}
.time {
  font-size: 12px;
  color: gray;
  font-family: "HelveticaNeue";
}
</style>
