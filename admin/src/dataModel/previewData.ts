//mobx ....import React from 'react';
import { observable, action } from 'mobx';

type TimportType = "accountAssets"|"accountAssetsFlow"|"projectAssets"|"projecctAssetsFlow";

class PreviewData {
    @observable previewTableIsShow = false;
    @observable columns = [];
    @observable dataSource = [];
    @observable errorIsShow =false;
    @observable errorTitle = '';
    @observable curErrorMsgNode = [];
    @observable hasError = false;
    @observable trustAccountUuid = '';
    
    /*
    assetUuid = '';
    isFlowTable = false;
    */

    uuid = '';
    importType:TimportType = undefined;
    
    //回调
    refreshPageFun = ()=>{}


    @action showPreviewTable({columns,dataSource,refreshPageFun,uuid,importType}):void {
        this.previewTableIsShow = true;
        this.columns = columns;
        this.dataSource = dataSource;
        this.uuid = uuid;
        this.importType = importType;
        this.refreshPageFun = refreshPageFun;
    }

    @action setHasError(value:boolean){
        this.hasError = value;
    }

    @action closePreviewTable():void {
        this.previewTableIsShow = false;
        this.columns = [];
        this.dataSource = [];
    }

    @action onShowError(errorTitle,curErrorMsgNode){
        this.errorIsShow = true;
        this.errorTitle = errorTitle;
        this.curErrorMsgNode = curErrorMsgNode;
    }

    @action onCloseError():void{
        this.errorIsShow = false;
        this.curErrorMsgNode = [];
        this.errorTitle = '';
    }
}

export default new PreviewData();
