<template>
<!--    <div-->
<!--        class="max-w-sm select-none bg-[#f7f9fa] border border-white rounded-lg dark:bg-gray-800 dark:border-gray-700 flex hover:border-purple-400 hover:bg-white hover:shadow-xl transition-all">-->
<!--        <div class="p-5">-->
<!--            <NuxtLink to="/detail/1">-->
<!--                <NuxtImg class="rounded-t-lg select-none"-->
<!--                    src="/xx.jpg" width="150"-->
<!--                    height="150" />-->
<!--            </NuxtLink>-->
<!--        </div>-->
<!--        <div class="p-5 flex flex-col justify-between">-->
<!--            <NuxtLink to="/detail/1">-->
<!--                <h5 class="mb-2 select-none text-sm font-bold tracking-tight text-gray-900 dark:text-white">-->
<!--                    这是一个商品名称这是一个商品名称这是一个商品名称-->
<!--                </h5>-->
<!--            </NuxtLink>-->
<!--            <div class="w-full select-none h-fit flex justify-between items-center">-->
<!--              <div class="flex justify-center items-end gap-1">-->
<!--                <span class="text-base text-[#f7be38]">¥</span>-->
<!--                <span class="text-xl text-[#f7be38]">200</span>-->
<!--              </div>-->
<!--                <div class="p-2 hover:bg-gray-200 rounded-xl active:bg-gray-100">-->
<!--                    <el-badge :value="num" v-if="num > 0">-->
<!--                        <Icon name="dashicons:cart" size="30" color="#f7be38" class="cursor-pointer" @click="addProduct" />-->
<!--                    </el-badge>-->
<!--                    <Icon v-else name="dashicons:cart" size="30" color="#f7be38" class="cursor-pointer"-->
<!--                        @click="addProduct" />-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div class="flex flex-col space-y-1.5 p-6">
        <h2 class="text-xl font-bold">土豆</h2>
        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          有机产品
        </div>
      </div>
      <div class="p-6">
        <img
            src="/xx.jpg"
            alt="Apple"
            class="w-full h-64 object-cover"
            width="200"
            height="200"
            style="aspect-ratio: 200 / 200; object-fit: cover;"
        />
        <p class="mt-4">来自本地农场的新鲜有机苹果。脆甜多汁。</p>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-end justify-between">
            <span class="text-lg font-bold">¥2.99/</span>
            <span class="text-sm font-bold">500g</span>
          </div>
          <button v-if="num <= 0" @click="addProduct" class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
            添加到购物车
          </button>
          <el-badge :value="num" v-if="num > 0">
            <Icon name="dashicons:cart" size="30" color="#f7be38" class="cursor-pointer" @click="addProduct" />
          </el-badge>
        </div>
        <NuxtLink to="/shopList" class="mt-2 inline-block underline text-sm" href="#">
          前往店铺
        </NuxtLink>
      </div>
    </div>

</template>

<script setup lang="ts">
import { ElBadge } from 'element-plus';
const num = ref(0)
const addProduct = () => {
    num.value += 1
}
</script>
