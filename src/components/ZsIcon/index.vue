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
import {
  quicklyValidateIconSet,
  parseIconSet,
  iconToSVG,
  getIconData,
  iconToHTML,
  replaceIDs,
} from '@iconify/utils';
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
    default: '',
  },
});
const form = reactive({
  svg: '',
});
const iconRef = ref(props.icon);
const newIcons = [];

const toIcons = () => {
  icons.forEach((icon) => {
    const iconSet = quicklyValidateIconSet(icon);
    if (!iconSet) {
      console.error('Invalid icon set');
    } else {
      const iconList = [];
      parseIconSet(icon, (iconName, data) => {
        const renderData = iconToSVG(data, {
          height: '1em',
          width: '1em',
        });
        const svg = iconToHTML(
          replaceIDs(renderData.body),
          renderData.attributes,
        );
        newIcons.push({
          name: iconName,
          svg: svg,
        });
      });
    }
  });
};

onBeforeMount(() => {
  toIcons();
  form.svg = lodash.find(newIcons, { name: iconRef.value })?.svg ?? '';
});
watch(
  () => props.icon,
  (newIcon) => {
    iconRef.value = newIcon;
    form.svg = lodash.find(newIcons, { name: newIcon })?.svg ?? '';
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
      font-size: var(--zs-font-size-medium);
    }
  }
}
</style>
