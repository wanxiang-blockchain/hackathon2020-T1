import { any } from "prop-types";

// 确保是模块
export {};
/*
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'


declare module "*.png" {
    const content: string;
    export default content;
}
*/
declare module '*.png';

declare global {
    //全局变量
    let App:any;
    
    interface AjaxParams{
        mode?:string;
        method?:string;
        data:any;
        url:string;
        apiName?:string;
    }
    
    interface BaseProps{
        history:Array<any>;
        match:any;
        location:any;
    }


    interface Window { 
        [p:string]:any
    }
}
/*
declare module '*.css' {
    const styles: any;
    export = styles;
}
*/
  
