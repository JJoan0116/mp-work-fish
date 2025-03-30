import { Component } from 'react'
import { initRem } from './utils/rem'
import 'taro-ui/dist/style/index.scss'
import './assets/iconfont/iconfont.css'
import './app.scss'


  class App extends Component {

  componentDidMount () {
    // 初始化rem适配
    if (['h5' ,'weapp'].includes(process.env.TARO_ENV)) {
      initRem()
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}


export default App
