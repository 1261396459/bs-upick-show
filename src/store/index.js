import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let noLog = {
  isLogin: false,
  id: "",
  name: "",
  level: "",
  stu_id: ""
};

export default new Vuex.Store({
  state: {
    token: noLog
  },
  mutations: {
    LOGIN: (state, data) => {
      //更改token的值
      state.token = data;
      state.token["isLogin"] = true;
      sessionStorage.setItem("id", state.token.id);
      sessionStorage.setItem("nickname", state.token.name);
    },
    LOGOUT: state => {
      //登出的时候要清除token
      state.token = noLog;
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("nickname");
    }
  },
  actions: {
    UserLogin({ commit }, data) {
      commit("LOGIN", data);
    },
    UserLogout({ commit }) {
      commit("LOGOUT");
    }
  },
  modules: {}
});
