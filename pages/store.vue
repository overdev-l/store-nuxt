<template>
    <div class="w-full h-full grid grid-cols-4 gap-2 justify-center items-center">
        <Product v-for="i in 50" :key="i"/>
    </div>
    <div class="w-full justify-center flex mt-2 pb-5">
        <el-pagination layout="prev, pager, next" :total="50" />
    </div>
</template>