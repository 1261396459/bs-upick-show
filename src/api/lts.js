import { client } from "./base.js";

export const lts = {
  /**
   * 获取话题
   */
  listTopic(page) {
    return client.get("/topic/list/" + page);
  },

  /**
   * 获取标签
   */

  listLabel() {
    return client.get("/label/list");
  },

  /**
   * 添加标签
   */

  addLabel(labelName, type) {
    return client.post("/manager/label", {
      labelName,
      type
    });
  },

  /**
   * 添加话题
   */

  addTopic(topicName, isTop) {
    return client.post("/manager/topic", {
      topicName,
      isTop
    });
  },

  /**
   * 删除话题
   */

  delTopic(id) {
    return client.delete("/manager/topic/" + id);
  },

  /**
   * 删除标签
   */

  delLabel(id) {
    return client.delete("/manager/label/" + id);
  },

  /**
   * 置顶话题
   */

  topTopic(id) {
    return client.put("/manager/topic/" + id + "/topOrder");
  }
};
