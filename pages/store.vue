<template>
  <div class="flex justify-center items-center gap-2 my2">
    <input type="text" v-model="name" placeholder="请输入名称" class="input input-bordered input-primary w-full max-w-xs" />
    <button class="btn btn-primary" @click="search">搜索</button>
  </div>
    <div class="w-full h-full grid grid-cols-4 gap-2 justify-center items-center mt-3">
        <Product v-for="(item,index) in dataList" :item="item" :key="index"/>
    </div>
    <div class="w-full justify-center flex mt-2 pb-5">
        <el-pagination layout="prev, pager, next"   @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="page" :page-size="limit" :total="total" />
    </div>
</template>
<script setup lang="ts">
const name = ref('')
const page = ref(1)
const limit = ref(10)
const total = ref(0)
const dataList = ref<any[]>([])
const search = async() => {
  let params = {
    "page": page.value,
    "limit": limit.value,
    "name": name.value
}
const { code, data, message } = await request<any>({
        url: '/api/public/products',
        method: 'post',
        data: params
    })
  console.log(data.list)
  dataList.value = data.list
  total.value = data.total
}
const handleSizeChange = (val: number) => {
  limit.value = val
}
const handleCurrentChange = (val: number) => {
  page.value = val
  search()
}
onMounted(() => {
  search()
})
</script>