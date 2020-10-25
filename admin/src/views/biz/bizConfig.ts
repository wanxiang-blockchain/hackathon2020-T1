//如果错误信息为空则展示后台饭回来的提示信息
const RspCodeMsgMap = {
    141535: { errorMsg: "数据处理失败，请稍后再试", successMsg: "" },
    141536: { errorMsg: "数据处理失败，请稍后再试", successMsg: "" },
    141537: { errorMsg: "数据处理失败，请稍后再试", successMsg: "" },
    151023: { errorMsg: "", successMsg: "" },
};

//对话框尺寸设置
const DlgSize = {
    superFixed: { width: 920, height: 740 },
    bigFixed: { width: 720, height: 640 },
    middleFixed: { width: 640, height: 600 },
    smallFixed: { width: 450, height: 265 },
    superAuto: { width: 920, maxHeight: 740, minHeight: 120 },
    bigAuto: { width: 720, maxHeight: 640, minHeight: 120 },
    middleAuto: { width: 640, maxHeight: 600, minHeight: 120 },
    smallAuto: { width: 450, maxHeight: 440, minHeight: 120 },
};

const DlgSizeType = {
    superFixed: "superFixed",
    bigFixed: "bigFixed",
    middleFixed: "middleFixed",
    smallFixed: "smallFixed",
    superAuto: "superAuto",
    bigAuto: "bigAuto",
    middleAuto: "middleAuto",
    smallAuto: "smallAuto"
};

export {
    RspCodeMsgMap,
    DlgSize,
    DlgSizeType,
}