import React, { Component } from 'react';
import { Layout, Icon, Menu, Badge, message } from 'antd';
import styled from 'styled-components';
import userData from '@dataModel/userData';
import { observer } from 'mobx-react';
import comModules from '@comModules/index';
import uiData from '@dataModel/uiData';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const { requestConfig, ajax } = comModules;

const HeadTag = styled.div`
    .trigger{
        margin-left:20px;
    }
`;

@observer
export default class HeaderCustom extends Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed,
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        // window.location.hash = '/login';
        // localStorage['isLogined'] = '';
        // userData.setLogin(false);
        // message.info('成功退出');

        let params = {

        };
        ajax({
            url: requestConfig.logout,
            data: params
        }).then(res => {
            localStorage['isLogined'] = '';
            window.location.hash = '/login';
            // this.props.history.push('/login');
            userData.setLogin(false);
            message.info('成功退出');
        })

    }

    toggleLeftSide() {
        uiData.setCollapsed(!uiData.collapsed);
    }

    render() {
        return (
            <HeadTag>
                <Header style={{ background: '#fff', padding: 0 }} className="header">
                    <Icon
                        className="trigger"
                        type={uiData.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggleLeftSide.bind(this)}
                    />
                    <Menu
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <SubMenu
                            title={<span>
                                <Icon type="user" style={{ fontSize: 16, color: '#1DA57A' }} />{this.props.username}
                            </span>}
                        >
                            <Menu.Item key="logout" style={{ textAlign: 'center' }} className="logout" onClick={this.logout}>
                                <span >登出</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
            </HeadTag>
        )
    }
}

