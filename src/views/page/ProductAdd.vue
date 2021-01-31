<template>
  <div>
    <HeaderStep :current="current" />
    <BasicMessage v-if="current === 0" :form="form" @next="next" />
    <SaleMessage
      v-else-if="current === 1"
      :form="form"
      @next="next"
      @prev="prev"
    />
  </div>
</template> 

<script>
import HeaderStep from "@/components/ProductAddHeader.vue";
import BasicMessage from "@/components/BasicMessage.vue";
import SaleMessage from "@/components/SaleMessage.vue";
import productApi from "@/api/product.js";

export default {
  components: {
    HeaderStep,
    BasicMessage,
    SaleMessage,
  },
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        // 选择标签
        tags: [],
        price: "", //售价
        price_off: "", //折扣价
        unit: "", //计量单位
        inventory: "", //库存
        images: [], //图片
      },
    };
  },
  created() {
    // 如果时修改产品，路由参数中有产品信息
    // console.log(this.$route.params)
    if (this.$route.params) {
      this.form = this.$route.params;
    // console.log(this.form)
    // const {id} = this.$route.params
    // productApi.detail(id).then(res=>{
    //   this.form = res
    // })
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 修改产品
        if (this.$route.params.id) {
          productApi
            .edit({
              ...this.form,
            })
            .then(() => {
              this.$message.success("修改成功");
            });
        } else {
          // 添加产品
          productApi
            .add({
              ...this.form,
            })
            .then(() => {
              this.$message.success("新增成功");
            });
        }
        this.$router.push({
          name: "ProductList",
        });
      } else {
        this.current += 1;
      }
    },
    // 上一步
    prev() {
      this.current -= 1;
    },
  },
};
</script>