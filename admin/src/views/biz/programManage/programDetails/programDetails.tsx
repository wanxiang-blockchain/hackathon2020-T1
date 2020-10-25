import * as React from 'react';
import { Tabs, Select, Input, Button, Table, Modal, Form, Checkbox, message, Pagination } from 'antd';
import utils from '@utils/utilsMain';
import { Link } from 'react-router-dom';
import ProgramDetailsTag from './programDetails.css';
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
import comModules from '@comModules/index';
import Item from 'antd/lib/list/Item';
const { requestConfig, ajax, bizConfig } = comModules;

interface CurProps extends BaseProps {
    pageName?: string;
    detailUuid?: string;
    form?: any;
    record?: any;
}

class ProgramDetails extends React.Component<CurProps, any>{
    state = {
        columns: [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '模板名称', dataIndex: 'templateName', key: 'templateName' },
            { title: '模板内容', dataIndex: 'innerTemplateContent', key: 'innerTemplateContent' },
            { title: '模板CODE', dataIndex: 'innerTemplateCode', key: 'innerTemplateCode' },
            {
                title: '操作', key: 'operation', render: (text, record) => {
                    return (<span className="table-operation">
                        <a style={{ marginRight: '15px' }} onClick={this.showDeleteInnerConfirm.bind(null, record.innerTemplateCode)}>删除</a>
                        {record.subList.length == this.state.providerTrueList.length ?
                            <a style={{ color: '#95a4b3', cursor: 'not-allowed' }}>添加模板</a>
                            :
                            <a onClick={this.addTemplate.bind(this, record)}>添加模板</a>
                        }
                    </span>);
                }
            },
        ],
        projectUuid: '',
        dataSource: [],
        providerList: [],
        providerTrueList: [],
        signList: [],

        defaultProviderUuid: '',
        projectName: '',
        remark: '',
        updateDate: '',

        createModal: false,
        projectList: [],
        resultList: [],
        queryDataList: [],
        isShowTemplateCode: false,
        createParaSign: false,

        providerUuid: '',

        innerTemplateCode: '',

