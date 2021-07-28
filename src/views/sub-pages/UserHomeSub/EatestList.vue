<template>
  <div>
    <a-list
      class="text-center"
      itemLayout="vertical"
      :dataSource="eatestList"
      :pagination="pagination"
    >
      <a-list-item slot="header">
        <a-row>
          <a-col :span="2">共{{ eatestList.length }}条</a-col>
          <a-col :span="18">内容预览</a-col>
          <a-col :span="4">操作</a-col>
        </a-row>
      </a-list-item>
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <!-- 先分4列，第2列在分行 -->
        <a-row>
          <!-- 第1列 id -->
          <a-col :span="2">
            {{ item.id }}
          </a-col>
          <!-- 第2列 主要信息 -->
          <a-col :span="12">
            <!-- 标题 -->
            <a-row class="preview-row" style="font-size: 16px;">
              标题 : {{ item.title }}
            </a-row>
            <!-- 标签 -->
            <a-row class="preview-row">
              <a-tag
                v-for="(v, k) in mytool.Unpack(item.label)"
                :key="k"
                color="blue"
              >
                {{ v }}
              </a-tag>
              <a-tag color="red">
                {{ item.topic }}
              </a-tag>
            </a-row>
            <!-- 文本信息 -->
            <a-row class="preview-row" style="height: 40px;">
              {{ item.content }}
            </a-row>
            <!-- 其他账户信息和用户操作信息 -->
            <a-row class="preview-row" justify="space-around">
              <!-- 头像 -->
              <a-col :xs="8" :lg="2">
                <a-avatar
                  flex="auto"
                  icon="user"
                  :src="mytool.Unpack(item.fromAvatar)"
                />
              </a-col>
              <!-- 昵称 -->
              <a-col :xs="8" :lg="4">
                {{
                  item.publisher_name !== "" ? item.publisher_name : "暂无昵称"
                }}
              </a-col>
              <!-- 时间 -->
              <a-col :xs="8" :lg="6">
                {{ item.time ? item.time.split(" ")[0] : "" }}
              </a-col>
              <!-- 用户操作信息 -->
              <a-col :xs="24" :lg="6">
                <a-icon type="star" />
                {{ item.collections }}
                <a-icon type="like" />
                {{ item.like ? item.like : "0" }}
                <a-icon type="credit-card" />
                {{ item.commentSum ? item.commentSum : "0" }}
              </a-col>
            </a-row>
          </a-col>
          <!-- 第3列 图片 -->
          <a-col :span="6">
            <a-avatar
              shape="square"
              :size="90"
              :src="imgValue"
              :alt="imgValue"
              icon="picture"
              v-for="(imgValue, imgIndex) in JSON.parse(item.img)"
              :key="imgIndex"
              style="margin: 10px; padding: 5px; border: 1px solid #D9D9D9"
            />
          </a-col>
          <!-- 第4列 管理员操作 -->
          <a-col :span="4">
            <MyLink
              @click.native="
                $router.push({
                  path: 'detail',
                  query: {
                    id: item.id
                  }
                })
              "
              >查看</MyLink
            >
            <span>|</span>
            <MyLink @click.native="onClickDel(item.id)">下架</MyLink>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { personal } from "@/api/personal.js";
import { Modal } from "ant-design-vue";

export default {
  name: "UserHomepageEatest",
  components: {},
  props: {
    mystu: String
  },
  data() {
    return {
      pagination: {
        total: 10000, //一共的数据量
        current: 1,
        pageSize: 10, // 每页 10 item
        onChange: e => {
          this.pagination.current = e;
          this._getEatest(this.mystu, e);
        }
      },
      eatestList: [],
      myModal: false
    };
  },
  methods: {
    async _getEatest(id, page) {
      const rm = (await personal.listEatest(id, page)).data;
      this.test.Log("用户主页-Eatest", rm);
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
      // 更新页面总数
      this.pagination.pageSize = rm.data.limit;
      this.pagination.total = rm.data.total;
      this.eatestList = rm.data.msg;
    },
    async _deleteE(id) {
      const rm = (await personal.delEatest(id)).data;
      if (rm.code != 0) {
        this.$message.info(rm.status);
        return;
      }
    },
    onClickDel(id) {
      const that = this;
      Modal.confirm({
        title: "确认要下架这条内容吗？",
        content: "用户申诉后成功后才可操作还原",
        class: "warning",
        onOk() {
          that._deleteE(id).catch(err => that.$message.error(err.message));
          that._getEatest(that.mystu, that.pagination.current);
        }
      });
    }
  },
  mounted() {
    if (this.mystu) this._getEatest(this.mystu, this.pagination.current);
  },
  watch: {
    mystu: function() {
      this._getEatest(this.mystu, this.pagination.current);
    }
  }
};
</script>

<style></style>
