<template>
  <div class="product-list">
    <Search :category="categoryList" @submit="handleSubmit" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <Table 
        :data="tableData" 
        :page="page" 
        @change="changePage" 
        @edit="edit"
        @del="del"/>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Table from "@/components/ProductTable.vue";
import productApi from "@/api/product.js";
import categoryApi from "@/api/category.js";

export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 1,
        showSizeChanger: true,
      },
      categoryObj: {},
      categoryList: [],
      searchValue: {},
    };
  },
  methods: {
    // 搜索函数
    handleSubmit(value) {
      this.searchValue = value;
      this.getTableData();
    },
    // 获取数据
    getTableData() {
      productApi
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchValue,
        })
        .then((res) => {
          //   给返回数据添加key属性
          //   封装category属性
          this.page.total = res.total;
          this.tableData = res.data.map((item) => {
            return {
              ...item,
              // key: item.id,
              // -1是因为category是数组，下标与id值差1     也可将category换成对象存储数据
              categoryName: this.categoryObj[item.category].name,
            };
          });
        });
    },
    // 分页触发函数
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    // 编辑产品
    edit(record){
      this.$router.push({
        name: 'ProductEdit',
        params: record
      })
    },
    // 删除产品
    del(record){
      console.log(record)
        this.$confirm({
          title:'确认删除',
          content:()=><div style="color:red;"> { `确认删除${record}的商品吗?`}</div>,
          onOk:()=>{
            productApi.remove(record.id).then(()=>{
              this.getTableData()
            })
          },
          onCancel:()=>{
            console.log('取消')
          },
          class:'confirm-box'
        })
    }
  },

  async created() {
    // 获取类目数据
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
};
</script>

<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>