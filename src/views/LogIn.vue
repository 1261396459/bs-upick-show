<template>
  <a-form class="login-form">
    <a-form-item>
      <img src="@/assets/loadlogo.png" />
    </a-form-item>
    <a-form-item>
      <a-input class="login-width" placeholder="用户名" v-model="username">
        <span slot="prefix">
          <a-icon type="user"></a-icon>
        </span>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        class="login-width"
        placeholder="密码"
        v-model="password"
      >
        <span slot="prefix">
          <a-icon type="lock"></a-icon>
        </span>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        class="login-width"
        type="primary"
        :loading="isLoginLoading"
        @click="onLogin"
        @keydown="enterKey"
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script>
import { manager } from "@/api/manager";
export default {
  data() {
    return {
      username: "",
      password: "",
      isLoginLoading: false
    };
  },
  created() {
    this._loginCheck().catch(err => this.$message.error(err.message));
  },
  methods: {
    onLogin() {
      const username = this.username;
      const password = this.password;
      // 捕获登录访问api异常并用【全局消息】显示
      this._login(username, password).catch(err => {
        this.isLoginLoading = false;
        this.$message.error(err.message);
      });
    },
    enterKey(e) {
      if (e.keyCode == 13) {
        this.onLogin();
      }
    },
    async _login(acc, pass) {
      this.isLoginLoading = true;
      let rm = (await manager.login(acc, pass)).data;
      this.test.Log("登录页", rm);
      let nickname = rm.data.name;
      let id = rm.data.id;
      if (rm.code === 0) {
        // 登录成功后跳转到首页
        this.$store.commit("LOGIN", {
          id,
          nickname
        }); // 无头像
        this.$router.replace("/");
        return;
      }
      this.isLoginLoading = false;
      this.$message.info(JSON.stringify(rm));
    },
    async _loginCheck() {
      const data = (await manager.loginCheck()).data;
      if (data.code !== 6) {
        let nickname = sessionStorage.getItem("nickname");
        let id = sessionStorage.getItem("id");
        // 存储数据存在则跳转
        if (id !== null || nickname !== null) {
          this.$store.commit("LOGIN", {
            id,
            nickname
          });
          this.$router.replace("/");
        }
      }
    }
  }
};
</script>

<style>
.login-form {
  width: 90%;
  height: 90%;
  max-width: 500px;
  max-height: 600px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-width {
  width: 100%;
}
</style>
