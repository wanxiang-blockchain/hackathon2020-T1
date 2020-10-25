import * as React from 'react';
import { Button, message } from 'antd';
import LoginTag from './login.css';
import lodash from 'lodash';
import userData from '@dataModel/userData';
import comModules from '@comModules/index';
import utils from '@utils/utilsMain';
import { observer } from 'mobx-react';
const wxqklcomonlogo = require('@static/images/wxqklcomonlogo.png');
//import loading from '@dataModel/loadingData';
const { validation, ajax, requestConfig, bizFuns } = comModules;
const initState = {
    form: {
        phone: {
            value: '',
            errorMsg: '',
            validateResult: true,
        },
        password: {
            value: '',
            errorMsg: '',
            validateResult: true,
        }
    },
    loginError: '',
    isLoading: false,
    htmlUrl: null,
    signAgreementParams: null,
    loginRes: null,
};

const errorMsgObj = {
    login: {
        //....登录失败
        common: '手机或密码错误,请重新输入！'
    },
    phone: {
        empty: '请输入用户名！',
        wrongFormat: '手机号错误,请重新输入！',
        unAccess: '',
    },
    password: {
        empty: '请输入密码！',
        wrongFormat: '密码不正确,请重新输入！',
    }
}

type Tstate = Readonly<typeof initState>;
type TForm = typeof initState.form;

interface LoginParam {
    username: string;
    password: string;
}

interface IAdminKeyParam {
    groupKey: {
        distributorPubKey: string;
        groupPrivKeyEnc: string;
        groupPubKey: string;
    },
    adminPubKey: string;
};

interface IActiveAdminParam {
    adminKeys: IAdminKeyParam[]
}

@observer
class Login extends React.Component<BaseProps, Tstate> {
    state: Readonly<Tstate> = initState;
    private phoneInput = null;
    private passwordInput = null;
    private form: TForm = initState.form
    keypress(e) {
        if (e.which !== 13) return
        this.gotoLogin()
    }

    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    gotoRegister() {
        this.props.history.push('/register/common');
    }
    validatePhone(form: TForm): boolean {
        let phone = form.phone;
        let phoneValue = this.phoneInput.value.trim();
        if (!phoneValue) {
            phone.validateResult = false;
            phone.errorMsg = errorMsgObj.phone.empty;
        } else {
            phone.validateResult = true;
        }
        phone.value = phoneValue;
        return phone.validateResult;
    }
    validatePassword(form: TForm): boolean {
        let password = form.password;
        let passwordValue = this.passwordInput.value.trim();
        if (!passwordValue) {
            password.validateResult = false;
            password.errorMsg = errorMsgObj.password.empty;
        } else {
            password.validateResult = true;
        }
        password.value = passwordValue;
        return password.validateResult;
    }
    validateAll() {
        let result = true;
        let form: TForm = lodash.cloneDeep(this.state.form);
        let phoneResult = this.validatePhone(form)
        let passwordResult = this.validatePassword(form);
        result = phoneResult && passwordResult;
        this.setState({ form });
        this.form = form;
        return {
            result,
            form
        }
    }
    gotoLogin() {
        this.props.history.push('/biz/programList');

        let validateAll = this.validateAll();

        console.log('validateAll:', validateAll);
        let form: TForm = validateAll.form;
        let loginParam: LoginParam = {
            username: form.phone.value,
            password: form.password.value,
            //utils.md5(form.password.value),
        };
        if (validateAll.result) {
            localStorage.setItem('username', form.phone.value)
            this.setState({
                isLoading: true,
            });
            ajax({
                url: requestConfig.login,
                data: loginParam
            },false).then(res => {
                message.success('登录成功');
                //userData.setLogin(true);
                sessionStorage['isLogined'] = 'true';
                this.props.history.push('/biz/programList');
                this.setState({
                    isLoading: false,
                });
            }).catch(e => {
                this.setState({
                    isLoading: false,
                });
                // message.error('用户名或密码错误！');
            })
        }
    }

    pageHandlePhoneInput(e) {
        let value = bizFuns.handleInputNum(e.target.value, 11);
        e.target.value = value;
        console.log(e.target.value)
    }

    render() {
        const state = this.state;
        let { phone, password } = state.form;
        phone.value = localStorage.getItem("username")
        return (
            <LoginTag className="bg2">
                <div className="heightHolder"></div>
                <div className="outPanel">
                    <img ></img>
                    <img src={wxqklcomonlogo} alt="图片" width={390} height={300} />
                    <div className="itemBox">
                        <input type="text" className="baseInput longInput" placeholder="请输入用户名称" maxLength={11} defaultValue={phone.value}
                            onChange={this.pageHandlePhoneInput.bind(this)}
                            ref={input => { this.phoneInput = input }} />
                        {!phone.validateResult ? <span className="error"> {phone.errorMsg} </span> : null}
                    </div>
                    <div className="itemBox">
                        <input type="password" className="baseInput longInput" onKeyPress={this.keypress.bind(this)} placeholder="请输入登录密码" maxLength={16}
                            ref={input => { this.passwordInput = input }} />
                        {!password.validateResult ? <span className="error"> {password.errorMsg} </span> : null}
                    </div>
                    <div className="itemBox alignCenter">
                        <Button className="loginBtn" loading={state.isLoading} type="primary"
                            onClick={this.gotoLogin.bind(this)} size="default">登 录</Button>
                    </div>
                    {state.loginError ? <div>{state.loginError}</div> : null}
                </div>
            </LoginTag>
        );
    }
}
export default Login;

