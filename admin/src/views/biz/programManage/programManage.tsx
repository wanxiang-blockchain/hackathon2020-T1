import * as React from 'react';
import { Tabs, Select, Input, Button, Table, Form, Modal, Pagination } from 'antd';
import utils from '@utils/utilsMain';
import { Link } from 'react-router-dom';
import ProgramManageTag from './programManage.css';
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;
import comModules from '@comModules/index';
const { requestConfig, ajax, bizConfig } = comModules;
interface CurProps extends BaseProps {
    pageName?: string;
    detailUuid?: string;
    form?: any;
}

class ProgramManage extends React.Component<CurProps, any>{
    state = {
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
                title: '审核部门',
                dataIndex: 'auditDepartment',
                key: 'auditDepartment'
            },
            {
                title: '附件',
                dataIndex: 'accessory',
                key: 'accessory'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            // {
            //     title: '操作',
            //     dataIndex: 'actions',
            //     key: 'actions',
            //     render: (text, record) => {
            //         // return <span>
            //         //     <a onClick={this.checkItem.bind(this, record)}>查看详情</a>
            //         // </span>
            //         return <span>
            //             <a style={{ "marginRight": "10px" }} onClick={this.showDeleteConfirm.bind(this, record.projectUuid)}>删除</a>
            //             <Link to={'/biz/programDetails?' + record.projectUuid}><span>查看详情</span></Link>
            //         </span>
            //     }
            // }
        ],
        dataSource: [],
        projectNameList: [],
        providerNameList: [],

