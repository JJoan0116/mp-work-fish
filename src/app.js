import { Component } from "react";
import { Provider } from "react-redux";
// import { initRem } from "./utils/rem";
import store from "./store";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";
import "./assets/font/iconfont.css";

class App extends Component {
  componentDidMount() {
    // 初始化rem适配
    // if (["h5", "weapp"].includes(process.env.TARO_ENV)) {
    //   initRem();
    // }
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
