import styled from 'styled-components';
//让loading 可以全屏
////min-height:${bodyHeight}px;
const layout = styled.div`
    .pageBox{
        margin:0;
    }
    .tableError{
        position:absolute;
        top:50px;
        width:300px;
        height:auto;
        z-index:901;
        left:50%;
        margin-left:-150px;
    }
    .ant-alert-message{
        margin-bottom:2em;
    }

`;
export default layout;
