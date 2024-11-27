<!-- SvgIcon.vue -->
<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true">
    <use :href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '1.5em', // 默认大小为1em
  },
  color: {
    type: String,
    default: 'currentColor', // 默认颜色为当前文本颜色
  },
});
const { proxy }: any = getCurrentInstance();
const iconName = computed(() => {
  const iconId = props.icon; // 假设props.icon只包含图标的ID
  // 检查图标是否存在于sprite中
  if (!isIconInSprite(iconId)) {
    // 如果图标存在，则使用完整的sprite URL和图标ID
    return `${proxy.$iconSprite}#${iconId}`;
  } else {
    // 如果图标在sprite中不存在，则使用回退选项
    return `#${iconId}`;
  }
});
const svgClass = computed(() => `svg-icon ${props.className}`);
const svgStyle = computed(() => ({
  width: props.size,
  height: props.size,
  fill: props.color,
}));

// 检查图标是否存在于sprite中的函数
const isIconInSprite = (iconId: string): boolean => {
  if (!iconId) {
    console.error('Invalid iconId:', iconId);
    return false;
  }
  // 转义 iconId 中的冒号
  const escapedIconId = iconId.replace(/:/g, '\\:');
  const spriteSymbol = document.querySelector(`#${escapedIconId}`);
  return spriteSymbol !== null;
};
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
