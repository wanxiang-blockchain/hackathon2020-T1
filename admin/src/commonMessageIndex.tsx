import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './views/layout';
import './static/style/global.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

/***
* 
gbcContainer 入口文件
*
***/

ReactDOM.render(<Layout />, document.getElementById('gbcContainer'));
