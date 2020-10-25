let validation = {
	phoneVerify(telephone):boolean {
		// const reg = /^1[345678]\d{9}$/;
		//     中国电信号段
		//     133、149、153、173、177、180、181、189、199
		//
		//     中国联通号段
		//
		//     130、131、132、145、155、156、166、175、176、185、186
		//     中国移动号段
		//     134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198
		//
		//
		//     其他号段
		//     14号段以前为上网卡专属号段，如中国联通的是145，中国移动的是147等等。
		// 虚拟运营商
		//     电信：1700、1701、1702
		//     移动：1703、1705、1706
		//     联通：1704、1707、1708、1709、171
		const reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0,3,5-8])|(18[0-9])|(19[0-9])|(147))\d{8}$/;
		return reg.test(telephone);
    },
    //必须是数字加字母的组合
    mustNumAndLetter(inputStr):boolean{
        const reg01 = /(?=.*\d)(?=.*[a-zA-Z])/;
        //上面一个表达式就完成了，下面不要了
        //const reg02 = /^[\da-zA-Z]+$/;
        return reg01.test(inputStr);
    },
    //只限 数字、字母或数字字母的
    numAndLetter(inputStr):boolean{
        const reg = /(?=.*\d)(?=.*[a-zA-Z])/;
        return reg.test(inputStr);
    },
    //只限 数字和字母
    numOrLetter(inputStr):boolean{
        const reg = /^[\da-zA-Z]+$/;
        return reg.test(inputStr);
    },
    numOrLetterOrnull(){

    },
    notEmpty(inputStr):boolean{
        return (inputStr+'').trim().length>0?true:false;
    },
    isInt(inputStr):boolean{
        let reg = /^\d+$/;
        return reg.test(inputStr);
    },
    
}

export default validation;

