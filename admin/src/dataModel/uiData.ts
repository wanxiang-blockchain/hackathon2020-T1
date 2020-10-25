//mobx ....import React from 'react';
import { observable, action } from 'mobx';

class UiData {
    //初始化之前，默认600，一般屏幕高度
    @observable bodyHeight = '100%';
    @observable collapsed = false;
    

    public topHeight = 80;

    @action setBodyHeight(bodyHeight):void{
        this.bodyHeight = bodyHeight;
    }

    @action setCollapsed(collapsed):void{
        this.collapsed = collapsed;
    }

}

export default new UiData();
