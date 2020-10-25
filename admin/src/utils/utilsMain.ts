import md5 from './md5';
const utilObj = {
    md5,
    addZero(num):string{
        num = parseInt(num);
        if(num+''!=='NaN'){
            num = num>=10?num+'':'0'+num
        }
        return num;
    },
    //yyyy:MM:dd,hh:mm:ss
    formatDate(date,format){
        let curDate = new Date(date);
        let target = format;
        if(curDate+'' !== 'Invalid Date'){
            let year = curDate.getFullYear()+'';
            let month = utilObj.addZero(curDate.getMonth()+1);
            let dd = utilObj.addZero(curDate.getDate());
            let hh = utilObj.addZero(curDate.getHours());
            let minute = utilObj.addZero(curDate.getMinutes());
            let second = utilObj.addZero(curDate.getSeconds());
            //待需--时分秒
            let replaceArr = [['yyyy',year],['MM',month],['dd',dd],['hh',hh],['mm',minute],['ss',second]];
            //target.replace(/yyyy/i,year).replace(/dd/i,month).replace(/dd/i,)
            replaceArr.forEach(reg=>{
                //执行对大小写不敏感的匹配
                target = target.replace(new RegExp(reg[0],'i'),reg[1]);
            })
        }
        return target;
    },
    getFormatNum(num:string|number):string{
        //取小数，三行逗号隔开，小数点后面不管多少位都保留
        try{
            let [beforeDot,afterDot] = (num + '').split('.');
            return parseFloat(beforeDot).toLocaleString() + (afterDot? `.${afterDot}`:'')
        }catch(e){
            console.log(`e = ${e}`);
            return num+'';
        }
    },
    //默认扩大10000倍
    num10xMax(num,length=4):number{
        num = num+'';
        let numArr = num.split('.');
        let afterDot = numArr.length ===2?numArr[1]:'';
        if(afterDot){
            afterDot = afterDot.slice(0,length); 
        }
        //自动补0
        while(afterDot.length<length){
            afterDot = afterDot+'0';
        }
        num = parseInt(numArr[0]+afterDot);
        return num;
    },
    num10xMin(num,length=4):number{
        num = Number(num);
        if(num){
            num = num/Math.pow(10,length);
        }
        let numArr = (num+'').split('.');
        if(numArr.length===2){
            num = numArr[0] + '.' + numArr[1].slice(0,length);
        }
        return num;
    },
    encodeHtml(sHtml){
        return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});    
    }
}

export default utilObj;