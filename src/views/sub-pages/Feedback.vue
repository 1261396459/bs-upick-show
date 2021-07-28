<template>
  <div>
    <div class="content-head" tip="内容head">
      <div class="content-head" tip="内容head">
        <BreadCrumb
          class="content-head-item"
          :bcList="['当前页面']"
        ></BreadCrumb>

        <div class="content-head-item">
          <div class="head-select">
            <a-radio-group v-model="isEatest">
              <a-radio-button :value="true">内容</a-radio-button>
              <a-radio-button :value="false">评论</a-radio-button>
            </a-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="content-main">
      <EatestList v-if="isEatest"></EatestList>
      <CommentList v-else></CommentList>
    </div>
  </div>
</template>

<script>
import EatestList from "./FeedbackSub/EatestList.vue";
import CommentList from "./FeedbackSub/CommentList.vue";

export default {
  name: "Feedback",
  components: {
    EatestList,
    CommentList
  },
  data() {
    return {
      isEatest: true
    };
  }
};
</script>

<style></style>
