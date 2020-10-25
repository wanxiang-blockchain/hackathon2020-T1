import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRouter from './router';
import LayoutTag from './layout.css';


/***
 * 
1) LayoutTag是页面最外层的标签，各种全局的样式可以写在layoutStyle里
*
***/
class Layout extends React.Component<any,any>{

    state ={
        loadedRate:''
    }
    
    constructor(props){
        super(props);
    }
    
    render() {
        //loadingData.display
        return (
            <LayoutTag style={{height:'100%'}}>
                <HashRouter>
                    <AppRouter />
                </HashRouter>
            </LayoutTag>
        );
    }
}

export default Layout;
