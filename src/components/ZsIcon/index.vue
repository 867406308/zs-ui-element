<template>
  <div class="svg-icon">
    <SvgIcon :icon="icon" :color="color" :size="size" />
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'ep-document',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '1em',
  },
});
</script>
<style lang="scss" scoped>
.svg-icon {
  display: flex;
  :deep() {
    svg {
      height: 1em;
      width: 1em;
      font-size: var(--zs-font-size-medium);
    }
  }
}
</style>
