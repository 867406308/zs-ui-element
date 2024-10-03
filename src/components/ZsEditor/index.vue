<template>
  <div style="border: 1px solid #ccc; z-index: 999">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
const mode = 'simple'; // or 'default'
const editorRef = shallowRef();
const valueHtml = ref('');
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };
const props = defineProps({
  modelValue: String, // 接收一个名为 modelValue 的 prop
});

const handleCreated = (editor) => {
  editorRef.value = editor;
};
const emits = defineEmits(['update:modelValue', 'change']);
const handleChange = (editor) => {
  // editor 变化时，更新 model 绑定的值
  valueHtml.value = editor.getHtml();
  emits('update:modelValue', valueHtml.value);
  emits('change', valueHtml.value);
};

// onBeforeUnmount(() => {
//   const editor = editorRef.value;
//   if (editor == null) return;
//   editor.destroy();
// });

watch(
  () => props.modelValue,
  (newValue) => {
    if (valueHtml.value !== newValue) {
      valueHtml.value = newValue; // 当传入的 modelValue 变化时，更新内部值
    }
  },
);

// defineExpose({
//   editorRef,
// });
</script>
<style>
.w-e-toolbar {
  z-index: 3 !important;
}
.w-e-menu {
  z-index: 4 !important;
}
.w-e-text-container {
  z-index: 3 !important;
}
</style>
