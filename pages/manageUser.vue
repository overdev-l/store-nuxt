<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { reactive, ref } from 'vue'
const dialogVisible = ref(false)
const ruleForm = ref<any>({
  email: '',
  password: '',
  nickname: ''
})
const rules = reactive<any>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', max: 5, message: '请输入正确的邮箱', trigger: ['blur', 'change'] },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
    { min: 6, max: 20, message: '最小6位密码', trigger: 'blur' },
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'change',
    },
  ]
})
const tableData = ref<any[]>([])
const page = ref<any>(1)
const limit = ref<any>(10)
const total = ref<any>(0)
const userId = ref<any>('')
const formRef = ref<any>()
const handleClose = () => {
  dialogVisible.value = false
}
const submitQuery = (e: Event) => {
  e.preventDefault()
}
const getList = async () => {
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
const unseal = async (id: any) => {
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
const forbidden = async (id: any) => {
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
const resect = () => {
  userId.value = ''
  page.value = 1
  limit.value = 10
  getList()
}
const addAdmin = () => {
  dialogVisible.value = true
}
const addRoid = (formEl: any) => {
  if (!formEl) return
  formEl.validate(async (valid: any) => {
    if (valid) {
      let params = {
        "email": ruleForm.value.email,
        "password": ruleForm.value.password,
        "role": 3,
        "nickname": ruleForm.value.nickname
      }
      const { code, data, message } = await request<any>({
        url: '/api/super/admin/user/append',
        method: 'post',
        data: params
      })
      if (code) {
        getList()
        ruleForm.value.email = ''
        ruleForm.value.password = ''
        ruleForm.value.nickname = ''
        dialogVisible.value = false
      }
    } else {
      return false
    }
  })
}
onMounted(() => {
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
        <el-button @click="addAdmin" type="primary">添加管理员</el-button>
      </form>
    </div>
    <div class="overflow-x-auto">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180" />
        <el-table-column prop="nickname" label="用户昵称" width="180" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="role" label="用户身份">
          <template #default="scope">
            {{ scope.row.role === 0 ? '超级管理员' : scope.row.role === 1 ? '普通用户' : scope.row.role === 2 ? '商家' :
              scope.row.role === 3 ? '管理员' : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="用户状态">
          <template #default="scope">
            {{ scope.row.disabled === 0 ? '正常' : '封禁' }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button @click="unseal(scope.row.id)" v-if="scope.row.disabled !== 0" type="success">解封</el-button>
            <el-button @click="forbidden(scope.row.id)" v-else type="warning">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="total" />
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="ruleForm.nickname" />
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="addRoid(formRef)" type="primary">
            添加
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
