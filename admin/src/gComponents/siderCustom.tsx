import React, { Component } from 'react';
import { Layout, Menu, Icon, Table, Divider, Tag } from 'antd';
import { } from 'antd';

import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import uiData from '@dataModel/uiData';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const { Column, ColumnGroup } = Table;
const SideTag = styled.div``;

const initState = {
    selectedKeys: [window.location.hash.slice(1)]
}

type Tstate = Readonly<typeof initState>;

@observer
export default class SiderCustom extends Component<any, Tstate>{
    constructor(props) {
        super(props);
        this.state = initState;

    }
    componentDidMount() {
        this.hashChange();
    }

    hashChange() {
        window.removeEventListener('hashchange', this.hashListener.bind(this), false)
        window.addEventListener('hashchange', this.hashListener.bind(this), false)
    }

    hashListener(e) {
        let curHash = window.location.hash.slice(1);
        this.setState({
            selectedKeys: [curHash]
        });
    }

    setMenuOpen = props => {

    };

    menuClick = e => {

    };
    openMenu = v => {

    };

    render() {
        let menuList = [
            {
                key: '01',
                iconType: 'apartment',
                subName: '项目申请',
                pages: [
                    {
                        link: '/biz/programManage',
                        pageName: '项目申请列表'
                    },
                    // {
                    //     link: '/biz/programDetails',
                    //     pageName: '项目列表详情'
                    // },
                ]
            },
            {
                key: '02',
                iconType: 'schedule',
                subName: '项目审批',
                pages: [
                    {
                        link: '/biz/signList',
                        pageName: '项目审批列表'
                    }
                ]
            },
            {
                key: '03',
                iconType: 'file-done',
                subName: '资金管理',
                pages: [
                    {
                        link: '/biz/mailList',
                        pageName: '资金管理列表'
                    }
                ]
            },
            {
                key: '04',
                iconType: 'gateway',
                subName: '用户中心',
                pages: [
                    {
                        link: '/biz/messageList',
                        pageName: '用户中心列表'
                    }
                ]
            },
        ]
        return (
            <Sider
                trigger={null}
                collapsed={uiData.collapsed}
            >
                <div className={uiData.collapsed ? 'logo' : 'logo_long'} />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={this.state.selectedKeys}
                    defaultOpenKeys={["01"]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                >
                    {
                        menuList.map(item => {
                            return <SubMenu key={item.key} title={<span><Icon type={item.iconType} /><span>{item.subName}</span></span>} >
                                {
                                    item.pages.map(pageItem => {
                                        return <Menu.Item key={pageItem.link}>
                                            <Link to={pageItem.link}><span>{pageItem.pageName}</span></Link>
                                        </Menu.Item>
                                    })
                                }
                            </SubMenu>
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

