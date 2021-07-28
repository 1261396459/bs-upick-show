import { client } from "./base.js";

export const user = {
  /**
   * 获取用户列表
   */
  list(page) {
    return client.get("/manager/user/list/" + page);
  },

  /**
   * 编辑用户
   * @path id 用户唯一id
   * @param {String} status 禁言状态
   */
  update(id, status) {
    return client.put("manager/user/" + id + "/status", {
      status
    });
  },

  search(index, page, status) {
    return client.get("/manager/user/" + index + "/" + page + "/" + status);
  }
};
