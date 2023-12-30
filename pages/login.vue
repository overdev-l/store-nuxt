<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录您的账号</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST" @submit.prevent="submitAction">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">邮箱</label>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" required
                               v-model="formData.email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">密码</label>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" required
                               v-model="formData.password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">立即登录</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                没有账号？
                <NuxtLink to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" >立即注册</NuxtLink>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">

import {$fetch} from "ofetch";
import type {Result} from "~/types/result";
import { parseJwt } from "~/utils";
import {UserStore} from "~/store/user";

const formData = reactive({
  email: '',
  password: ''
})

const submitAction = async () => {
    const {code, data, message} = await $fetch<Result<any>>('/api/proxy', {
      method: 'post',
      body: {
        url: '/api/public/login',
        method:'post',
        data: formData
      }
    })
  if (code !== 1) {
    ElMessage({
      type: 'error',
      message
    })
    return
  }
  const router = useRouter()
  router.push('/')
  localStorage.setItem('token', data)
  const result = parseJwt()
  const user = UserStore()
  user.setUser(result.claims)
}
</script>