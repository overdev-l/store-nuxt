<template>
  <ClientOnly>
    <el-drawer :model-value="value" title="我的订单" direction="rtl" :before-close="close">
      <div class="w-full h-fit flex flex-col gap-2">
        <AddressItem />
        <AddressItem />
        <AddressItem />
        <AddressItem />
        <AddressItem />
      </div>
    </el-drawer>

  </ClientOnly>
</template>

<script setup lang="ts">
import AddressItem from "~/components/AddressItem.vue";

defineProps<{
  value: boolean
}>()
const emits = defineEmits(["close"])

const close =() => {
  emits("close")
}
</script>