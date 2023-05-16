<template>
  <div v-html="form.svg" class="svg-icon"></div>
</template>
<script lang="ts" setup>
import icons from '@/assets/icons.json'
import lodash from 'lodash'
import { onBeforeMount, reactive } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'document'
  }
})
const form = reactive({
   svg: ''
})
onBeforeMount(() => {
  console.log('icons', icons)
  form.svg = lodash.find(icons,  { 'name': props.icon})?.svg ?? '';
  console.log('form', form)
})
</script>
<style lang="scss" scoped>
  .svg-icon{
    display: flex;
  }
</style>