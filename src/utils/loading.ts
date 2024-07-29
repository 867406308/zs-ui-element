const loadingInstance = ElLoading.service({
  text: '加载中...', // 文本内容
  spinner: 'el-icon-loading', // 加载图标
  background: 'rgba(0, 0, 0, 0.8)', // 背景颜色
  lock: true, // 是否锁定加载层
  zIndex: 1000, // z-index 值
  fullscreen: false, // 是否全屏
  body: false, // 是否将遮罩层添加到 body 上
  customClass: '', // 自定义类名
  textInside: false, // 是否将文本放在加载图标里面
  textColor: '#fff', // 文本颜色
  spinnerSize: 30, // 图标大小
  closeOnClickModal: false, // 是否点击遮罩关闭加载
  center: false, // 是否居中显示
  draggable: false, // 是否可拖动
  duration: 0, // 自动关闭的延迟时间
  beforeClose: () => {}, // 关闭前的回调函数
  onOpened: () => {}, // 打开后的回调函数
  onClose: () => {}, // 关闭后的回调函数
});

export const loading = {
  show: () => {
    loadingInstance;
  },
  hide: () => {
    nextTick(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 10000);
    });
  },
};
