<template>
  <div>
    <div class="content-head content-head-item add-bottom" tip="内容head">
      <BreadCrumb :bcList="['Eatest', '当前页面']"></BreadCrumb>
      <a-button @click="upload">上传</a-button>
    </div>
    <div class="content-main">
      <div id="editor"></div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default {
  name: "Column",
  data() {
    return {
      value: null,
      quill: null,
      toolbarOptions: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
        ["link", "image", "video"]
      ]
    };
  },
  methods: {
    upload() {
      this.value = this.quill.getContents();
      this.test.Log("专栏", this.value);
      this.$message.warn("暂未实现");
    }
  },
  mounted() {
    let editorDom = this.$el.querySelector("#editor");
    this.quill = new Quill(editorDom, {
      modules: {
        toolbar: this.toolbarOptions
      },
      theme: "snow"
    });
  }
};
</script>

<style></style>
