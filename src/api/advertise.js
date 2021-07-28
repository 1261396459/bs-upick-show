import { client } from "./base.js";

export const advertise = {
  /**
   * 获取举报列表
   */
  list(page, status) {
    return client.get("/manager/appeal/list/" + page + "/" + status);
  },

  /**
   * 无效
   */
  pass(id, status) {
    return client.put("/manager/appeal/" + id + "/status", {
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
