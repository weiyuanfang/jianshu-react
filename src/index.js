import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 引入全局样式
import { GlobalStyle } from './style';
import { IconFontStyle } from "./statics/iconfont/iconfont";

ReactDOM.render(
  <React.Fragment>
      <GlobalStyle />
      <IconFontStyle />
      <App />
  </React.Fragment>,
  document.getElementById('root')
);

