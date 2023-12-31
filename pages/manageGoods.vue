<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
const productId = ref('')
const productName=ref('')
const page=ref(1)
const limit=ref(10)
const tableData = ref<any[]>([])



const submitQuery = async () => {
    const {code, data, message} = await request<any>({
        url: '/api/admin/product/list',
        method:"POST",
        data: {
            id: productId.value,
            title: productName.value,
            page: page.value,
            limit: limit.value,
            disabled: 0
        }
    })
    if (code !== 1) {
        ElMessage({
            type: "error",
            message
        })
        return
    }
    tableData.value = data.list

}

watchEffect(() => {
    submitQuery()
}, {
    
})
</script>

<template>
    <div class="w-full h-full">
        <div class="w-full h-fit">
            <form action="" class="flex gap-2 items-end" ref="formRef" @submit.prevent="submitQuery">
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">商品id</span>
                    </div>
                    <input type="text" placeholder="商品id"
                        class="input input-sm input-bordered input-info w-full max-w-xs" v-model="productId" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">商品名称</span>
                    </div>
                    <input type="text" placeholder="商品名称"
                    class="input input-sm input-bordered input-info w-full max-w-xs" v-model="productName" />
                </label>
                <button type="submit" class="btn btn-outline btn-info btn-sm">查询</button>
                <button type="reset" class="btn btn-outline  btn-sm">重置</button>
            </form>
        </div>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>封面图</th>
                        <th>商品名称</th>
                        <th>商品标题</th>
                        <th>商品库存(500g)</th>
                        <th>商品价格(¥)</th>
                        <th>店铺ID</th>
                        <th>用户ID</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="(p, index) in tableData" :key="index">
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img :src="p.cover" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="badge badge-ghost badge-sm">{{ p.name }}</span>
                        </td>
                        <td>
                            <div class="max-w-[150px]">{{ p.title }}</div>
                        </td>
                        <td><span class="badge badge-ghost badge-sm">{{ p.stockQuantity }}</span></td>
                        <td><span class="badge badge-ghost badge-sm">{{ p.price }}</span></td>
                        <td><span class="">{{ p.storeId }}</span></td>
                        <td><span class="">{{ p.ownerId }}</span></td>
                        <th>
                            <button class="btn btn-ghost btn-xs">编辑</button>
                            <button class="btn btn-ghost btn-xs">删除</button>
                        </th>
                    </tr>

                </tbody>
            </table>
          <div class="join w-full">
            <button class="join-item btn">«</button>
            <button class="join-item btn">1</button>
            <button class="join-item btn bg-info">2</button>
            <button class="join-item btn">3</button>
            <button class="join-item btn">4</button>
            <button class="join-item btn">»</button>
          </div>
        </div>
    </div>
</template>
