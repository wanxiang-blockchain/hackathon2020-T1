import * as React from 'react';
import styled from 'styled-components';
import uiData from '@dataModel/uiData';

const LoadingTag =styled.div`
    
    display:none;
    position:fixed;
    width:100%;
    background:rgb(255,255,255,0.1);
    z-index:999;
    .loadingCircle{
        position:absolute;
        top:50%;
        left:50%;
        width:50px;
        margin:-25px 0 0 -25px;
    }
    .loadingTxt{
        position:relative;
        margin:15px 0 0 -15px;
        color:#1890ff;
    }

    .loadingTxt02{
        position:relative;
        margin:15px 0 0 -70px;
        font-size:24px;
        text-align:center;
        color:#159aff;
        width:200px;
    }

    .showLoading{
        display:block;
    }

`;
interface IProps{
    display:string;
    loadedRate?:string;
    hasMark?:boolean;
}
class Loading extends React.Component<IProps,{}>{
    render() {
        let hasMark = this.props.hasMark;
        let styleObj :{
            [k:string]:any;
        }= {
            'display':this.props.display
        };
        if(this.props.display !== 'none'){
            if(hasMark){
                styleObj.height = uiData.bodyHeight;
            }else{
                Object.assign(styleObj,{
                    display:'flex',
                    //alignItems:'center',
                    //justifyContent:'center',  
                    width:'200px',
                    height:'200px',
                    top:'30%',
                    left:'50%',
                    marginLeft:'-100px',
                    background: 'rgb(255,255,255,0)'
                })
            }
        }
        return (
            <LoadingTag style={styleObj}>
                <div> 
                    <div className={hasMark||this.props.loadedRate?"loadingCircle ant-spin-lg":"ant-spin-lg"}>
                        <span className="ant-spin-dot  ant-spin-dot-spin">
                            <i className="ant-spin-dot-item"></i>
                            <i className="ant-spin-dot-item"></i>
                            <i className="ant-spin-dot-item"></i>
                            <i className="ant-spin-dot-item"></i>
                        </span>
                        {
                            this.props.loadedRate?
                            <div className="loadingTxt02">已下载：{this.props.loadedRate}</div>:
                            <div className="loadingTxt">loading ......</div>
                        }
                    </div>
                </div>
            </LoadingTag>
        )
    }
}


export default Loading;