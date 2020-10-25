let requestConfig = {
    modifyPriority: '/sms/smsProvider/modifyPriority',
    smsProviderDelete: '/sms/smsProvider/delete',

    // project list
    smsProjectList: '/sms/project/list',
    smsProjectName: '/sms/validProject/all',
    smsProjectAdd: '/sms/project/add',
    smsProjectDetail: '/sms/project/detail',
    smsProjectModify: '/sms/project/modify',
    smsProjectDeleteOut: '/sms/smsTemplate/deleteOut',
    smsProjectDeleteInner: '/sms/smsTemplate/deleteInner',
    smsProviderNameList: '/sms/smsProvider/query',
    smsTemplateAdd: '/sms/smsTemplate/add',
    smsProjectDelete: '/sms/project/delete',


    smsTemplateList: '/sms/smsTemplate/queryPage',
    smsTemplateDeleteOut: '/sms/smsTemplate/deleteOut',

    // sms list
    smsQueryPage: '/sms/smsSign/queryPage',
    smsImport: '/sms/smsSign/import',
    smsDelete: '/sms/smsSign/delete',

    // mail-sms list
    emailCount: '/sms/email/count',
    smsCount: '/sms/sms/count',
    smsProjectNameInfo: '/sms/projectInfo/all',
    smsProjectNameEmailInfo: '/sms/sendEmailProjectInfo/all',


    login: '/login',
    logout: '/logout',
}

let gConfig = window.config;
for (let k in requestConfig) {
    requestConfig[k] = gConfig.address[gConfig.env].commonRequest + requestConfig[k];
}


// console.log( `requestConfig = ${JSON.stringify(requestConfig)}`);
export default requestConfig;

