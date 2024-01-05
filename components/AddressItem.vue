<script setup lang="ts">
import { defineProps } from 'vue';
const emits = defineEmits(["delAdderssFun","editAdderssFun"])
const props = defineProps(['item']);
const delAdderss = (id:any) =>{
  emits("delAdderssFun",id)
}
const editAdderss = () => {
  emits("editAdderssFun",props.item)
}
</script>

<template>
  <div class="collapse bg-base-200">
    <input type="radio" name="my-accordion-1" checked="checked" />
    <div class="collapse-title text-xl font-medium online">
      <span>{{ props.item.provinceName +  props.item.cityName + props.item.areaName + props.item.streetName + props.item.detail }} </span>
      <span v-if="props.item.isDefault" class="badge badge-info badge-lg">默认</span>
    </div>
    <div class="collapse-content flex gap-3 items-center">
      <p>{{ props.item.name }}</p>
      <p>{{ props.item.phone }}</p>
      <button type="submit" @click="editAdderss" class="btn btn-outline btn-info btn-sm">修改</button>
      <button @click="delAdderss(item.id)" type="reset" class="btn btn-outline btn-error  btn-sm">删除</button>
    </div>
  </div>
</template>

<style scoped>

</style>