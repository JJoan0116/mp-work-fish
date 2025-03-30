export default defineAppConfig({
  pages: [
    'pages/today/index',
    // 'pages/diary/index',
    // 'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // tabBar: {
  //   color: '#8395A7',
  //   selectedColor: '#3498DB',
  //   backgroundColor: '#FFFFFF',
  //   borderStyle: 'black',
  //   list: [
  //     {
  //       pagePath: 'pages/today/index',
  //       text: '今日摸鱼',
  //       // iconPath: 'https://via.placeholder.com/24',
  //       // selectedIconPath: 'https://via.placeholder.com/24/3498DB'
  //     },
  //     {
  //       pagePath: 'pages/diary/index',
  //       text: '摸鱼日记',
  //       // iconPath: 'https://via.placeholder.com/24',
  //       // selectedIconPath: 'https://via.placeholder.com/24/3498DB'
  //     }
  //   ]
  // }
})
