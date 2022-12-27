const { mockedUserMe, AuthManagementService } = require("../services/AuthManagementService");

const users = (req, res) => {
    return AuthManagementService.fetchAuth0Users(req, res);
};

const mockedMe = (req, res) => {
    res.status(200).json({
        message: 'Me',
        data: mockedUserMe
    })
}

module.exports = {
    users,
    mockedMe
}