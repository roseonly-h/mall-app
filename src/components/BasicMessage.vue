<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :label-col="labelCol"
    :rules="rules"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input placeholder="请输入商品标题" v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input
        type="textarea"
        placeholder="请输入商品描述"
        v-model="form.desc"
      />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category">
      <a-select
        placeholder="时令水果"
        @change="changeCategory"
        v-model="form.category"
      >
        <a-select-option :value="c.id" v-for="c in categoryList" :key="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select placeholder="苹果" v-model="form.c_items">
        <a-select-option :value="c" v-for="c in categoryItem" :key="c">
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        placeholder="Please select"
        :default-value="['包邮，最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮，最晚次日达"
          >包邮，最晚次日达</a-select-option
        >
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
      <a-button type="primary" @click="next"> 下一步 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import categoryApi from "@/api/category.js";

export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      //   类目集合
      categoryList: [],
      //   子类目集合
      categoryItem: [],
      rules: {},
    };
  },
  props: ["form"],
  created() {
    // 获取类目集合
    categoryApi.list().then((res) => {
      // console.log(res);
      this.categoryList = res.data;
    });
  },
  methods: {
    //   当类目发生变化时，触发的函数
    changeCategory(value) {
      // 根据选择的类目，获取其子类目
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id == value) {
          // 找到相应的子类目
          this.categoryItem = this.categoryList[i].c_items;
        }
      }
    },
    // 下一步
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
        //   console.log(this.form);
          return true;
        }
        console.log("error submit!!");
        return false;
      });
    },
  },
};
</script>

<style lang="less">
</style>