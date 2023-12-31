<script setup lang="ts">
import type { FormInstance, UploadRequestHandler, FormRules } from 'element-plus';
definePageMeta({
    layout: 'admin'
})
const productId = ref('')
const productName = ref('')
const page = ref(1)
const limit = ref(10)
const tableData = ref<any[]>([])
const total = ref()
const productShow = ref(false)
const ruleFormRef = ref<FormInstance>()
const editId = ref("")
const formData = reactive({
    name: '',
    title: '',
    stockQuantity: 0,
    price: 0,
    disabled: 0,
    cover: ''
})

const rules = reactive<FormRules<typeof formData>>({
    name: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
    ],
    title: [
        { required: true, message: '请输入商品标题', trigger: 'blur' },
    ],
    stockQuantity: [
        { required: true, message: '请输入库存', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入价格', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传商品图片', trigger: 'blur' },
    ],
})


const closeModelHandler = () => {
    productShow.value = false
}
const openModelHandler = (id?: string) => {
    productShow.value = true
    editId.value = id ?? ""
    if (id) {
        const product = tableData.value.find(item => item.id === id)
        formData.name = product.name
        formData.title = product.title
        formData.stockQuantity = product.stockQuantity
        formData.price = product.price
        formData.cover = product.cover
        formData.disabled = product.disabled
    }

}

const confirmModel = async (formEl: FormInstance | undefined) => { 
    if (!formEl) return
    try {
        await formEl.validate()
        if (editId.value) {
            // 修改
            editProduct()
        } else {
            // 新增
            addProduct()
        }
    } catch (error) {
        
    }
}

const editProduct = async () => {
    const {code, message} = await request<any>({
        url: '/api/admin/product/update',
        method: 'post',
        data: {
            ...formData,
            id: editId.value
        }
    })
    if (code !== 1) {
        ElMessage({
            type: "error",
            message
        })
    } else {
        ElMessage({
            type: "success",
            message: message
        })
        formData.cover = ''
        formData.name = ''
        formData.title = ''
        formData.stockQuantity = 0
        formData.price = 0
        productShow.value = false
        editId.value = ''
    }
}

const addProduct = async () => {
    const { code, message } = await request<any>({
        url: '/api/admin/product/add',
        method: "post",
        data: formData
    })
    if (code ===1) {
        formData.cover = ''
        formData.name = ''
        formData.title = ''
        formData.stockQuantity = 0
        formData.price = 0
        productShow.value = false
        ElMessage({
            type: "success",
            message
        })
        submitQuery()
    } else {
        ElMessage({
            type: "error",
            message
        })
    }
    
}

const customUpload: UploadRequestHandler = ({file, onSuccess}) => new Promise((resolve, reject) => {
  Oss.upload(file).then((res) => {
    onSuccess(res)
  }).catch(err=> {
    reject(err)
  })
})

const uploadSuccess = (url: string) => {
  formData.cover = `https://${url}`
}

const submit = () => {
    page.value = 1
    limit.value = 10
    submitQuery()
}

const reset = () => {
    page.value = 1
    limit.value = 10
    submitQuery()
}

const submitQuery = async () => {
    const { code, data, message } = await request<any>({
        url: '/api/admin/product/list',
        method: "POST",
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
    total.value = data.total
}

const delProduct = async (id: string) => {
    console.log(id)
    const { code, message } = await request<any>({
        url: '/api/admin/product/delete',
        method: "POST",
        data: {
            id,
        }
    })
    if (code !== 1) {
        ElMessage({
            type: "error",
            message
        })
    } else {
        ElMessage({
            type: "success",
            message: message
        })
        submitQuery()
    }
}

watchEffect(() => {
    submitQuery()
}, {

})
</script>

<template>
    <div class="w-full h-full">
        <div class="w-full h-fit">
            <form action="" class="flex gap-2 items-end" ref="formRef" @submit.prevent>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">商品id</span>
                    </div>
                    <input type="text" placeholder="商品id" class="input input-sm input-bordered input-info w-full max-w-xs"
                        v-model="productId" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">商品名称</span>
                    </div>
                    <input type="text" placeholder="商品名称" class="input input-sm input-bordered input-info w-full max-w-xs"
                        v-model="productName" />
                </label>
                <button class="btn btn-outline btn-info btn-sm" @click="submit">查询</button>
                <button type="reset" class="btn btn-outline  btn-sm" @click="reset">重置</button>
                <button class="btn btn-outline btn-info btn-sm" @click="openModelHandler()">新增</button>

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
                            {{ p.name }}
                        </td>
                        <td>
                            {{ p.title }}
                        </td>
                        <td><span class="badge badge-ghost badge-sm">{{ p.stockQuantity }}</span></td>
                        <td><span class="badge badge-ghost badge-sm">{{ p.price }}</span></td>
                        <td><span class="">{{ p.storeId }}</span></td>
                        <td><span class="">{{ p.ownerId }}</span></td>
                        <th>
                            <button class="btn btn-ghost btn-xs" @click="openModelHandler(p.id)">编辑</button>
                            <button class="btn btn-ghost btn-xs" @click="delProduct(p.id)">删除</button>
                        </th>
                    </tr>

                </tbody>
            </table>
            <el-pagination background :page-size="10" layout="prev, pager, next" :total="total" />
        </div>
    </div>

    <ClientOnly>
        <el-dialog v-model="productShow"  :title="editId ? '编辑' : '新增'" width="30%" align-center :show-close="false">
            <el-form :model="formData" ref="ruleFormRef" :rules="rules" label-width="100px">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="商品标题" prop="title">
                    <el-input v-model="formData.title" />
                </el-form-item>
                <el-form-item label="库存" prop="stockQuantity">
                    <el-input-number v-model="formData.stockQuantity" :min="1" />
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input-number v-model="formData.price" :min="0.1" />
                </el-form-item>
                <el-form-item label="状态" prop="disabled">
                    <el-radio-group v-model="formData.disabled" class="ml-4">
                        <el-radio :label="0" size="large">上架</el-radio>
                        <el-radio :label="1" size="large">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品图片" prop="cover">
                    <el-upload class="avatar-uploader" accept=".png,.jpg" :show-file-list="false"
                        :http-request="customUpload" :on-success="uploadSuccess">
                        <img v-if="formData.cover" :src="formData.cover" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeModelHandler">取消</el-button>
                    <el-button type="primary" @click="confirmModel(ruleFormRef)">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </ClientOnly>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>