<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 14 }"
  >
    <a-form-model-item label="商品售价" prop="price" required>
      <a-input placeholder="请输入价格 如: 70.00" v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="商品折扣价" prop="desc">
      <a-input placeholder="商品折扣价 如: 9.99" v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" prop="inventory" required>
      <a-input placeholder="仓库库存 如: kg" v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit" required>
      <a-input placeholder="计量单位 如: kg" v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册" prop="images">
      <a-upload
        :action="
          'http://mallapi.duyiedu.com/upload/images?appkey=' +
          $store.state.user.appkey
        "
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar"
      >
        <div v-if="fileList.length < 8">
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
      <a-button type="primary" @click="prev" class="nextStep">
        上一步
      </a-button>
      <a-button type="primary" @click="next"> 提交 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  data() {
    return {
      rules: {},
      previewVisible: false,
      previewImage: "",
      // 显示的图片集合
      fileList: [],
      loading: false,
    };
  },
  props: ["form"],
  created() {
    // 编辑时，将图片填回
    if (this.form.images && this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    // 图片列表发生变化触发函数
    handleChange({ file, fileList }) {
      // 获得图片的链接
      if (file.status === "done") {
        this.form.images=[]
        this.form.images.push(file.response.data.url);
      } else if (file.status === "removed") {
        // 移除图片
        // const { url } = file.response.data;
        // this.form.images.filter((f) => f !== url);
        this.form.images = fileList
      }
        this.fileList = fileList;
      // console.log(this.form.images)
    },
    // 上一步
    prev() {
      this.$emit('prev')
    },
    // 提交
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next',this.form)
          return true
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 预览图片显示函数
    handleCancel() {
      this.previewVisible = false;
    },
    // 预览图片
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
  },
};
</script>

<style lang="less">
.nextStep {
  margin-right: 30px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>