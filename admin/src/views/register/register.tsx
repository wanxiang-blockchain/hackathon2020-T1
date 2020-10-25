import * as React from 'react';
import { Button } from 'antd';
import RegisterTag from './register.css';
import { observer } from 'mobx-react';
const initState = {};

type Tstate = Readonly <typeof initState>;

@observer
class Register extends React.Component<BaseProps, Tstate> {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //console.log(comAdmin);
    }

    render() {
        return (
            <RegisterTag> 
                <h2>Hello wo 是注册内容</h2>
                <Button>我是按钮</Button>
            </RegisterTag>
        );
    }
}
export default Register;
