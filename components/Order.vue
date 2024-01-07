<template>
  <ClientOnly>
    <el-drawer :model-value="value" title="我的订单" direction="rtl" :before-close="close">
      <div class="w-full h-fit flex flex-col gap-2">
        <el-table :data="tableData" style="width: 100%">
           <el-table-column type="expand">
      <template #default="props">
        <div m="4" v-for="(item,index) in props.row.products" :key="index" style="display:flex">
          <div>
            <el-image style="width: 100px; height: 100px" :src="item.cover" :fit="'fill'" />
          </div>
          <div style="margin-left: 8px;line-height: 20px;">
            <p>店铺id:{{ item.storeId }}</p>
            <p>商品id:{{ item.productId }}</p>
            <p>商品名称:{{ item.productName }}</p>
            <p>商品单价:{{ item.unitPrice }}</p>
            <p>收货地址:{{ props.row.address.provinceName + props.row.address.cityName  + props.row.address.areaName  + props.row.address.streetName}}</p>
          </div>
        </div>
      </template>
    </el-table-column>
          <el-table-column prop="id" label="订单ID" width="180" align="center" />
          <el-table-column prop="status" label="订单状态" width="180" align="center">
            <template #default="scope">
              <div>
                {{ scope.row.status === 1 ? '已创建' : scope.row.status === 2 ? '待发货' : scope.row.status === 3 ? '已发货' :
                  scope.row.status === 4 ? '已完成' : scope.row.status === 5 ? '已取消' : scope.row.status === 6 ? '已退款' : '' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="totalPrice" label="订单总金额" />
          <el-table-column align="center" prop="paymentMethod" label="支付方式">
            <template #default="scope">
              <div>
                {{ scope.row.paymentMethod === 1 ? '微信' : scope.row.paymentMethod === 2 ? '支付宝' : '' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button v-if="scope.row.paymentStatus ===2" link type="warning" size="small" @click="refund(scope.row.id)">退款</el-button>
              <el-button v-if="scope.row.status ===3" link type="success" size="small" @click="receiptGoods(scope.row.id)">确认收货</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </el-drawer>

</ClientOnly>
</template>
<script setup lang="ts">

defineProps<{
  value: boolean
}>()
const emits = defineEmits(["close"])
const childBorder = ref(false)
const close = () => {
  emits("close")
}
const tableData = ref<any[]>([])
const getList = async () => {
  const { code, data, message } = await request<any>({
    url: '/api/order/list',
    method: 'post',
    data: {}
  })
  tableData.value = data
}
const refund =async(orderId:any)=>{
  let params = {
    orderId: orderId
  }
  const { code, data, message } = await request<any>({
    url: '/api/order/cancel',
    method: 'post',
    data: params
  })
  if(code){
    ElMessage({
    message: message,
    type: 'success',
  })
    getList()
  }
} 
const receiptGoods = async(orderId:any)=>{
  let params = {
    orderId: orderId
  }
  const { code, data, message } = await request<any>({
    url: '/api/order/submit',
    method: 'post',
    data: params
  })
  if(code){
    ElMessage({
    message: message,
    type: 'success',
  })
    getList()
  }
}
defineExpose({
  getList
})
</script>