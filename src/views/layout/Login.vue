<template>
  <div class="login">
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
      class="login-form"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="ruleForm.email" type="email" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "@/api/user.js"
export default {
  data() {
    //   邮箱验证
    const emailReg = /^[\w-]+@[\w.-]+.com$/
    let checkEmail = (rule, value, callback) => {
      if(!value){
          return callback(new Error('请输入邮箱'))
      }
      if(emailReg.test(value)){
          return callback()
      }
      return callback(new Error('邮箱格式不正确'))
    };
    let checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入正确的密码"));
      }else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.ruleForm).then(res=>{
              // console.log(res)
              this.$store.dispatch('setUserInfo',res)
              this.$router.push({
                  name:'Home'
              })
          }).catch(error=>{
              this.$message.error(error)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.login{
    .login-form{
        max-width: 500px;
        margin: 100px auto;
        border: 1px solid #eee;
        padding: 30px 20px 6px;
    }
}
</style>