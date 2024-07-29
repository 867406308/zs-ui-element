import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import dynamicImportVars from 'vite-plugin-dynamic-import-vars';
import topLevelAwait from 'vite-plugin-top-level-await';
import fs from 'fs';

const pathSrc = path.resolve(__dirname, 'src');
console.log('aa', __dirname);

const optimizeDepsElementPlusIncludes = ['element-plus/es'];
const componentsDir = 'node_modules/element-plus/es/components';

const promises = fs.readdirSync(componentsDir).map((dirname) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(componentsDir, dirname, 'style', 'css.mjs');
    fs.access(filePath, (err) => {
      if (err) {
        resolve(); // 如果文件不存在，直接resolve
      } else {
        optimizeDepsElementPlusIncludes.push(
          `element-plus/es/components/${dirname}/style/css`,
        );
        resolve();
      }
    });
  });
});

(async () => {
  await Promise.all(promises); // 等待所有Promise完成
  console.log('bb', optimizeDepsElementPlusIncludes);
})();

export default defineConfig({
  resolve: {
    alias: {
      '@': `${pathSrc}`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`, //`@use "@/styles/element/index.scss" as *;`, //`@use "element-plus/theme-chalk/src/index.scss" as *;`
      },
    },
  },
  optimizeDeps: {
    include: optimizeDepsElementPlusIncludes,
  },
  plugins: [
    vue(),
    dynamicImportVars({
      include: './src/**/*.vue', // 设置需要匹配的文件路径
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core', 'vue-router'],
      // dirs: [path.resolve(pathSrc, 'typings', 'auto-imports.d.ts')],
      dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'),
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver(),
      ],
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        // 自动注册图标组件
        IconsResolver(),
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: path.resolve(pathSrc, 'typings', 'components.d.ts'),
    }),
    Icons({
      compiler: 'vue3', // 指定编译器
      autoInstall: true,
    }),
  ],
  // 服务配置
  server: {
    port: 17000, // 端口
    open: true, // 服务启动是否自动打开浏览器
    cors: true, // 允许跨域
    strictPort: false,
  },
  build: {
    emptyOutDir: true, // 打包时先清空上一次构建生成的目录.
    minify: 'terser',
    terserOptions: {
      // 生产环境时清除console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : [];
          const fileName =
            facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        },
      },
    },
  },
});
