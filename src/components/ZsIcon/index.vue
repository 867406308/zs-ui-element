<template>
  <div
    v-html="form.svg"
    :style="{ color: color, fontSize: size }"
    class="svg-icon"
  ></div>
</template>
<script lang="ts" setup>
import icons from '@/assets/icons.json';
import lodash from 'lodash';
const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'document',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '16px',
  },
});
const form = reactive({
  svg: '',
});
const iconRef = ref(props.icon);

onBeforeMount(() => {
  form.svg = lodash.find(icons, { name: iconRef.value })?.svg ?? '';
});
watch(
  () => props.icon,
  (newIcon) => {
    iconRef.value = newIcon;
    form.svg = lodash.find(icons, { name: newIcon })?.svg ?? '';
  },
);
</script>
<style lang="scss" scoped>
.svg-icon {
  display: flex;
  :deep() {
    svg {
      height: 1em;
      width: 1em;
    }
  }
}
</style>
