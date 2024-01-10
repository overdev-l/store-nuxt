<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const userId = ref('')
const storeName = ref('')
const tableData = ref<any[]>([])
const page = ref<any>(1)
const limit = ref<any>(10)
const submitQuery = (e: Event) => {
  e.preventDefault()
}
const getList = async() =>{
  let params = {
    "page": page.value,
    "limit": limit.value,
    "id": "",
    "email": "",
    "disabled": 0
}
  const { code, data, message } = await request<any>({
    url: '/api/admin/user/list',
    method: 'post',
    data: params
  })
  console.log(data)
}
onMounted(()=>{
  getList()
})
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-fit">
      <form action="" class="flex gap-2 items-end" ref="formRef" @submit="submitQuery">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">用户ID</span>
          </div>
          <input type="text" placeholder="用户ID" class="input input-sm input-bordered input-info w-full max-w-xs"
            v-model="userId" />
        </label>
        <button type="submit" class="btn btn-outline btn-info btn-sm">查询</button>
        <button type="reset" class="btn btn-outline  btn-sm">重置</button>
      </form>
    </div>
    <div class="overflow-x-auto">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="用户ID" width="180" />
        <el-table-column prop="name" label="用户昵称" width="180" />
        <el-table-column prop="address" label="用户邮箱" />
        <el-table-column prop="address" label="用户身份" />
        <el-table-column prop="address" label="用户状态" />
        <el-table-column prop="address" label="创建时间" />
        <el-table-column prop="address" label="操作" />
      </el-table>
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>
