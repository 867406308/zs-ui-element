<template>
  <Icon
    :icon="icon"
    :color="color"
    class="svg-icon"
    :width="size"
    :height="size"
  />
  <!-- <div
    v-html="form.svg"
    :style="{ color: color, fontSize: size }"
    class="svg-icon"
  ></div> -->
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: 'ep:document',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
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
