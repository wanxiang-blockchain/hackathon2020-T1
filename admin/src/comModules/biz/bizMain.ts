import { message } from "antd";

let bizFuns = {
    handleInputNum(value,length){
        let newValue = value.replace(/^[a-zA-Z0-9]{7,23}$/,'');
        return newValue.slice(0,length);
    }
}


export default bizFuns;