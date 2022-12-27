const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const authConfig = process.env.AUTH0_CONFIG_PATH
    ? require(process.env.AUTH0_CONFIG_PATH)
    : {};

const httpsServerOptions = process.env.HTTPS === 'true'
    ? {
        // key: fs.readFileSync(`${process.env.CERTS_STORE_PATH}/private.key`),
        // cert: fs.readFileSync(`${process.env.CERTS_STORE_PATH}/certificate.crt`),
        // ca: fs.readFileSync(`${process.env.CERTS_STORE_PATH}/ca_bundle.crt`),
    }
    : undefined

const App = require("./server");

App({
    authConfig,
    httpsServerOptions
});