import * as React from 'react';
import { Tabs, Select, Input, Button, Table, Modal, Form, Pagination } from 'antd';
import SignManageTag from './mailList.css';
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
                title: '名称',
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
                        <a onClick={this.showDeleteConfirm.bind(null, record.id)}>确认</a>
                    </span>;
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
                location: "虹口区四川北路999号",
                budget: "5亿",
                intro: "最具发展的商业中心",
                invoice: "12121212.pdf",
                contract: "12131313.pdf",
                accessory: "21212121.pdf",
            },
            {
                name: "宝地中心三期",
                location: "虹口区四川北路999号",
                budget: "10亿",
                intro: "最具发展的商业中心",
                invoice: "12121212.pdf",
                contract: "12131313.pdf",
                auditDepartment: "区审核部门",
                accessory: "21212121.pdf",
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
        let providerList = [{ key: 'all', providerUuid: '', providerName: '全部服务商' }];
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

    inputChange(e, value) {
        console.log('value=' + e.target.value);
        this.setState({
            programName: e.target.value
        });
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
    leadItem = () => {
        this.setState({ signModal: true })
    }
    handleOk = () => {
        this.props.form.validateFields((error, values) => {
            console.log("values:", values);
            if (error) {
                console.log(error);
                return;
            }
            let params = {
                "applicant": values.applicant,
                "providerUuid": values.providerUuid,
                "remark": values.remark,
                "signCode": values.signCode,
                "signName": values.signName,
            }
            ajax({
                url: requestConfig.smsImport,
                data: params,
            }).then(res => {
                console.log("1res:", res);
                this.getDataList();
                this.props.form.resetFields();
                this.setState({ signModal: false });
            }).catch(e => {

            })
        });
    }
    handleCancel = () => {
        this.setState({ signModal: false });
        this.props.form.resetFields();
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
                    所属服务商：<Select placeholder="" defaultValue='' onChange={this.providerChange}
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
            {/* <div className="sign-box" onClick={this.leadItem}>
                <Button type="primary" className="sign-btn">导入</Button>
            </div> */}
            <Tabs defaultActiveKey="1">
                <TabPane tab="项目打款列表" key="1">
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
                <TabPane tab="项目收款列表" key="2">
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
                <TabPane tab="项目转账列表" key="3">
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
                <TabPane tab="项目账户列表" key="4">
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
            </Tabs>

            <Modal
                title="基础信息"
                visible={this.state.signModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div style={{ textAlign: "right" }}> <span style={{ color: "#f5222d" }}>*</span> 为必填项</div>
                <Form>
                    <span id="selectId2" >
                        <Form.Item label='选择服务商'>
                            {
                                getFieldDecorator('providerUuid', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '这是必填项'
                                        }
                                    ]
                                })(
                                    <Select placeholder="请选择服务商" getPopupContainer={() => document.getElementById('selectId2')}>
                                        {
                                            providerNameList.map(item => {
                                                return <Option key={item.id} value={item.providerUuid}>{item.providerName}</Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </span>
                    <Form.Item label='签名'>
                        {
                            getFieldDecorator('signName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 30,
                                        message: `最多输入30个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写签名" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='申请人'>
                        {
                            getFieldDecorator('applicant', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 10,
                                        message: `最多输入10个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写申请人" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='id'>
                        {
                            getFieldDecorator('signCode', {
                                rules: [
                                    {
                                        required: false,
                                        message: 'id'
                                    }
                                ]
                            })(<Input placeholder="请填写id" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='备注'>
                        {
                            getFieldDecorator('remark', {
                                rules: [
                                    {
                                        required: false,
                                        message: 'remark'
                                    }, {
                                        max: 50,
                                        message: `最多输入50个字符！`
                                    }
                                ]
                            })(<TextArea placeholder="请填写备注" />)
                        }
                    </Form.Item>
                </Form>
            </Modal>

        </SignManageTag>
    }
}

export default Form.create()(SignManage);

