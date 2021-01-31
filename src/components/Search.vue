<template>
  <a-form
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
    style="padding: 5px 10px"
  >
    <a-form-item label="搜索关键字">
      <a-input v-model="searchForm.searchWord" />
    </a-form-item>
    <a-form-item label="商品类目">
      <a-select
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleSelectChange"
        allowClear
      >
        <a-select-option v-for="c in category" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        searchWord: "",
        category: 0,
      },
    };
  },
  props: ["category"],
  methods: {
    handleSubmit() {
      this.$emit("submit", this.searchForm);
    },
    handleSelectChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>