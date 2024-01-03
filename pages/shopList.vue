<template>
  <div>
    <div class="header">
      <el-avatar
          :size="50"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <div>
        <h4 class="text-lg font-bold">店铺名称：杜蕾斯</h4>
        <p>店铺简介：<span>不成功便成人</span></p>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">

</script>
<style>
.header{
  display: flex;
  align-items: center;
  margin-top: 20px;
  div{
    margin-left: 20px;
    p{
      span{
        font-size: 14px;
      }
    }
  }
}
</style>
