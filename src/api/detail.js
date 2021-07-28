import { client } from "./base.js";

export const detail = {
  /**
   * 获取用户状态
   */
  one(uid) {
    return client.get("/eatest/" + uid);
  },

  /**
   * 获取全部eatest列表
   */
  list(uid) {
    return client.get("/eatest/" + uid + "/comments");
  },

  /**
   * 下架用户eatest
   */
  delEatest(id) {
    return client.put("/manager/eatestReview/" + id + "/evaluationStatus", {
      status: "2"
    });
  },

  /**
   * 下架用户comment
   */
  delComment(id) {
    return client.put("/manager/eatestReview/" + id + "/commentStatus", {
      handleStatus: "2"
    });
  }
};
