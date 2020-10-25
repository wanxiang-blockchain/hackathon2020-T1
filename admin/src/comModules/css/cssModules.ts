const cssModules = {

    ellipsis:(width:number|string=200)=>{
        const  suffix = typeof width === 'number'?'px':'';
        return `overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap; 
                width:${width}${suffix}`;
    },
   
}

export default cssModules;