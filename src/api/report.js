import { client } from "./base.js";

export const report = {
  /**
   * 获取举报列表
   */
  list(page, status) {
    return client.get("/manager/report/list/" + page + "/" + status);
  },

  /**
   * 无效
   */
  pass(id, status) {
    return client.put("/manager/report/" + id + "/status", {
      status
    });
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
