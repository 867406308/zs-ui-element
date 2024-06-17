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

const pathSrc = path.resolve(__dirname, 'src');

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
        IconsResolver({
          prefix: 'Icon',
        }),
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
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: path.resolve(pathSrc, 'typings', 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      // 自动安装
      // autoInstall: true,
      // 自定义svg图标
      customCollections: {
        // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
        // custom: FileSystemIconLoader('./src/assets/icons'),
        custom: FileSystemIconLoader('./src/assets/icons.json', (svg) =>
          svg.svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
      iconCustomizer(collection, icon, props) {
        const name = `${collection}:${icon}`;
      },
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
