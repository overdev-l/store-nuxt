<template>
    <div class="w-full h-full">
        <div class="stats shadow">
            <div class="stat">
                <div class="stat-figure text-primary">
                <Icon name="ep:goods-filled" color="#4a00ff" :size="40"/>
                </div>
                <div class="stat-title">商品数量</div>
                <div class="stat-value text-primary">25.6K</div>
                <div class="stat-desc">21% more than last month</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">销售额</div>
                <div class="stat-value text-secondary">4,200</div>
                <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">实际销售额</div>
                <div class="stat-value text-secondary">4,200</div>
                <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">订单量</div>
                <div class="stat-value text-secondary">4,200</div>
                <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">客单价</div>
                <div class="stat-value">1,200</div>
                <div class="stat-desc">↘︎ 90 (14%)</div>
            </div>
            <div class="stat place-items-center">
                <div class="stat-title">退货率</div>
                <div class="stat-value">1,200</div>
                <div class="stat-desc">↘︎ 90 (14%)</div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
</script>