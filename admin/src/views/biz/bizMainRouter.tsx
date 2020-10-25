import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import userData from '@dataModel/userData';
//项目申请
import ProgramManageIndex from './programManage/programManage';
import ProgramDetailsIndex from './programManage/programDetails/programDetails';

//项目审批
import SignListIndex from './signManage/signManage';

//资金管理/用户中心
import MailListIndex from './mailList/mailList';
import MessageListIndex from './messageList/messageList';

class Router extends React.Component<any, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/biz/programManage" component={ProgramManageIndex} />
                <Route path="/biz/programDetails" component={ProgramDetailsIndex} />
                <Route path="/biz/signList" component={SignListIndex} />
                <Route path="/biz/mailList" component={MailListIndex} />
                <Route path="/biz/messageList" component={MessageListIndex} />
                <Route path='/' render={() => (<Redirect to='/biz/programManage' />)} />
            </Switch>
        );
    }
}

export default Router;

