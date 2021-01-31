<template>
  <a-steps :current="current" size="default" class="product-steps">
    <a-step title="填写商品基本信息" />
    <a-step title="填写商品销售信息" />
  </a-steps>
</template>

<script>
export default {
    data(){
        return {
           
        }
    },
    props:['current']
}
</script>

<style lang="less">
.product-steps{
    width: 50%;
    margin: 20px auto;
}
</style>