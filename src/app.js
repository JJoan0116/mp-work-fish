import { Component } from "react";
import { Provider } from "react-redux";
import { initRem } from "./utils/rem";
import store from "./store";
import "taro-ui/dist/style/index.scss";
import "./assets/iconfont/iconfont.css";
import "./app.scss";

class App extends Component {
  componentDidMount() {
    // 初始化rem适配
    if (["h5", "weapp"].includes(process.env.TARO_ENV)) {
      initRem();
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
