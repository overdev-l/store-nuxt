<template>
    <ClientOnly>
        <el-drawer :model-value="value"  title="购物车" direction="rtl" :before-close="close">
            <div class="w-full h-fit grid grid-cols-2 gap-2">
                <CartItem @getList="getList" v-for="(item,index) in catList" :key="index" :id="item.id" :amount="item.amount" :price="item.price" :name="item.name" :cover="item.cover"/>
            </div>
            <template #footer>
                <div class="flex justify-between items-end">
                    <div class="flex justify-end items-end">
                        <span class="text-sm">¥</span>
                        <span class="text-xl">200</span>
                    </div>
                    <el-button type="primary">支付</el-button>
                </div>
            </template>
        </el-drawer>

    </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{
    value: boolean
}>()
const emits = defineEmits(["close"])
const catList = ref<any[]>([])
const close =() => {
    emits("close")
}
const getList = async() => {
    const {code,data, message} = await request<any>({
    url: '/api/cart/list',
    method: 'post',
    data: {}
  })
  if (code) {
    catList.value = data.products
    console.log(catList.value);
    
  }else{
    ElMessage.error(message)
  }
}
defineExpose({
    getList
})
</script>
