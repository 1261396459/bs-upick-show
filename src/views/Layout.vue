<template>
  <a-layout class="page">
    <a-layout-sider class="page-sider" breakpoint="lg" collapsed-width="0">
      <span class="sider-title">Upick-后台管理系统</span>
      <SideBar
        :defaultSelectedKeys="menuDefaultSelectedKeys"
        :defaultOpenKeys="menuDefaultOpenKeys"
        :menu="menu"
      />
    </a-layout-sider>

    <a-layout class="page">
      <a-layout-header class="page-header" style="background-color: #ffffff;">
        <a-button type="link" @click="onClickLogout"> 登出 </a-button>
        <StatusBar />
      </a-layout-header>
      <a-layout-content class="page" style="overflow-y: scroll;">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import StatusBar from "@/components/StatusBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "Layout",
  components: {
    SideBar,
    StatusBar
  },
  data() {
    return {
      isLogin: false,
      // 菜单数组，存储子菜单和菜单对象
      menu: [
        {
          key: "eatest",
          title: "Eatest",
          iconType: "camera",
          children: [
            {
              key: "flow",
              title: "信息流"
            },
            {
              key: "essay",
              title: "专栏"
            },
            {
              key: "eatest-set",
              title: "话题标签设置"
            }
          ]
        },
        {
          key: "feedback-content",
          title: "内容反馈",
          iconType: "book",
          children: [
            {
              key: "examine",
              title: "Eatest审核"
            },
            {
              key: "tip-off",
              title: "举报受理"
            },
            {
              key: "appeal",
              title: "用户申诉"
            }
          ]
        },
        {
          key: "control-account",
          title: "帐号管理",
          iconType: "scissor",
          children: [
            {
              key: "user",
              title: "用户管理"
            },
            {
              key: "adminer",
              title: "管理员管理"
            }
          ]
        },
        {
          key: "control-advertisement",
          title: "广告管理",
          iconType: "scissor",
          children: [
            {
              key: "advertise",
              title: "Eatest广告管理"
            }
          ]
        }
      ],
      menuDefaultSelectedKeys: ["flow"],
      menuDefaultOpenKeys: []
    };
  },
  methods: {
    onClickLogout() {
      this.$store.commit("logout");
      this.$router.replace("/login");
    }
  },
  mounted() {
    // 登录检查
    this.isLogin = this.$store.state.token.isLogin;
    if (!this.isLogin) {
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="less">
.sider-title {
  display: block; /*块级属性 使padding生效*/
  padding: 10px;
  text-align: center;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap; /* 禁止换行 */
}

.page-sider {
  box-shadow: 3px 0 5px 0 #bdbdbd; /*阴影*/
}

.page-header {
  box-shadow: inset 0px -1px 0px 0px #bdbdbd; /*阴影*/
  display: flex;
  flex-direction: row-reverse; /*flex元素反向*/
  align-items: center;
}
</style>
