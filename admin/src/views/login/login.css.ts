import styled from 'styled-components';


let itemWidth = '274px';
const loginTag = styled.div`
    .loginBtn{
        width:100px;
    }
    .agreement {
        margin-bottom: 15px;
        .userAgreement {
            color: #FF001F;
            cursor: pointer;
        }
    }
    
    .heightHolder{
        height:1px;
        line-height: 1px;
    }

    .outPanel{
        width:500px;
        // height:300px;
        margin:5% auto 0 auto;
        text-align:center;
      
        border-radius: 15px;
        background:#f2f2f2;
        
        h1{
            font-size:24px;
            margin:40px 0;
            color:#0f58b9;
        }
        .itemBox{
            position:relative;
            width:${itemWidth};
            margin:0 auto 25px auto;
            text-align:left;
            
            .shortInput{
                width:132px;
            }
            .longInput{
                width:${itemWidth};
            }
            .codeBtn{
                margin-left:20px;
                width:120px;
            }
            .gotoNextPage{
                margin-left:20px;
                color:#0f58b9;
                cursor:pointer;
            }
            input{
                padding-left:10px;
                ::-webkit-input-placeholder{
                    color:#aaa;
                }  
            }
            .error{
                position:absolute;
                top: 30px;
                left: 0px;
                text-align: left;
                color:red;
            }
            .passwordRules{
                position: absolute;
                top:5px;
                right:-35px;
            }
        }
        .alignCenter{
            text-align:center;
        }
    }

`;
export default loginTag;
