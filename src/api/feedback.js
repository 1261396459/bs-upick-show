import { client } from "./base.js";

export const feedback = {
  /**
   * 获取用户eatest列表
   */
  listEatest(page) {
    return client.get("/manager/eatestReview/list/" + page + "/evaluation");
  },

  /**
   * 获取用户comment列表
   */

  listComment(page) {
    return client.get("/manager/eatestReview/list/" + page + "/comment");
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
      status: "2"
    });
  },

  /**
   * 通过用户eatest
   */

  passEatest(id) {
    return client.put("/manager/eatestReview/" + id + "/evaluationStatus", {
      status: "1"
    });
  },

  /**
   * 通过用户comment
   */

  passComment(id) {
    return client.put("/manager/eatestReview/" + id + "/commentStatus", {
      status: "1"
    });
  }
};
