const errorMsg = {};

const bizConfig = {
    providerList: [

    ],
    canUseProviderList: [
        { providerEngName: 'ALIYUN', providerUuid: '1' }
    ],
    smsList: [
        {
            name: '验证码',
            value: '0'
        },
        {
            name: '通知短信',
            value: '1'
        },
        {
            name: '推广短信',
            value: '2'
        }, {
            name: '国际短信',
            value: '3'
        }
    ],
    errorMsg: {
        // 17010: '用户名或密码错误！',
        18020: '该分类下存在文章，不能删除！',
        20409: '请先删除项目下可用模板',
        20410: '请先删除使用该签名的模板',
    }
}

export default bizConfig;




