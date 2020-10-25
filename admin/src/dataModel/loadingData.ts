//mobx ....import React from 'react';
import { observable, action } from 'mobx';

class LoadingData {
    //@observable loadingClassName = 'loadingBg';
    @observable display = 'none';
    @observable hasMark = false;

    @action showLoading() {
        this.hasMark = false;
        this.display = 'block';
    }

    @action showOverlapLoading() {
        this.hasMark = true;
        this.display = 'block';
    }

    @action closeOverlapLoading() {
        this.display = 'none';
    }

    @action closeLoading() {
        this.display = 'none';
    }
}

export default new LoadingData();
