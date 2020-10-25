window.config = window.config ||{};
window.config = {
    ...window.config,
    env:'production',
    address:{
        dev:'http://jay.com:7009',
        integration:'https://community.wxblockchain.com',
        production:'https://community.newchainbase.com',
    },
    minio:{
        dev:'http://172.16.211.111:9000',
        integration:'https://qogirminio-dev.wxblockchain.com',
        production:'https://pic.newchainbase.com',
    },
}
