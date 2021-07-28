# upick-bs-cloud

> 拱拱后台前端项目

## 项目部署
### 环境下载
[npm](https://nodejs.org/en/download/)包管理工具

### 依赖安装
```bash
npm install
```
### 调试编译
```
npm run dev
```

### 生成编译
```
npm run prod
```

### 附录
[远程仓库平台](https://git.sky31.com/users/sign_in)
- 项目负责人QQ: 1486791263
- 项目前端QQ: 1261396459
- 后台后端QQ: 904824669

### 工程结构
    │  App.vue            应用配置
    │  main.js            初始化入口文件
    │  main.less          全局样式表	
    │
    ├─api                 js接口模块
    │      base.js        axios配置	
    │      mytool.js      自定义工具模块
    │      其他.js        对接后端接口模块
    |
    ├─assets              静态资源文件
    │
    ├─components          vue组件
    │  └─modal            对话框组件
    │
    ├─mock                劫持后端接口，本地数据测试配置
    │
    ├─router              路由配置	
    │
    ├─store               状态管理配置
    │
    └─views               页面存放目录
        │  Layout.vue     单页面应用的布局框架
        │  LogIn.vue      登录页
        │
        └─sub-pages       作用于Layout的子页面组件