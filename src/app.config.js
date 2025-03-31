export default defineAppConfig({
  pages: [
    'pages/today/index',
    'pages/stats/index',
    'pages/diary/index',
    // 'pages/settings/index',
    // 'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '摸鱼薪资计算器',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#1E88E5',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/today/index',
        text: `Let's摸鱼`,
        // iconPath: 'assets/images/home.svg',
        // selectedIconPath: 'assets/images/home-active.svg'
      },
      {
        pagePath: 'pages/stats/index',
        text: '本周统计',
        // iconPath: 'assets/images/stats.svg',
        // selectedIconPath: 'assets/images/stats-active.svg'
      },
      {
        pagePath: 'pages/diary/index',
        text: '历史摸鱼',
        // iconPath: 'assets/images/history.svg',
        // selectedIconPath: 'assets/images/history-active.svg'
      }
    ]
  }
})
