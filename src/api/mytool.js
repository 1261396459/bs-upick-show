export const test = {
  // 测试工具
  // 控制台日志
  Log(str, obj) {
    if (process.env.VUE_APP_NODE_ENV === "development")
      window.console.log(str, obj);
  }
};

export const mytool = {
  // 自封装工具
  // 解析JSON包
  Unpack(str) {
    if (str) {
      return JSON.parse(str);
    }
    return "";
  }
};
