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
const handleCreated = (editor) => {
  editorRef.value = editor;
};
const emits = defineEmits(['change']);
const handleChange = (editor) => {
  // editor 变化时，更新 model 绑定的值
  valueHtml.value = editor.getHtml();
  emits('change', valueHtml.value);
};
</script>
