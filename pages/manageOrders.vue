<template>
  <div class="w-full h-full">
    <div class="w-full h-fit">
      <form action="" class="flex gap-2 items-end" ref="formRef" @submit.prevent>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">订单id</span>
          </div>
          <input type="text" placeholder="订单id" class="input input-sm input-bordered input-info w-full max-w-xs"
            v-model="orderId" />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">订单状态</span>
          </div>
          <input type="text" placeholder="订单名称" class="input input-sm input-bordered input-info w-full max-w-xs"
            v-model="status" />
        </label>
        <button class="btn btn-outline btn-info btn-sm" @click="submit">查询</button>
        <button type="reset" class="btn btn-outline  btn-sm" @click="reset">重置</button>
      </form>
    </div>
    <el-table :data="tableData" :border="parentBorder" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div m="4" style="margin-left: 50px;">
            <p m="t-0 b-2">收货地址: {{ props.row.address.provinceName +  props.row.address.cityName + props.row.address.areaName + props.row.address.streetName + props.row.address.detail }}</p>
            <p m="t-0 b-2">手机号: {{ props.row.address.phone }}</p>
            <p m="t-0 b-2">姓名: {{ props.row.address.name }}</p>
            <div v-for="(item,index) in props.row.products" :key="index">
              <img width="200" height="200" :src="item.cover" alt="">
              <p>商品名称: {{ item.productName }}</p>
              <p>数量: {{ item.quantity }}</p>
              <p>单价: {{ item.unitPrice }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="id" />
      <el-table-column label="店铺ID" prop="storeId" />
      <el-table-column label="支付方式" prop="paymentMethod">
        <template #default="scope">
          {{ scope.row.paymentMethod === 1 ? '微信' :  scope.row.paymentMethod === 2 ? '支付宝' : '' }}
        </template>
      </el-table-column>
      <el-table-column label="支付状态" prop="paymentStatus">
        <template #default="scope">
          {{ scope.row.paymentStatus === 1 ? '未支付' :  scope.row.paymentStatus === 2 ? '已支付' : scope.row.paymentStatus === 3 ? '退款中' : scope.row.paymentStatus === 4 ? '已退款' : '' }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="status">
        <template #default="scope">
          {{ scope.row.status === 1 ? '已创建' :  scope.row.status === 2 ? '待发货' : scope.row.status === 3 ? '已发货' : scope.row.status === 4 ? '已完成' : scope.row.status === 5 ? '已取消' : scope.row.status === 6 ? '已退款' : '' }}
        </template>
      </el-table-column>
      <el-table-column label="订单总金额" prop="totalPrice" />
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button @click="refund(scope.row)" v-if="scope.row.paymentStatus === 3" type="danger">退款</el-button>
            <el-button @click="deliverGoods(scope.row)" v-if="scope.row.status === 2" type="primary">发货</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
        :total="total" />
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, UploadRequestHandler, FormRules } from 'element-plus';
definePageMeta({
  layout: 'admin'
})
const parentBorder = ref(false)
const orderId = ref('')
const page = ref(1)
const limit = ref(10)
const status = ref(0)  // 订单状态0全部1已创建2待发货3待退款4待确认5已完成
const tableData = ref<any>([
  
])
const total = ref(0)
const refund = async(item:any)=>{
  let params = {
    orderId: item.id
  }
  const { code, data, message } = await request<any>({
    url: '/api/admin/order/submitCancel',
    method: 'post',
    data: params
  })
  submitQuery()
}
const deliverGoods = async(item:any) => {
  let params = {
    orderId: item.id
  }
  const { code, data, message } = await request<any>({
    url: '/api/admin/order/submitSend',
    method: 'post',
    data: params
  })
  submitQuery()
}
const handleSizeChange = (val: number) => {
  limit.value = val
}
const handleCurrentChange = (val: number) => {
  page.value = val
  submitQuery()
}
const submit = () => {
  page.value = 1
  limit.value = 10
  submitQuery()
}
const submitQuery = async () => {
  let params = {
    "page": page.value,
    "limit": limit.value,
    "status": status.value,
    "id": orderId.value
  }
  const { code, data, message } = await request<any>({
    url: '/api/admin/order/list',
    method: 'post',
    data: params
  })
  total.value = data.total
  tableData.value = data.list
}
const reset = () => {
  page.value = 1
  limit.value = 10
  orderId.value = ''
  status.value = 0
  submitQuery()
}
onMounted(() => {
  submitQuery()
})
</script>