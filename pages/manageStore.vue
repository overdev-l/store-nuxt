<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const userId = ref('')
const storeName=ref('')
const data = (new Array(8)).fill(0)

const submitQuery = (e: Event) => {
  e.preventDefault()
}
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-fit">
      <form action="" class="flex gap-2 items-end" ref="formRef" @submit="submitQuery">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">用户ID</span>
          </div>
          <input type="text" placeholder="用户ID"
                 class="input input-sm input-bordered input-info w-full max-w-xs" v-model="userId" />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">店铺名称</span>
          </div>
          <input type="text" placeholder="店铺名称"
                 class="input input-sm input-bordered input-info w-full max-w-xs" v-model="storeName" />
        </label>
        <button type="submit" class="btn btn-outline btn-info btn-sm">查询</button>
        <button type="reset" class="btn btn-outline  btn-sm">重置</button>
      </form>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
        <tr>
          <th>封面图</th>
          <th>店铺名称</th>
          <th>运营状态</th>
          <th>创建时间</th>
          <th>店铺ID</th>
          <th>用户ID</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr v-for="(p, index) in data" :key="index">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img src="/xx.jpg" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-ghost badge-sm">蘑菇</span>
          </td>
          <td>
            <div class="max-w-[150px]">东北大蘑菇大棚培育东北大蘑菇东北大蘑菇大棚培育东北大蘑菇</div>
          </td>
          <td><span class="badge badge-ghost badge-sm">xxxxxxxxx</span></td>
          <td><span class="badge badge-ghost badge-sm">xxxxxxxxx</span></td>
          <th>
            <button class="btn btn-ghost btn-xs">编辑</button>
            <button class="btn btn-ghost btn-xs">删除</button>
          </th>
        </tr>

        </tbody>
      </table>
      <div class="join w-full">
        <button class="join-item btn">«</button>
        <button class="join-item btn">1</button>
        <button class="join-item btn bg-info">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">4</button>
        <button class="join-item btn">»</button>
      </div>
    </div>
  </div>
</template>
