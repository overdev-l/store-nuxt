<template>
  <div class="flex justify-center items-center gap-2 my2">
    <input type="text" v-model="name" placeholder="请输入名称" class="input input-bordered input-primary w-full max-w-xs" />
    <button class="btn btn-primary" @click="search">搜索</button>
  </div>
    <div class="w-full h-full grid grid-cols-4 gap-2 justify-center items-center mt-3">
        <Product v-for="i in 50" :key="i"/>
    </div>
    <div class="w-full justify-center flex mt-2 pb-5">
        <el-pagination layout="prev, pager, next" :total="50" />
    </div>
</template>
<script setup lang="ts">
const name = ref('')
const page = ref(1)
const limit = ref(10)
const search = () => {}


</script>