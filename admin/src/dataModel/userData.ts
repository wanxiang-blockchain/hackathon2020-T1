
import { observable, action } from 'mobx';

class UserData {
    @observable isLogined = false;

    setLogin(result:boolean){
        //console.
        this.isLogined = result;
        localStorage['isLogined'] = result+'';
    }
}

export default new UserData();
