<template>
  <div>
    <div class="header">
      <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <div>
        <h4 class="text-lg font-bold">店铺名称：杜蕾斯</h4>
        <p>店铺简介：<span>不成功便成人</span></p>
      </div>
    </div>
    <div class="w-full h-full grid grid-cols-4 gap-2 justify-center items-center mt-3">
      <div v-for="(item, index) in dataList" :key="index" class="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card">
        <div class="flex flex-col space-y-1.5 p-6">
          <h2 class="text-xl font-bold">{{ item.name }}</h2>
          <div style="color: aliceblue;"
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            有机产品
          </div>
        </div>
        <div class="p-6">
          <img :src="item.cover" alt="Apple" class="w-full h-64 object-cover" width="200" height="200"
            style="aspect-ratio: 200 / 200; object-fit: cover;" />
          <p class="mt-4">{{ item.title }}</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-end justify-between">
              <span class="text-lg font-bold">¥{{ item.price }}/</span>
              <span class="text-sm font-bold">500g</span>
            </div>
            <div style="margin-top: 20px;">
                    <button v-if="item.num <= 0" @click="addProduct(item.id)"
                        class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
                        添加到购物车
                    </button>
                    <el-badge :value="item.num" v-if="item.num > 0">
                        <Icon name="mdi:cart" size="30" color="#f7be38" class="cursor-pointer" @click="addProduct" />
                    </el-badge>
                </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full justify-center flex mt-2 pb-5">
      <el-pagination layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-size="limit" :total="total" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
const storeId = ref<any>('')
const page = ref<any>(1)
const limit = ref<any>(10)
const total = ref<any>(0)
const dataList = ref<any>([])
onMounted(() => {
  storeId.value = route.query.storeId as any
  getList()
  getcarList()
})
const addProduct = async (id:any) => {

const { code, message } = await request<any>({
    url: '/api/cart/add?id=' + id,
    method: 'post',
    data: {}
})
if (code) {
  getList()
  getcarList()
} else {
    ElMessage.error(message)
}
}
const getcarList = async () => {
  const { code, data, message } = await request<any>({
    url: '/api/cart/list',
    method: 'post',
    data: {}
  })
  if (code) {
    // amount
    data.products.forEach((element: any) => {
      dataList.value.forEach((item: any) => {
        if(item.id === element.id){
          item.num = element.amount
        }
       
      })
    });
  } else {
    ElMessage.error(message)
  }
}
const getList = async () => {
  let params = {
    storeId: storeId.value,
    page: page.value,
    limit: limit.value
  }
  const { code, data, message } = await request<any>({
    url: '/api/public/storeProducts',
    method: 'post',
    data: params
  })
  total.value = data.total
  dataList.value = data.list
  dataList.value.forEach((item: any) => {
    item.num = 0
  })
}
const handleSizeChange = (val: number) => {
  limit.value = val
}
const handleCurrentChange = (val: number) => {
  page.value = val
  getList()
}
</script>
<style>
.header {
  display: flex;
  align-items: center;
  margin-top: 20px;

  div {
    margin-left: 20px;

    p {
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
