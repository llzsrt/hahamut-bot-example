import fs from 'fs'

export const environment = {
    config: {
        botId: 'your botId',
        accessToken: "your accessToken",
        appSecret: "your appSecret"
    },
    // sslOptions: {
    //     key: fs.readFileSync('./private.key'),
    //     ca: [fs.readFileSync('./ca_bundle.crt')],
    //     cert: fs.readFileSync('./certificate.crt')
    // }
};