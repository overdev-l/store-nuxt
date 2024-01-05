<template>
  <div>
    <ClientOnly>
      <el-drawer :model-value="value" title="收货地址" direction="rtl" :before-close="close">
        <div class="w-full h-fit flex flex-col gap-2">
          <AddressItem @editAdderssFun="editAdderssFun" @delAdderssFun="delAdderssFun"
            v-for="(item, index) in addressListData" :item="item" :key="index" />
          <el-button @click="addressProp" type="primary" round>添加收货地址</el-button>
        </div>
      </el-drawer>
    </ClientOnly>
    <el-dialog v-model="dialogVisible" :title="isedit ? '修改收货地址' : '添加收货地址'" width="25%" :before-close="handleClose">
      <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="130px">
        <el-form-item label="收货人:" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所在地区:" prop="addressList">
          <el-cascader ref="refSubCat" placeholder="请选择" style="width: 100%;" v-model="form.addressList"
            :options="options" :props="props" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址:" prop="textarea">
          <el-input v-model="form.textarea" :rows="2" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="isedit" label="设为默认收货地址:" prop="acquiesce">
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
const refSubCat = ref()
const isedit = ref<any>(false)
const form = ref<any>({
  name: '',
  phone: '',
  addressList: [],
  textarea: '',
  acquiesce: false,
  id: ''
})
const options = ref<any[]>([])
const addressListData = ref<any[]>([])
const addresNameData = ref([])
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
  const processedData = data.map((item: any) => replaceKeys(item));
  console.log(processedData, 'processedData')
  options.value = processedData;
}
const addressProp = () => {
  dialogVisible.value = true
  isedit.value = false
  addressData()
}
const handleClose = () => {

}
const handleChange = () => {
  console.log(refSubCat.value.getCheckedNodes()[0].pathLabels)
  addresNameData.value = refSubCat.value.getCheckedNodes()[0].pathLabels
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
  form.value.id = ''
  dialogVisible.value = false
}

const submitForm = async (formEl: any) => {

  if (!formEl) return
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      let params:any = {
        "provinceCode": form.value.addressList[0],
        "provinceName": addresNameData.value[0],
        "cityName": addresNameData.value[1],
        "cityCode": form.value.addressList[1],
        "areaName": addresNameData.value[2],
        "areaCode": form.value.addressList[2],
        "streetName": addresNameData.value.length > 3 ? addresNameData.value[3] : '',
        "streetCode": form.value.addressList.length > 3 ? form.value.addressList[3] : '',
        "detail": form.value.textarea,
        "name": form.value.name,
        "phone": form.value.phone
      }
      if (isedit.value) {
        params.isDefault = form.value.acquiesce ? 1 : 0
        params.id = form.value.id
        const { code, data, message } = await request<any>({
          url: '/api/address/update',
          method: 'post',
          data: params
        })
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
      } else {
        const { code, data, message } = await request<any>({
          url: '/api/address/add',
          method: 'post',
          data: params
        })
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      }

      dialogVisible.value = false
      form.value.name = ''
      form.value.phone = ''
      form.value.addressList = []
      form.value.textarea = ''
      form.value.acquiesce = false
      form.value.id = ''
      getList()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const getList = async () => {
  const { code, data, message } = await request<any>({
    url: '/api/address/list',
    method: 'post',
    data: {}
  })
  addressListData.value = data
}
const delAdderssFun = async (id: any) => {
  const { code, data, message } = await request<any>({
    url: '/api/address/del?id=' + id,
    method: 'post',
    data: {}
  })
  if (code === 1) {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    getList()
  }

}
const editAdderssFun = (item: any) => {
  isedit.value = true
  dialogVisible.value = true
  form.value.name = item.name
  form.value.phone = item.phone
  form.value.addressList = item.streetCode ? [item.provinceCode, item.cityCode, item.areaCode, item.streetCode] : [item.provinceCode, item.cityCode, item.areaCode]
  form.value.textarea = item.detail
  form.value.id = item.id
  form.value.acquiesce = item.isDefault === 1 ? true : false
  addressData()
}
onMounted(() => {
  addressData
})
defineExpose({
  getList
})
</script>