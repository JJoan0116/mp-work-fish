// 设置 rem 函数
function setRem() {
  // 基准大小
  const baseSize = 37.5;
  // 获取当前设备的宽度
  const clientWidth = typeof window !== 'undefined' ? document.documentElement.clientWidth : 375;
  // 计算缩放比例
  const scale = clientWidth / 375;
  // 设置html的font-size
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}

// 初始化
export function initRem() {
  // 初始化
  setRem();
  // 改变窗口大小时重新设置 rem
  window.addEventListener('resize', setRem);
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      setRem();
    }
  });
}