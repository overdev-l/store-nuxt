<template>
    <div class="w-full h-fit">
        <div class="header">
            <div class="left">
                <img class="shopImg" :src="detailData.cover" alt="">
            </div>
            <el-card class="right">
                <h2 class="title">{{ detailData.title }}</h2>
                <p>单价: {{ detailData.price }}</p>
                <p>重量：1.2kg</p>
                <p>已售: 2万+</p>
            </el-card>
        </div>
        <div class="footer">
            <h1>宝贝详情</h1>
            <el-card class="content">
                <div style="width:100vw;display: flex;justify-content: center;justify-content: center;">
                    <ul>
                    <li>功效：杀菌除垢</li>
                    <li>物理形态：粉状</li>
                    <li>品牌：KAO/花王</li>
                </ul>
                <ul>
                    <li>品名：花王洗衣机槽清洗剂6袋组合</li>
                    <li>套餐类型：除垢消臭</li>
                    <li>适用对象：通用</li>
                </ul>
                 <ul>
                    <li>规格类型：正常规格</li>
                    <li>是否量贩装：否</li>
                    <li>原产国/地区：日本</li>
                </ul>
                <ul>
                    <li>包装规格：6袋</li>
                </ul>
                </div>
                <div style="margin-top: 50px;">
                <img src="//img.alicdn.com/imgextra/i4/2200805177137/O1CN01AIKPf122anUmSVAR2_!!2200805177137-0-scmitem6000.jpg" align="absmiddle" width="1200">
                <img src="//img.alicdn.com/imgextra/i1/2200805177137/O1CN010UECJ322anUogMetR_!!2200805177137-0-scmitem6000.jpg" align="absmiddle" width="1200">
                <img src="//img.alicdn.com/imgextra/i1/2200805177137/O1CN01eHokI222anUrkenOI_!!2200805177137-0-scmitem6000.jpg" align="absmiddle" width="1200">
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
const productId = ref<any>('')
const detailData = ref<any>({})
onMounted(() => {
    productId.value = route.params.id
    getDetail()
})
const getDetail = async () => {
    let params = {
        productId: productId.value,
    }
    const { code, data, message } = await request<any>({
        url: '/api/public/productDetail',
        method: 'post',
        data: params
    })
    detailData.value = data
}
</script>

<style scoped>
.header {
    display: flex;
}
.left{
    width: 40%;
}
.shopImg {
    width: 400px;
    height: 400px;
}

.right {
    width: 85%;
    margin-left: 20px;
    height: 400px;
}

.title {
    font-size: 30px;
    font-weight: 900;
}

p {
    margin-top: 20px;
}
.footer{
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
}
.content{
    width: 100%;
}
ul{
    width: 100%;
}
li{
    margin: 5px ;
}
</style>