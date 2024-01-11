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
    <div class="w-full h-full grid grid-cols-4 gap-2 justify-center items-center mt-3">
    <div v-for="i in 6" :key="i" class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div class="flex flex-col space-y-1.5 p-6">
      <h2 class="text-xl font-bold">name</h2>
      <div style="color: aliceblue;"
        class="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
        有机产品
      </div>
    </div>
    <div class="p-6">
      <img src="../xx.jpg" alt="Apple" class="w-full h-64 object-cover" width="200" height="200"
        style="aspect-ratio: 200 / 200; object-fit: cover;" />
      <p class="mt-4">title</p>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-end justify-between">
          <span class="text-lg font-bold">¥22222/</span>
          <span class="text-sm font-bold">500g</span>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
const storeId = ref<any>('')
  onMounted(()=>{
    storeId.value = route.query.storeId as any
  })
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
