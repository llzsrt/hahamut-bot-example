
# Hahamut Bot Example  
![img](https://truth.bahamut.com.tw/s01/201902/8e99ade4a0e88cd83829fac47e545ca4.JPG)
  
## Getting Started
 - ``$ npm install``
 - 在 environment.ts 中填入哈哈姆特的token與ssl相關檔案
 ```js
 export const environment = {
    configs: {
        botId: "填入哈哈姆特BotID"
        accessToken: "填入哈哈姆特Bot accessToken",
        appSecret: "填入哈哈姆特Bot appSecret"
    },
    sslOptions: {
        key: fs.readFileSync('./private.key'),
        ca: [fs.readFileSync('./ca_bundle.crt')],
        cert: fs.readFileSync('./certificate.crt')
    }
};
 ```
 - ``$ tsc``
 - 把 dist 目錄裡編譯好的檔案和ssl憑證一起丟到server上
 - ``$ npm install``
 - ``$ node main.js``
 - 大概就會動了(¯―¯٥)
