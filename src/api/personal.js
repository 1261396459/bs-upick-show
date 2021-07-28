import { client } from "./base.js";

export const personal = {
  /**
   * 获取用户状态
   */
  one(uid) {
    return client.get("/manager/user/" + uid);
  },

  /**
   * 获取用户eatest列表
   */
  listEatest(uid, page) {
    return client.get("/eatest/" + uid + "/" + page);
  },

  /**
   * 获取用户comment列表
   */

  listComment(uid, page) {
    return client.get("/eatest/comment/" + uid + "/" + page);
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
   * 查看某具体eatest
   */

  oneEatest(id) {
    return client.get("/eatest/" + id);
  }
};
