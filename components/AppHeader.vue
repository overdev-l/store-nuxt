<template>
  <div class="w-full h-16 shadow-sm">
    <div class="max-w-7xl m-auto h-full flex items-center justify-between">

      <nav class="bg-white border-gray-200 dark:bg-gray-900 w-full h-full">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 w-full">
          <NuxtLink to="/">
            <NuxtImg src="/logo.png" class="w-9" />
          </NuxtLink>

          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
              class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li class="flex justify-center items-center">
                <NuxtLink href="/"
                  class="block py-2 px-3 hover:text-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white "
                  :class="{ 'md:text-blue-700 text-blue-700': route.path === '/', 'text-gray-900': route.path !== '/' }">
                  首页</NuxtLink>
              </li>
              <li class="flex justify-center items-center">
                <NuxtLink href="/store"
                  class="block py-2 px-3 hover:text-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white "
                  :class="{ 'md:text-blue-700 text-blue-700': route.path === '/store', 'text-gray-900': route.path !== '/store' }">
                  商城</NuxtLink>
              </li>
              <li class="flex justify-center items-center" v-if="isLogin() && user.role !==1">
                <ClientOnly>
                  <NuxtLink href="/doshboard"
                  class="block py-2 px-3 hover:text-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white "
                  :class="{ 'md:text-blue-700 text-blue-700': route.path === '/doshboard', 'text-gray-900': route.path !== '/doshboard' }" >
                  工作台</NuxtLink>
                </ClientOnly>
              </li>
              <li class="flex justify-center items-center" v-if="user.role ==1">
                <Icon name="mdi:cart" color="black" size="30" class="hover:bg-gray-100 p-1 rounded-sm cursor-pointer" @click="clickCart"/>
              </li>
              <li class="flex justify-center items-center">
                <ClientOnly>
                  <NuxtLink to="/login" v-if="!user.userId">
                    <Icon name="mdi:user" color="black" size="30" class="hover:bg-gray-100 p-1 rounded-sm cursor-pointer"/>
                  </NuxtLink>
                  <div class="dropdown" v-else>
                    <div tabindex="0" role="button" class="avatar placeholder btn" >
                      <div class="bg-neutral text-neutral-content rounded-full w-6">
                        <span>{{ user.nickname }}</span>
                      </div>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li v-if="user.role == 1"><a @click="manageOrder">订单管理</a></li>
                      <li v-if="user.role == 1"><a @click="manageAddress">收货地址</a></li>
                      <li><a @click="loginOut">退出登陆</a></li>
                    </ul>
                  </div>
                </ClientOnly>

              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Cart ref="childCart" :value="cartShow" @close="cartClose"/>
      <Address ref="AddressRef" :value="addressShow" @close="addressClose"/>
      <Order ref="orderRef" :value="orderShow" @close="orderClose"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserStore } from '~/store/user';
import { parseJwt } from "~/utils";
const childCart = ref<any>();
const AddressRef = ref<any>();
const orderRef = ref<any>();

const route = useRoute()
const router = useRouter()
const user = UserStore()
const cartShow = ref(false)
const orderShow = ref(false)
const addressShow = ref(false)
const clickCart = () => {
  if (!isLogin()) {
    router.push("/login")
  } else {
    cartShow.value = true
    childCart.value.getList();
  }
}

const manageOrder = () => {
  orderShow.value = true
  orderRef.value.getList();
}
const manageAddress = () => {
  addressShow.value = true
  AddressRef.value.getList();
}

const loginOut = () => {
  localStorage.removeItem('token')
  user.setUser({
    role: 0,
    userId: '',
    nickname: '',
    email: ''
  })
  const router = useRouter()
  router.push('/login')
}

const cartClose = () => {
  cartShow.value = false
}
const addressClose = () => {
  addressShow.value = false
}
const orderClose = () => {
  orderShow.value = false
}
onMounted(()=>{
  const result = parseJwt()
  const user = UserStore()
  if(!result?.claims) return
  user.setUser(result.claims)
})
</script>
