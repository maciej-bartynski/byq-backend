const express = require('express');
// const https = require('https');
const http = require('http');
const cors = require('cors');
const router = require('./routes/router');
const workspaceRouter = require('./routes/workspaceRouter');
const bodyParser = require('body-parser');
const DbService = require('./services/DbService');
const AuthService = require('./services/AuthService');
const users = require('./routes/users');
const { AuthManagementService } = require('./services/AuthManagementService');

function App({
    authConfig,
    httpsServerOptions,
}) {
    const app = express();
    const port = process.env.PORT;
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    DbService.connectDb();
    AuthService.config(authConfig);
    AuthManagementService.config(authConfig);

    app.get('/api/auth-config', (req, res) => {
        res.status(200).json(authConfig);
    })

    app.get('/api/mocked-me', users.mockedMe)

    app.use(
        '/api/:userId/workspace/:workspaceId',
        AuthService.checkJwt,
        AuthService.checkUserApiAccess,
        AuthService.checkWorkspaceApiAccess,
        workspaceRouter
    )

    app.use(
        '/api/:userId',
        AuthService.checkJwt,
        AuthService.checkUserApiAccess,
        router
    )

    http.createServer(httpsServerOptions, app).listen(port, () => {
        console.log(`Listening on port ${port}, server HTTP`)
    })
}

module.exports = App;