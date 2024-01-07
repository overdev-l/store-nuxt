<template>
  <ClientOnly>
    <el-drawer :model-value="value" title="我的订单" direction="rtl" :before-close="close">
      <div class="w-full h-fit flex flex-col gap-2">
        <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="订单ID" width="180" align="center" />
        <el-table-column prop="status" label="订单状态" width="180" align="center">
          <template #default="scope">
            <div>
              {{ scope.row.status === 1 ? '已创建' : scope.row.status === 2 ? '待发货' : scope.row.status === 3 ? '已发货' : scope.row.status === 4 ? '已完成' : scope.row.status === 5 ? '已取消' : scope.row.status === 6 ? '已退款' : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="订单总金额" />
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

const close =() => {
  emits("close")
}
const tableData = ref<any[]>([])
const getList = async() =>{
  const { code, data, message } = await request<any>({
        url: '/api/order/list',
        method: 'post',
        data: {}
    })
    console.log(data)
    tableData.value = data
}
defineExpose({
    getList
})
</script>