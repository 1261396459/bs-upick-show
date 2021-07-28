import { client } from "./base.js";

export const manager = {
  /**
   * 添加管理员
   * @param {String,String,String} stu_id 学号 department 部门 level 权限
   */
  add(stu_id, department, level) {
    return client.post("/manager/", {
      stu_id,
      department,
      level
    });
  },

  /**
   * 删除管理员
   * @path id 管理员唯一id
   */
  del(id) {
    return client.delete("/manager/" + id);
  },

  /**
   * 获取管理员列表
   */
  list() {
    return client.get("/manager/list");
  },

  /**
   * 编辑管理员
   * @path id 管理员唯一id
   * @param {String,String} department 部门
   */
  update(id, department, level) {
    return client.put("/manager/" + id, {
      department,
      level
    });
  },

  /**
   * 管理员登陆
   * @param {String,String} stu_id 学号 password 密码
   */
  login(stu_id = "", password = "") {
    return client.post("/manager/login", {
      stu_id,
      password
    });
  },

  /**
   * 登陆检查
   */
  loginCheck() {
    return this.list();
  }
};