        templateType: '0',
        // projectUuid: '', 上面定义了
        templateName: '',
        innerTemplateContent: '',
        signName: '',
        applicant: '',
        applyReason: '',
        isStock: '',
        outTemplateCode: '',

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
        // console.log('location.query:', this.props.location.search.split('?')[1]);
        this.getDataList();
        this.getProviderList();
        this.getProjectList();
        this.getSignList();
    }
    getDataList = () => {
        let params = {
            "projectUuid": this.props.location.search.split('?')[1],
            "pageNum": this.tableOptions.pageNum,
            "pageSize": this.tableOptions.pageSize,
        }
        ajax({
            url: requestConfig.smsProjectDetail,
            data: params,
        }).then(res => {
            console.log("res:", res);
            let dataList = this.formatData(res.templateList.list);
            this.tableOptions.total = res.templateList.total;
            this.setState({
                pages: res.templateList.pages,
                defaultProviderUuid: res.defaultProviderUuid,
                projectName: res.projectName,
                remark: res.remark,
                updateDate: res.updateDate,
                dataSource: dataList
            });
        }).catch(e => {

        })
    }
    // data change
    formatData = (data: Array<any> = []) => {
        return data.map((item) => {
            item.key = item.id;
            return item;
        });
    }
    getProviderList = () => {
        let params: AjaxParams = {
            data: { "available": 1 },
            url: requestConfig.smsProviderNameList
        }
        let providerList = [{ key: 'all', providerUuid: '', providerName: '全部服务商' }];
        //<Option value=''>全部服务商</Option>
        ajax(params).then(res => {
            res.forEach(item => {
                //if(item.status === 'active'){
                providerList.push({
                    key: item.providerUuid,
                    providerUuid: item.providerUuid,
                    providerName: item.providerName
                });
                //}
            });
            this.setState({
                providerList,
                providerTrueList: res,
            });
        });
    }
    getProjectList() {
        let getProjectListParam = {
            data: {
                "pageNum": 1,
                "pageSize": 10000,
                "projectUuid": ""
            },
            url: requestConfig.smsProjectList
        }
        ajax(getProjectListParam).then(res => {
            let projectList = res.list;
            projectList.map(item => {
                return {
                    projectUuid: item.projectUuid,
                    projectName: item.projectName
                }
            });

            if (projectList.length > 0) {
                this.setState({
                    projectList,
                    projectUuid: projectList[0].projectUuid,
                });
            }
        });
    }
    getSignList() {
        let getSignListParam = {
            data: {
                "pageNum": 1,
                "pageSize": 10000,
                "providerUuid": ""
            },
            url: requestConfig.smsQueryPage
        };
        ajax(getSignListParam).then(res => {
            console.log('res.list:', res.list);
            let signList = [];
            res.list.forEach(item => {
                signList.push({
                    id: item.id,
                    signName: item.signName
                });
            });
            this.setState({ signList });
        });
    }
    getProjectModify = () => {
        let params = {
            "defaultProviderUuid": this.state.defaultProviderUuid,
            "projectUuid": this.state.projectUuid,
        }
        ajax({
            url: requestConfig.smsProjectModify,
            data: params,
        }).then(res => {
            console.log("res:", res);
            let dataList = this.formatData(res.templateList.list);
            this.setState({
                defaultProviderUuid: res.defaultProviderUuid,
                projectName: res.projectName,
                remark: res.remark,
                updateDate: res.updateDate,
                dataSource: dataList
            });
        }).catch(e => {

        })
    }

    // 详情内页 删除按钮
    showDeleteOutConfirm = (templateCode) => {
        console.log('templateCode:', templateCode);
        let that = this;
        confirm({
            title: '确定删除此项?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteOutItem(templateCode);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    deleteOutItem = (templateCode) => {
        console.log('templateCode:', templateCode);
        let params = {
            templateCode: templateCode
        }
        ajax({
            url: requestConfig.smsProjectDeleteOut,
            data: params,
        }).then(res => {
            console.log("delete-res:", res);
            this.getDataList();
        }).catch(e => {

        })
    }

    showDeleteInnerConfirm = (templateCode) => {
        console.log("templateCode:", templateCode);
        let that = this;
        confirm({
            title: '确定删除此项?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.deleteInnerItem(templateCode);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    deleteInnerItem = (templateCode) => {
        let params = {
            templateCode: templateCode
        }
        ajax({
            url: requestConfig.smsProjectDeleteInner,
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
            defaultProviderUuid: value,
        }, () => {
            this.getProjectModify()
        })
    }
    expandedRowRender = (record) => {
        const columns = [
            { title: '服务商', dataIndex: 'providerName', key: 'providerName' },
            { title: '签名', dataIndex: 'signName', key: 'signName' },
            { title: '申请人', dataIndex: 'applicant', key: 'applicant' },
            { title: '申请说明', dataIndex: 'applyReason', key: 'applyReason' },
            { title: '状态', dataIndex: 'auditStatus', key: 'auditStatus' },
            { title: '审核说明', dataIndex: 'verifyReason', key: 'verifyReason' },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <span className="table-operation">
                        <a style={{ marginRight: '15px' }} onClick={this.showDeleteOutConfirm.bind(null, record.subList[0].outTemplateCode)}>删除</a>
                    </span>
                ),
            },
        ];
        let data = this.formatData2(record.subList);
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    // data change
    formatData2 = (data: Array<any> = []) => {
        return data.map((item) => {
            item.key = item.providerUuid;
            item.auditStatus = (item.auditStatus == '审核中' || item.auditStatus == '审核通过' || item.auditStatus == '审核失败') ? item.auditStatus :
                (item.auditStatus == 'approving' ? '审核中' : (item.auditStatus == 'approved' ? '审核通过' : '审核失败'));
            item.verifyReason = (item.auditStatus == '审核失败' || item.auditStatus == 'rejected') ? item.verifyReason : '-';
            return item;
        });
    }
    // 创建模板 按钮
    addTemplate(record) {
        let queryDataList = this.formatQueryData(record.subList);
        let resultList = this.comparisonArrar(queryDataList, this.state.providerTrueList);
        console.log('record:', record);
        console.log('queryDataList:', queryDataList);
        console.log('providerTrueList:', this.state.providerTrueList);
        console.log('resultList:', resultList);
        this.setState({
            queryDataList,
            resultList,
            createModal: true,
            createParaSign: true,

            providerUuid: resultList[0].providerUuid,

            templateType: record.templateType,
            templateName: record.templateName,
            innerTemplateCode: record.innerTemplateCode,
            innerTemplateContent: record.innerTemplateContent,
        });
    }
    // data change
    formatQueryData = (data: Array<any> = []) => {
        let queryArr = [];
        data.map((item) => {
            let queryObj = {
                key: item.providerUuid,
                providerUuid: item.providerUuid,
                providerName: item.providerName,
                providerEngName: item.providerEngName
            };
            queryArr.push(queryObj);
        });
        return queryArr;
    }
    comparisonArrar = (arr1: Array<any> = [], arr2: Array<any> = []) => {
        var result = [];
        for (let i = 0; i < arr2.length; i++) {
            let obj = arr2[i];
            let arrId = obj.providerUuid;
            let isExist = false;
            for (var j = 0; j < arr1.length; j++) {
                let obj2 = arr1[j];
                let arrId2 = obj2.providerUuid;
                if (arrId == arrId2) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                result.push(obj);
            }
        }
        return result;
    }
    // 新建模板 按钮
    leadItem = () => {
        this.setState({
            resultList: this.state.providerTrueList,
            providerUuid: this.state.providerTrueList[0].providerUuid,
            createModal: true,
        });
    }
    // 创建模板 ok按钮
    handleOk = () => {
        this.props.form.validateFields((error, values) => {
            console.log("values:", values);
            if (error) {
                console.log(error);
                return;
            }
            let params = {
                "providerUuid": this.state.providerUuid,
                "providerEngName": this.formatProviderEngName(this.state.providerUuid),

                "templateType": values.templateType,
                "projectUuid": this.props.location.search.split('?')[1],
                "templateName": values.templateName,
                "innerTemplateCode": this.state.innerTemplateCode,
                "innerTemplateContent": values.innerTemplateContent,
                "signId": values.signName,
                "applicant": values.applicant,
                "applyReason": values.applyReason,
                "isStock": this.state.isShowTemplateCode,
                "outTemplateCode": values.outTemplateCode,
            }
            ajax({
                url: requestConfig.smsTemplateAdd,
                data: params,
            }).then(res => {
                console.log("ok-res:", res);
                message.success('恭喜，创建模板成功！');
                this.getDataList();
                this.props.form.resetFields();
                this.setState({ createModal: false, providerUuid: '' });
            }).catch(e => {

            })
        });
    }
    // providerUuid change
    formatProviderEngName = (num) => {
        let data = '';
        this.state.providerTrueList.map(item => {
            if (item.providerUuid == num) {
                data = item.providerEngName;
            }
        })
        return data;
    }

    handleCancel = () => {
        this.setState({ createModal: false, providerUuid: '' });
        this.props.form.resetFields();
    }

    checkboxClicked(e) {
        this.setState({
            isShowTemplateCode: e.target.checked
        })
    }

    callback = (key) => {
        console.log(key);
        this.setState({
            providerUuid: key
        })
    }

    render() {
        let { pageNum, pageSize, total, onPaging } = this.tableOptions;
        const { getFieldDecorator } = this.props.form;
        let smsList = bizConfig.smsList;
        let { columns, dataSource, providerList, signList,
            templateType, templateName, innerTemplateContent,
            projectList, resultList, queryDataList,
            isShowTemplateCode, createParaSign,
            projectName, remark, updateDate, defaultProviderUuid } = this.state;
        return <ProgramDetailsTag>
            <div className="search">
                <div className="searchBasic">基本信息</div>
                <div className="searchDetails">
                    <div className="searchName"> 项目名称：<span>{projectName}</span></div>
                    <div className="searchName">选择优先服务商：<Select placeholder="填写模板名称" value={defaultProviderUuid} onChange={this.providerChange}>
                        {
                            providerList.map(item => {
                                return <Option key={item.providerUuid} value={item.providerUuid}>{item.providerName}</Option>
                            })
                        }
                    </Select>
                    </div>
                </div>
                <div className="searchDetails">
                    <div className="searchName">备注：<span>{remark}</span></div>
                    <div className="searchName">更新时间：<span>{utils.formatDate(updateDate, "yyyy-MM-dd")}</span></div>
                </div>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="项目短信签名列表" key="1">
                    <div className="sign-box">
                        <Button type="primary" className="sign-btn" onClick={this.leadItem}><span>新建模板</span></Button>
                    </div>
                    <Table
                        expandRowByClick={false}
                        columns={columns}
                        expandedRowRender={this.expandedRowRender}
                        dataSource={dataSource}
                        pagination={false}
                    />
                    <Pagination showSizeChanger={false} style={{ "float": "right", "marginTop": "10px" }} current={pageNum} total={total}
                        pageSize={pageSize} onChange={onPaging} />
                </TabPane>
            </Tabs>

            <Modal
                title="模板信息"
                visible={this.state.createModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div style={{ textAlign: "right" }}> <span style={{ color: "#f5222d" }}>*</span> 为必填项</div>
                <Tabs onChange={this.callback}>
                    {
                        resultList.map(item => {
                            return <TabPane tab={item.providerName} key={item.providerUuid} >
                                <Form>
                                    <span id="selectId" >
                                        <Form.Item label='短信类型'>
                                            {
                                                getFieldDecorator('templateType', {
                                                    initialValue: templateType,
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择短信类型！'
                                                        }
                                                    ]
                                                })(
                                                    <Select disabled={createParaSign}
                                                        placeholder="请选择短信类型" getPopupContainer={() => document.getElementById('selectId')}>
                                                        {
                                                            smsList.map(item => {
                                                                return <Option value={item.value}>{item.name}</Option>
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </Form.Item>
                                    </span>
                                    <span id="selectId2">
                                        <Form.Item label='项目名称'>
                                            {
                                                getFieldDecorator('projectName', {
                                                    initialValue: projectName,
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择项目名称！'
                                                        }, {
                                                            max: 30,
                                                            message: `最多输入30个字符！`
                                                        }
                                                    ]
                                                })(
                                                    <Select disabled={true}
                                                        placeholder="请选择项目名称" getPopupContainer={() => document.getElementById('selectId2')}>
                                                        {
                                                            projectList.map(item => {
                                                                return <Option value={item.projectUuid}>{item.projectName}</Option>
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </Form.Item>
                                    </span>
                                    <Form.Item label='模板名称'>
                                        {
                                            getFieldDecorator('templateName', {
                                                initialValue: templateName,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入模板名称！'
                                                    }, {
                                                        max: 30,
                                                        message: `最多输入30个字符！`
                                                    }
                                                ]
                                            })(<Input disabled={createParaSign} placeholder="请输入模板名称，不超过30个字符" autocomplete="off" />)
                                        }
                                    </Form.Item>
                                    <Form.Item label='模板内容'>
                                        {
                                            getFieldDecorator('innerTemplateContent', {
                                                initialValue: innerTemplateContent,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入模板内容！'
                                                    }, {
                                                        max: 500,
                                                        message: `最多输入500个字符！`
                                                    }
                                                ]
                                            })(<TextArea disabled={createParaSign}
                                                placeholder="变量格式：${code}；
示例：您的验证码为：${code}，该验证码 5 分钟内有效，请勿泄漏于他人。" />)
                                        }
                                    </Form.Item>
                                    <span id="selectId3">
                                        <Form.Item label='选择签名'>
                                            {
                                                getFieldDecorator('signName', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择选择签名！'
                                                        }
                                                    ]
                                                })(
                                                    <Select placeholder="请选择选择签名"
                                                        getPopupContainer={() => document.getElementById('selectId3')}>
                                                        {
                                                            signList.map(item => {
                                                                return <Option key={item.id} value={item.id}>{item.signName}</Option>
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </Form.Item>
                                    </span>
                                    <Form.Item label='申请人'>
                                        {
                                            getFieldDecorator('applicant', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请填写申请人！'
                                                    }
                                                ]
                                            })(<Input placeholder="请填写申请人" autocomplete="off" />)
                                        }
                                    </Form.Item>
                                    <Form.Item label='申请说明'>
                                        {
                                            getFieldDecorator('applyReason', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请填写申请说明！'
                                                    }, {
                                                        max: 100,
                                                        message: `最多输入100个字符！`
                                                    }
                                                ]
                                            })(<TextArea placeholder="例：使用场景：向XX会员推送相关活动信息 产品链接：www.asdsdas.com" />)
                                        }
                                    </Form.Item>
                                    <div className="form-item">
                                        <Checkbox checked={isShowTemplateCode} onChange={this.checkboxClicked.bind(this)}>导入已有模版</Checkbox>
                                    </div>
                                    {
                                        isShowTemplateCode ?
                                            <Form.Item label='模板号'>
                                                {
                                                    getFieldDecorator('outTemplateCode', {
                                                        rules: [
                                                            {
                                                                required: isShowTemplateCode,
                                                                message: '请输入模板号！'
                                                            },
                                                            {
                                                                max: 30,
                                                                message: `最多输入30个字符！`

                                                            }
                                                        ]
                                                    })(<Input placeholder="请输入模板号" autocomplete="off" />)
                                                }
                                            </Form.Item>
                                            : null
                                    }
                                </Form>
                            </TabPane>
                        })
                    }
                    {
                        queryDataList.map(item => {
                            return <TabPane tab={item.providerName} disabled key={item.providerUuid}>

                            </TabPane>
                        })
                    }
                </Tabs>
            </Modal>
        </ProgramDetailsTag>
    }
}
export default Form.create()(ProgramDetails);

