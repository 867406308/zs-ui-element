<template>
  <el-space wrap>
    <div
      v-for="icon in icons"
      :key="icon"
      class="icon-item"
      @click="handleClick(icon)"
      v-memo="[icon, prefix]"
    >
      <Icon :icon="iconWithPrefix(icon)" height="24" width="24" />
    </div>
  </el-space>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const radio1 = ref('New York');
const props = defineProps({
  icons: {
    type: Array,
    required: true,
    default: () => [],
  },
  prefix: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['select']);
const iconWithPrefix = (icon) => `${props.prefix}:${icon}`;
const handleClick = (icon) => {
  emits('select', iconWithPrefix(icon));
};
</script>
<style lang="scss" scoped>
.icon-item {
  cursor: pointer;
  padding: 10px;
  margin: 0px;
  border-radius: 4px;
  border: 1px solid var(--zs-border-color);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--zs-color-primary);
  }
}
</style>
