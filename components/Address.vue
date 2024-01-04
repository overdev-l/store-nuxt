<template>
  <div>
    <ClientOnly>
      <el-drawer :model-value="value" title="收货地址" direction="rtl" :before-close="close">
        <div class="w-full h-fit flex flex-col gap-2">
          <AddressItem />
          <AddressItem />
          <el-button @click="addressProp" type="primary" round>添加收货地址</el-button>
        </div>
      </el-drawer>
    </ClientOnly>
    <el-dialog v-model="dialogVisible" title="添加收货地址" width="30%" :before-close="handleClose">
      <el-form   ref="ruleFormRef"  :rules="rules" :model="form" label-width="130px">
        <el-form-item label="收货人:" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所在地区:" prop="addressList">
          <el-cascader placeholder="请选择" style="width: 100%;" v-model="form.addressList" :options="options" :props="props"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" prop="textarea">
          <el-input v-model="form.textarea" :rows="2" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设为默认收货地址:" prop="acquiesce">
          <el-switch v-model="form.acquiesce" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import AddressItem from "~/components/AddressItem.vue";

defineProps<{
  value: boolean
}>()
const emits = defineEmits(["close"])
const dialogVisible = ref(false)
const form = ref<any>({
  name: '',
  phone: '',
  addressList: [],
  textarea: '',
  acquiesce: false,
})
const options = ref<any[]>([])
const props = {
  expandTrigger: 'hover' as const,
  value: 'id', // 对应每个选项的值
  label: 'name', // 对应每个选项的显示文本
  children: 'children' // 对应每个选项的子选项
}
const ruleFormRef = ref<any>()
const rules = reactive<any>({
  name: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  phone: [
    {
      required: true,
      message: '请输入',
      trigger: 'change',
    },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  addressList: [
    { required: true, message: '请选择', trigger: 'blur' },
  ],
  textarea: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
})
const close = () => {
  emits("close")
}
const addressData = async () => {
  const { code, data, message } = await request<any>({
    url: '/api/address/locations',
    method: 'post',
    data: {}
  })
  options.value = data
  const processedData = data.map((item:any) => replaceKeys(item));
  console.log(processedData, 'processedData')
  options.value = processedData;
}
const addressProp = () => {
  dialogVisible.value = true
  addressData()
}
const handleClose = () => {

}
const handleChange = () => {

}
function replaceKeys(item: any) {
  // 替换 cities 为 children
  if (item.cities && item.cities.length > 0) {
    item.children = item.cities.map(replaceKeys);
    delete item.cities;
  }

  // 替换 areas 为 children
  if (item.areas && item.areas.length > 0) {
    item.children = item.areas.map(replaceKeys);
    delete item.areas;
  }

  // 替换 streets 为 children
  if (item.streets && item.streets.length > 0) {
    item.children = item.streets.map(replaceKeys);
    delete item.streets;
  }

  // 删除空的 children 数组
  if (item.children && item.children.length === 0) {
    delete item.children;
  }

  return item;
}
const cancel = () => {
  form.value.name = ''
  form.value.phone = ''
  form.value.addressList = []
  form.value.textarea = ''
  form.value.acquiesce = false
  dialogVisible.value = false
}

const submitForm = async (formEl: any) => {
  console.log(formEl);
  
  if (!formEl) return
  await formEl.validate((valid:any, fields:any) => {
    if (valid) {
      dialogVisible.value = false
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
onMounted(() => {
  addressData
})
</script>