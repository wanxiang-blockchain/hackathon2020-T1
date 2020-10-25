import * as React from 'react';
import { Tabs, Select, Input, Button, Table, Modal, Form, Pagination } from 'antd';
import SignManageTag from './signManage.css';
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
import comModules from '@comModules/index';
const { requestConfig, ajax, bizConfig } = comModules;
import utils from '@utils/utilsMain';

interface BaseProps {
    pageName?: string;
    detailUuid?: string;
    form?: any;
}

class SignManage extends React.Component<BaseProps, any>{
    state = {
        dataSource: [],
        columns: [
            {
                title: '项目名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '地点',
                dataIndex: 'location',
                key: 'location'
            },
            {
                title: '预算',
                dataIndex: 'budget',
                key: 'budget'
            },
            {
                title: '简介',
                dataIndex: 'intro',
                key: 'intro'
            },
            {
                title: '发票',
                dataIndex: 'invoice',
                key: 'invoice'
            },
            {
                title: '合同',
                dataIndex: 'contract',
                key: 'contract'
            },
            {
                title: '附件',
                dataIndex: 'accessory',
                key: 'accessory'
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (text, record) => {
                    return <span>
                        <a style={{ "marginRight": "10px" }} onClick={this.showDeleteConfirm.bind(null, record.id)}>通过</a>
                        <a style={{ "marginRight": "10px" }} onClick={this.showDeleteConfirm.bind(null, record.id)}>拒绝</a>
                        <a onClick={this.showDeleteConfirm.bind(null, record.id)}>流转</a>
                    </span >;
                }
            },
        ],
        providerList: [],
        providerNameList: [],

        providerUuid: '',
        programName: '',
        provider: '',
        signModal: false,

        pages: 1,

    }

    //分页属性设置
    tableOptions = {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        onSelect: (selected, selectedRows) => {

        },
        onPaging: (pageNum) => {
            this.tableOptions.pageNum = pageNum;
            this.getDataList();
        }
    };
    componentDidMount = () => {
        this.getDataList();
        this.getProviderList();
        this.getProviderNameList();
    }
    getDataList = () => {
        let dataList = [
            {
                name: "宝地中心二期",
                location: "虹口区四川北路229号",
                budget: "5亿",
                intro: "最具发展的商业中心",
                invoice: "202010251102131",
                contract: "12131313.pdf",
                accessory: "合同.pdf",
            },
            {
                name: "宝地中心三期",
                location: "虹口区四川北路339号",
                budget: "10亿",
                intro: "最具发展的商业中心",
                invoice: "202010241904121",
                contract: "12131313.pdf",
                auditDepartment: "区审核部门",
                accessory: "合同33.pdf",
            },
            {
                name: "万哈商业广场",
                location: "虹口区四川北路339号",
                budget: "10亿",
                intro: "最具发展的商业中心",
                invoice: "202010241904121",
                contract: "12131313.pdf",
                auditDepartment: "区审核部门",
                accessory: "合同22.pdf",
            },
            {
                name: "鑫源展示厅",
                location: "虹口区四川北路2239号",
                budget: "10亿",
                intro: "最具发展的商业中心",
                invoice: "202010241904121",
                contract: "12131313.pdf",
                auditDepartment: "区审核部门",
                accessory: "合同12.pdf",
            },
        ];
        this.setState({ dataSource: dataList });
        // let params = {
        //     "providerUuid": this.state.providerUuid,
        //     "pageNum": this.tableOptions.pageNum,
        //     "pageSize": this.tableOptions.pageSize,
        // }
        // ajax({
        //     url: requestConfig.smsQueryPage,
        //     data: params,
        // }).then(res => {
        //     console.log("res:", res);
        //     let dataList = this.formatData(res.list);
        //     // let providerNameList = this.formatProviderName(res.list);
        //     this.tableOptions.total = res.total;
        //     this.setState({ dataSource: dataList, pages: res.pages });
        // }).catch(e => {

        // })
    }
    // data change
    formatData = (data: Array<any> = []) => {
        return data.map((item) => {
            item.key = item.id;
            return item;
        });
    }
    // data change
    formatProviderName = (data: Array<any> = []) => {
        let res = [];
        data.forEach(item => {
            console.log(item)
            res.push({
                key: item.id,
                providerName: item.providerName
            });
        });
        return res;
    }

    getProviderList = () => {
        let params = {
            "available": 1
        }
        let providerList = [{ key: 'all', providerUuid: '', providerName: '全部项目' }];
        ajax({
            data: params,
            url: requestConfig.smsProviderNameList
        }).then(res => {
            res.forEach(item => {
                providerList.push({
                    key: item.providerUuid,
                    providerUuid: item.providerUuid,
                    providerName: item.providerName
                });
            });
            this.setState({ providerList });
        });
    }
    getProviderNameList = () => {
        let params = {
            "available": 1
        }
        ajax({
            url: requestConfig.smsProviderNameList,
            data: params,
        }).then(res => {
            console.log("getProviderNameList:", res);
            let dataList = this.formatData(res);
            this.setState({ providerNameList: dataList });
        }).catch(e => {

        })
    }
    showDeleteConfirm = (id) => {
        let that = this;
        confirm({
            title: '确定删除此项?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteItem(id);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    deleteItem = (id) => {
        let params = {
            id: id
        }
        ajax({
            url: requestConfig.smsDelete,
            data: params,
        }).then(res => {
            console.log("delete-res:", res);
            this.getDataList();
        }).catch(e => {

        })
    }

    providerChange = (value) => {
        console.log('value:', value);
        this.setState({
            providerUuid: value,
        })
    }

    searchFun() {
        this.getDataList();
    }

    render() {
        let { pageNum, pageSize, total, onPaging } = this.tableOptions;
        let { columns, dataSource, providerList, providerNameList, programName, provider } = this.state;
        const { getFieldDecorator } = this.props.form;
        let pagination = {
            total: this.tableOptions.total,
            pageSize: this.tableOptions.pageSize,
            onChange: this.tableOptions.onPaging.bind(this)
        }
        return <SignManageTag>
            <div className="searchBox">
                <span>
                    项目：<Select placeholder="" defaultValue='' onChange={this.providerChange}
                        id="selectId" getPopupContainer={() => document.getElementById('selectId')}
                        style={{ width: 120, marginRight: '90px' }} >
                        {
                            providerList.map(item => {
                                return <Option key={item.providerUuid} value={item.providerUuid}>{item.providerName}</Option>
                            })
                        }
                    </Select>
                </span>
                <Button type="primary" onClick={this.searchFun.bind(this)}>查 询</Button>
            </div>

            <Tabs defaultActiveKey="1">
                <TabPane tab="项目审批列表" key="1">
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
            </Tabs>
        </SignManageTag>
    }
}

export default Form.create()(SignManage);

