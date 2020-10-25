import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';

import SiderCustom from '@gComponents/siderCustom';
import HeaderCustom from '@gComponents/headerCustom';
import comModules from '@comModules/index';
import utils from '@utils/utilsMain';
import BizMainRouter from './bizMainRouter';

//import 'style/index.less';
const {ajax} = comModules;

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        
    };

    componentDidMount() {
        //保存Sider收缩
    }

    render() {
        //const {location} = this.props;
        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom />
                <Layout style={{height: '100%'}}>
                    <HeaderCustom  username={name}/>
                    <Content style={{padding: '20px 20px 0 20px',minHeight:'auto',background:'#fff'}}>
                        <BizMainRouter/>
                    </Content>
                    <Footer style={{textAlign: 'center',padding:'15px'}}>
                        ©2020 Created by GBC
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

