<template>
    <ClientOnly>
        <el-drawer :model-value="value" title="购物车" direction="rtl" :before-close="close">
            <div class="w-full h-fit grid grid-cols-2 gap-2">
                <CartItem @getList="getList" v-for="(item, index) in catList" :key="index" :id="item.id"
                    :amount="item.amount" :price="item.price" :name="item.name" :cover="item.cover" />
            </div>
            <template #footer>
                <div class="flex justify-between items-end" v-if="catList.length">
                    <div class="flex justify-end items-end">
                        <el-radio-group v-model="payType" class="ml-2">
                            <el-radio label="1" size="large" style="display: flex;"> <span class="text-sm"
                                    style="display: flex;"><img width="20" height="20" style="margin-right: 10px;"
                                        src="https://stc.miaopai.com/aigc/images/wechat-icon.png"
                                        alt="">微信支付</span></el-radio>
                            <el-radio label="2" size="large"><span class="text-sm" style="display: flex;"><img
                                        style="margin-right: 10px;" width="20" height="20"
                                        src="https://stc.miaopai.com/aigc/images/alipay-icon.png"
                                        alt="">支付宝支付</span></el-radio>
                        </el-radio-group>
                    </div>
                    <el-button @click="payment" type="primary">支付¥{{ priceAll }}</el-button>
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
const priceAll = ref<number>(0)
const catId = ref('')
const payType = ref<any>('1')
const close = () => {
    emits("close")
}
const getList = async () => {
    const { code, data, message } = await request<any>({
        url: '/api/cart/list',
        method: 'post',
        data: {}
    })
    if (code) {
        catList.value = data.products
        priceAll.value = data.price
        catId.value = data.catId
        console.log(catList.value);

    } else {
        ElMessage.error(message)
    }
}
const payment = async () => {
    const { code, data, message } = await request<any>({
        url: '/api/address/list',
        method: 'post',
        data: {}
    })
    if (!data.length) {
        ElMessage({
            message: '请添加收货地址',
            type: 'warning',
        })
    } else {
        // 找到 isDefault 为 1 的对象
        const defaultItem = data.find((item: any) => item.isDefault === 1);
        // 提取出符合条件的对象的 id
        const addressId = defaultItem ? defaultItem.id : null;
        orderCreate(addressId)
    }

}
const orderCreate = async (addressId: any) => {
    const orderCreates = catList.value.map(item => ({ productId: item.id, amount: item.amount }));
    let params = {
        orderCreates: orderCreates,
        addressId: addressId
    }
    const { code, data, message } = await request<any>({
        url: '/api/order/create',
        method: 'post',
        data: params
    })
    console.log(data, 'data');

    if (code === 1) {
        orderpay(data)
    }
}
const orderpay = async (orderId: any) => {
    let params = {
        orderId: orderId,
        payType: payType.value
    }
    const { code, data, message } = await request<any>({
        url: '/api/order/pay',
        method: 'post',
        data: params
    })
    if (code) {
        ElMessage({
            message: '支付成功',
            type: 'success',
        })
        close()
    }
}
defineExpose({
    getList
})
</script>
