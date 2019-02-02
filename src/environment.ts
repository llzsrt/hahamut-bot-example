import fs from 'fs';

export const environment = {
    keys: {
        accessToken: "Your AccessToken",
        appSecret: "Your AppSecret"
    },
    sslOptions: {
        key: fs.readFileSync('./private.key'),
        ca: [fs.readFileSync('./ca_bundle.crt')],
        cert: fs.readFileSync('./certificate.crt')
    }
};