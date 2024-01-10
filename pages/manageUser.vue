<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const storeName = ref('')
const tableData = ref<any[]>([])
const page = ref<any>(1)
const limit = ref<any>(10)
const total = ref<any>(0)
const userId = ref<any>('')
const submitQuery = (e: Event) => {
  e.preventDefault()
}
const getList = async() =>{
  let params = {
    "page": page.value,
    "limit": limit.value,
    "id": userId.value,
    "email": "",
    "disabled": 0
}
  const { code, data, message } = await request<any>({
    url: '/api/super/admin/user/list',
    method: 'post',
    data: params
  })
  console.log(data)
  total.value = data.total
  tableData.value = data.list
}
const unseal = async(id:any) =>{
  let params = {
    userId: id
  }
  const { code, data, message } = await request<any>({
    url: '/api/super/admin/user/disable',
    method: 'post',
    data: params
  })
  getList()
}
const forbidden = async(id:any) =>{
  let params = {
    userId: id
  }
  const { code, data, message } = await request<any>({
    url: '/api/super/admin/user/enable',
    method: 'post',
    data: params
  })
  getList()
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  limit.value = val
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  page.value = val
  getList()
}
const resect = () =>{
  userId.value = ''
    page.value = 1
  limit.value = 10
  getList()
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
        <button type="submit" @click="getList" class="btn btn-outline btn-info btn-sm">查询</button>
        <button type="reset" @click="resect" class="btn btn-outline  btn-sm">重置</button>
      </form>
    </div>
    <div class="overflow-x-auto">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180" />
        <el-table-column prop="nickname" label="用户昵称" width="180" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="role" label="用户身份">
          <template #default="scope">
            {{ scope.row.role === 0 ? '超级管理员' : scope.row.role === 1 ? '普通用户' : scope.row.role === 2 ? '商家' : scope.row.role === 3 ? '管理员' : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="用户状态">
          <template #default="scope">
            {{ scope.row.disabled === 0 ? '正常' : '封禁'}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button @click="unseal(scope.row.id)" v-if="scope.row.disabled !== 0" type="success">解封</el-button>
            <el-button @click="forbidden(scope.row.id)" v-else type="warning">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>
