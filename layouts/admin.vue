<template>
  <div class="w-full h-full flex flex-col gap-1">
    <AppHeader />
    <div class="flex flex-1 w-full max-w-7xl m-auto">
      <div class="w-fit h-ful">
        <ul class="menu bg-base-200 w-56 rounded-box h-full">
          <li v-for="m in menu" :key="m.path">
            <NuxtLink :to="m.path" :class="{
              'text-blue-500': m.path === route.fullPath
            }">{{ m.name }}</NuxtLink>
          </li>

        </ul>
      </div>
      <div class="flex-1 h-full p-3">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
import { UserStore } from '~/store/user';
const menu = ref<any>([])
const user = UserStore()
onMounted(() => {
  if (user.role === 0) {
    menu.value = [
      {
        name: '主页',
        path: '/doshboard'
      },
      {
        name: '商品管理',
        path: '/manageGoods'
      },
      {
        name: '订单管理',
        path: '/manageOrders'
      },
      {
        name: '店铺管理',
        path: '/manageStore'
      },
      {
        name: '账号管理',
        path: '/manageUser'
      },
    ]
  } else {
    menu.value = [
      {
        name: '主页',
        path: '/doshboard'
      },
      {
        name: '商品管理',
        path: '/manageGoods'
      },
      {
        name: '订单管理',
        path: '/manageOrders'
      },
    ]
  }

})
</script>