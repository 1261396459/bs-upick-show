const Mock = require("mockjs");
const mAdmin = require("./m-admin.js");

Mock.mock("/manager/login", "post", mAdmin);
