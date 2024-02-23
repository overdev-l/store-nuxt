<template>
    <div class="w-full h-full">
        <div class="stats shadow">
            <div class="stat">
                <div class="stat-figure text-primary">
                <Icon name="ep:goods-filled" color="#4a00ff" :size="40"/>
                </div>
                <div class="stat-title">商品数量</div>
                <div class="stat-value text-primary">{{ dataObj.productNum }}</div>
                <div class="stat-desc">21% more than last month</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">销售额</div>
                <div class="stat-value text-secondary">{{ dataObj.orderTotalPrice }}</div>
                <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">实际销售额</div>
                <div class="stat-value text-secondary">{{ dataObj.realPrice }}</div>
                <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">订单量</div>
                <div class="stat-value text-secondary">{{ dataObj.orderNum }}</div>
                <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">客单价</div>
                <div class="stat-value">{{ dataObj.unitPrice }}</div>
                <div class="stat-desc">↘︎ 90 (14%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">退货率</div>
                <div class="stat-value">{{ dataObj.refund }}</div>
                <div class="stat-desc">↘︎ 90 (14%)</div>
            </div>
        </div>
    <div id="chartId" style="width: 100%; height: 70%;"></div>
    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';

definePageMeta({
    layout: 'admin'
})
const dataObj = ref({
    productNum: 0,
    orderTotalPrice: 0,
    realPrice: 0,
    orderNum: 0,
    unitPrice: 0,
    refund: 0
})
onMounted(()=>{
    infoData()
})
const infoData = async() =>{
    let params = {
   
  }
  const { code, data, message } = await request<any>({
    url: '/api/info/data',
    method: 'post',
    data: params
  })
  dataObj.value = data
  var myChart = echarts.init(document.getElementById('chartId'));
// 绘制图表
myChart.setOption({
  title: {
    text: ''
  },
  tooltip: {},
  xAxis: {
    data: ['商品数量', '销售额', '实际销售额', '订单量', '客单价', '退货率']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [dataObj.value.productNum, dataObj.value.orderTotalPrice, dataObj.value.realPrice, dataObj.value.orderNum, dataObj.value.unitPrice, dataObj.value.refund]
    }
  ]
});
}
</script>