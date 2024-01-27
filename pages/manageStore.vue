<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const userId = ref('')
const storeName=ref('')
const tableData = ref<any[]>([])
const limit = ref(10)
const page = ref(1)
const total = ref(0)
const submit = () => {
  getList()
}
const resect = () =>{
  userId.value = ''
  limit.value = 10
  page.value = 1
  storeName.value = ''
}
const getList = async() =>{
  let params = {
    id: userId.value,
    limit: limit.value,
    page: page.value,
    name: storeName.value
  }
  const { code, data, message } = await request<any>({
    url: '/api/super/admin/store/list',
    method: 'post',
    data: params
  })
  total.value = data.total
  tableData.value = data.list
  console.log(tableData.value);
  
}
const handleSizeChange = (val: number) => {
  limit.value = val
}
const handleCurrentChange = (val: number) => {
  page.value = val
  getList()
}
const dead = async(p:any) =>{
  const { code, data, message } = await request<any>({
    url: '/api/super/admin/store/disabled?id=' + p.id,
    method: 'post',
    data: {}
  })
  if(code === 1){
    ElMessage({
    message: '成功',
    type: 'success',
  })
  }
  getList()
}
const unseal = async(p:any) =>{
  const { code, data, message } = await request<any>({
    url: '/api/super/admin/store/lift?id=' + p.id,
    method: 'post',
    data: {}
  })
  if(code === 1){
    ElMessage({
    message: '成功',
    type: 'success',
  })
  }
  getList()
}
onMounted(()=>{
  getList()
})
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-fit">
      <form class="flex gap-2 items-end"  @submit.prevent>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">用户ID</span>
          </div>
          <input type="text" placeholder="用户ID"
                 class="input input-sm input-bordered input-info w-full max-w-xs" v-model="userId" />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">店铺名称</span>
          </div>
          <input type="text" placeholder="店铺名称"
                 class="input input-sm input-bordered input-info w-full max-w-xs" v-model="storeName" />
        </label>
        <button class="btn btn-outline btn-info btn-sm" @click="submit">查询</button>
        <button  @click="resect" type="reset" class="btn btn-outline  btn-sm">重置</button>
      </form>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
        <tr>
          <th>封面图</th>
          <th>店铺名称</th>
          <th>运营状态</th>
          <th>店铺ID</th>
          <th>用户ID</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr v-for="(p, index) in tableData" :key="index">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="p.img" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-ghost badge-sm">
              {{ p.name }}
            </span>
          </td>
          <td>
            <div class="max-w-[150px]">{{ p.dead === null ? '正常' : '封禁' }}</div>
          </td>
          <td><span class="badge badge-ghost badge-sm">{{ p.ownerId }}</span></td>
          <td><span class="badge badge-ghost badge-sm">{{ p.id }}</span></td>
          <td>
            <button v-if="p.dead === null" @click="dead(p)" class="btn btn-ghost btn-xs">
               封禁
            </button>
            <button v-if="p.dead === null" @click="unseal(p)" class="btn btn-ghost btn-xs">
                解封
            </button>
          </td>
        </tr>

        </tbody>
      </table>
      <div class="join w-full">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="total" />
      </div>
    </div>
  </div>
</template>