        programName: '',
        provider: '',
        signModal: false,
        projectUuid: '',

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
        this.getProjectList();
        this.getProviderNameList();
    }
    getDataList = () => {
        let dataList = [
            {
                name: "红地中心二期",
                location: "虹口区四川北路9号",
                budget: "5亿",
                intro: "最具发展的商业中心",
                invoice: "12121212.pdf",
                contract: "12131313.pdf",
                auditDepartment: "区审核部门",
                accessory: "21212121.pdf",
                status: "待审核",
            },
            {
                name: "华侨中心大厦",
                location: "虹口区天潼路99号",
                budget: "10亿",
                intro: "居住中心",
                invoice: "xcxcx.pdf",
                contract: "gfgfgfg.pdf",
                auditDepartment: "区审核部门",
                accessory: "0909090.pdf",
                status: "待审核",
            },
            {
                name: "达科技术达大厦",
                location: "虹口区四川北路999号",
                budget: "1亿",
                intro: "繁忙的商业活动场所",
                invoice: "12121.pdf",
                contract: "121366661313.pdf",
                auditDepartment: "区审核部门",
                accessory: "44.pdf",
                status: "审核通过",
            },
            {
                name: "建不业君健城",
                location: "虹口区天潼路01号",
                budget: "6亿",
                intro: "居住中心",
                invoice: "xcxcx.pdf",
                contract: "gfgfgfg.pdf",
                auditDepartment: "区审核部门",
                accessory: "0909090.pdf",
                status: "待审核",
            },
            {
                name: "不眠小城",
                location: "虹口区四川北路08号",
                budget: "1.5亿",
                intro: "繁忙的商业活动场所",
                invoice: "3333.pdf",
                contract: "121366661313.pdf",
                auditDepartment: "区审核部门",
                accessory: "44.pdf",
                status: "待审核",
            },
            {
                name: "开心小镇",
                location: "虹口区天潼路44号",
                budget: "5.4亿",
                intro: "居住中心",
                invoice: "xcxcx.pdf",
                contract: "gfgfgfg.pdf",
                auditDepartment: "区审核部门",
                accessory: "0909090.pdf",
                status: "审核失败",
            },
            {
                name: "趣味游乐园",
                location: "虹口区四川北路94号",
                budget: "2000万",
                intro: "繁忙的商业活动场所",
                invoice: "3333.pdf",
                contract: "121366661313.pdf",
                auditDepartment: "区审核部门",
                accessory: "44.pdf",
                status: "待审核",
            },
        ];
        this.setState({ dataSource: dataList });
        // let params = {
        //     "projectUuid": this.state.projectUuid,
        //     "pageNum": this.tableOptions.pageNum,
        //     "pageSize": this.tableOptions.pageSize,
        // }
        // ajax({
        //     url: requestConfig.smsProjectList,
        //     data: params,
        // }).then(res => {
        //     console.log("res:", res);
        //     let dataList = this.formatData(res.list);
        //     this.tableOptions.total = res.total;
        //     this.setState({ dataSource: dataList, pages: res.pages });
        // }).catch(e => {

        // })
    }
    // data change
    formatData = (data: Array<any> = []) => {
        return data.map((item) => {
            item.key = item.id;
            item.updateDate ? item.updateDate = utils.formatDate(item.updateDate, 'yyyy-MM-dd') : null;
            return item;
        });
    }
    // data change
    formatProjectName = (data: Array<any> = []) => {
        let res = [];
        data.forEach(item => {
            console.log(item)
            res.push({
                key: item.id,
                projectName: item.projectName
            });
        });
        return res;
    }
    getProjectList = () => {
        let params = {

        }
        let projectNameList = [{ key: 'all', projectUuid: '', projectName: '全部项目' }];
        ajax({
            url: requestConfig.smsProjectName,
            data: params,
        }).then(res => {
            console.log("res:", res);
            res.forEach(item => {
                projectNameList.push({
                    key: item.projectUuid,
                    projectUuid: item.projectUuid,
                    projectName: item.projectName
                });
            });
            this.setState({ projectNameList });
        }).catch(e => {

        })
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

    checkItem = (record) => {
        this.props.history.push({ pathname: '/biz/programDetails', query: record });
    }

    showDeleteConfirm = (projectUuid) => {
        console.log('projectUuid:', projectUuid)
        let that = this;
        confirm({
            title: '确定删除此项目?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteItem(projectUuid);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    deleteItem = (projectUuid) => {
        let params = {
            projectUuid: projectUuid
        }
        console.log('params:', params)
        ajax({
            url: requestConfig.smsProjectDelete,
            data: params,
        }).then(res => {
            console.log("p-delete-res:", res);
            this.getDataList();
        }).catch(e => {

        })
    }

    inputChange(e, value) {
        //console.log('value=' + e.target.value);
        this.setState({
            programName: e.target.value
        });
    }

    projectChange = (value) => {
        console.log('value:', value)
        this.setState({
            projectUuid: value,
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
                defaultProviderUuid: values.defaultProviderUuid,
                owner: values.owner,
                projectName: values.projectName,
                remark: values.remark,
            }
            ajax({
                url: requestConfig.smsProjectAdd,
                data: params,
            }).then(res => {
                console.log("modal-res:", res);
                this.getDataList();
                this.getProjectList();
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
        let { columns, dataSource, projectNameList, providerNameList, programName, provider, signModal } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <ProgramManageTag>
            <div className="searchBox">
                <span>
                    项目：<Select placeholder="" defaultValue='' onChange={this.projectChange}
                        id="selectId" getPopupContainer={() => document.getElementById('selectId')}
                        style={{ width: 120, marginRight: '90px' }} >
                        {
                            projectNameList.map(item => {
                                return <Option key={item.projectUuid} value={item.projectUuid}>{item.projectName}</Option>
                            })
                        }
                    </Select>
                </span>
                <Button type="primary" onClick={this.searchFun.bind(this)}>查询</Button>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="项目申请列表" key="1">
                    <div className="sign-box" onClick={this.leadItem}>
                        <Button type="primary" className="sign-btn">创建项目</Button>
                    </div>
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
            </Tabs>

            <Modal
                title="创建项目"
                visible={signModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div style={{ textAlign: "right" }}> <span style={{ color: "#f5222d" }}>*</span> 为必填项</div>
                <Form>
                    <Form.Item label='项目名称'>
                        {
                            getFieldDecorator('projectName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 30,
                                        message: `最多输入30个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写项目名称" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='预算'>
                        {
                            getFieldDecorator('projectName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 30,
                                        message: `最多输入30个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写项目名称" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='合同'>
                        {
                            getFieldDecorator('projectName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 30,
                                        message: `最多输入30个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写项目名称" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='发票'>
                        {
                            getFieldDecorator('projectName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 30,
                                        message: `最多输入30个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写项目名称" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='审核部门'>
                        {
                            getFieldDecorator('projectName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '这是必填项'
                                    }, {
                                        max: 30,
                                        message: `最多输入30个字符！`
                                    }
                                ]
                            })(<Input placeholder="请填写项目名称" autocomplete="off" />)
                        }
                    </Form.Item>
                    <Form.Item label='简介'>
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
                            })(<Input.TextArea placeholder="请填写备注" />)
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </ProgramManageTag>
    }
}
export default Form.create()(ProgramManage);

