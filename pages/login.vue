<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ title }}</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST" @submit="submitAction">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">邮箱</label>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">密码</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div v-if="!isSigin">
                    <div class="flex items-center justify-between">
                        <label for="repassword" class="block text-sm font-medium leading-6 text-gray-900">重复密码</label>
                    </div>
                    <div class="mt-2">
                        <input id="repassword" name="repassword" type="password" autocomplete="current-password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
                            button }}</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                {{ tip }}
                <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" @click="switchStatus">{{
                    action }}</a>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
const isSigin = ref(true)
const title = ref('登录您的账号')
const tip = ref('没有账号？')
const action = ref('立即注册')
const button = ref('登录')

const switchStatus = () => {
    isSigin.value = !isSigin.value
    if (isSigin.value) {
        title.value = '登录您的账号'
        tip.value = '没有账号？'
        action.value = '立即注册'
        button.value = '登录'
    } else {
        title.value = '注册您的账号'
        tip.value = '已有账号？'
        action.value = '立即登录'
        button.value = '注册'
    }
}

const submitAction = (e: any) => {
    e.preventDefault()
    const result = {
        repassword: '',
        password: '',
        email: ''
    } as Record<string, string>
    const fromData = new FormData(e.target)
    fromData.forEach((val, key) => {
        result[key] = val as string
    })
    if (!isSigin.value && result.repassword === result.password) {
        ElMessage({
            message: '两次密码不一致',
            type: 'error',
        })
        return
    }
}
</script>