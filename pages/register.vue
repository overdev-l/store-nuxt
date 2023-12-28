<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">注册您的账号</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <el-form :model="formData" :inline="formData.role === 2" ref="ruleFormRef" :rules="rules" label-width="120px">
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="formData.nickname" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" />
                </el-form-item>
                <el-form-item label="身份" prop="role">
                    <el-radio-group v-model="formData.role">
                        <el-radio :label="1">用户</el-radio>
                        <el-radio :label="2">商家</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="姓名" v-if="formData.role === 2" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="身份证号" v-if="formData.role === 2" prop="cardId">
                    <el-input v-model="formData.cardId" />
                </el-form-item>
                <el-form-item label="店铺名称" v-if="formData.role === 2" prop="storeName">
                    <el-input v-model="formData.storeName" />
                </el-form-item>
                <el-form-item label="店铺图片" v-if="formData.role === 2" prop="storeImg">
                    <el-upload accept=".png,.jpg" :show-file-list="false" :http-request="customUpload">
                        <img v-if="formData.storeImg" :src="formData.storeImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitAction(ruleFormRef)">注册</el-button>
                </el-form-item>
            </el-form>

            <p class="mt-10 text-center text-sm text-gray-500">
                已有账号？
                <NuxtLink to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">登录</NuxtLink>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { FormInstance, UploadRequestHandler, FormRules } from 'element-plus';
import { validateEmail, validateIDCard } from '~/utils/validate';
const ruleFormRef = ref<FormInstance>()
const formData = reactive({
    email: '',
    nickname: '',
    password: '',
    role: 1,
    name: '',
    cardId: '',
    storeName: '',
    storeImg: ''
})
const rules = reactive<FormRules<typeof formData>>({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: validateEmail, trigger: 'blur' },
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, message: '密码不能少于6位', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择身份', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    cardId: [
        { required: true, message: '请输入身份证', trigger: 'blur' },
        { validator: validateIDCard, message: '请输入身份证', trigger: 'blur' },
    ],
    storeName: [
        { required: true, message: '请输入店铺名称', trigger: 'blur' },
    ],
    storeImg: [
        { required: true, message: '请上传店铺图片', trigger: 'blur' },
    ],
})
const customUpload: UploadRequestHandler = (option) => new Promise(() => { })

const submitAction = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    try {
        await formEl.validate()
        const response = await $fetch('/api/proxy', {
            method: 'post',
            body: {
                url: '/register',
                method: 'post',
                data: formData,
                headers: {
                    xxx: '123123'
                }
            }
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}


</script>