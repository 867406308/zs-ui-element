<template>
  <div v-html="form.svg" :style="{ color: color, fontSize: size }" class="svg-icon"></div>
</template>
<script lang="ts" setup>
import icons from '@/assets/icons.json';
import lodash from 'lodash';
import { onBeforeMount, reactive } from 'vue';
const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'document',
  },
  color: {
    type: String,
    default: 'black',
  },
  size: {
    type: String,
    default: '16px',
  },
});
const form = reactive({
  svg: '',
});
onBeforeMount(() => {
  form.svg = lodash.find(icons, { name: props.icon })?.svg ?? '';
});
</script>
<style lang="scss" scoped>
.svg-icon {
  display: flex;
}
</style>
