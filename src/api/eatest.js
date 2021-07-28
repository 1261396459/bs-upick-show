import { client } from "./base.js";

export const eatest = {
  /**
   * 获取用户状态
   */
  one(uid) {
    return client.get("/manager/user/" + uid);
  },

  /**
   * 获取全部eatest列表
   */
  list(page) {
    return client.get("/eatest/list/" + page);
  },

  /**
   * 获取话题
   */
  listTopic(page) {
    return client.get("/topic/list/" + page);
  },

  /**
   * 下架用户eatest
   */
  del(id) {
    return client.put("/manager/eatestReview/" + id + "/evaluationStatus", {
      status: "2"
    });
  },

  /**
   * 查看某具体eatest
   */
  oneEatest(id) {
    return client.get("/eatest/" + id);
  },

  /**
   * 模糊搜索eatest
   */
  searchEatest(index, page) {
    return client.get("/eatest/fuzzySearch/" + index + "/" + page);
  }
};
