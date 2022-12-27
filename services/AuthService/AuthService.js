const jwt = require('express-jwt').expressjwt;
const jwksRsa = require('jwks-rsa');
const DbService = require('../DbService');
const { ObjectId } = require('mongodb');

const AuthService = {
    config(authConfig) {
        this.checkJwt = !process.env.SKIP_AUTH0
            ? jwt({
                secret: jwksRsa.expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
                }),
                audience: authConfig.audience,
                issuer: `https://${authConfig.domain}/`,
                algorithms: ['RS256'],
            })
            : (req, res, next) => {
                next();
            };
    },

    checkUserApiAccess(req, res, next) {
        const { userId } = req.params;
        if (!userId) {
            res.status(403).json({
                message: 'Forbidden. Parameter "userId" required to access this API.',
            })
        } else {
            req.userId = userId;
            next();
        }
    },

    async checkWorkspaceApiAccess(req, res, next) {
        const { workspaceId } = req.params;

        if (!workspaceId) {
            res.status(403).json({
                message: 'Forbidden. Parameter "workspaceId" required to access this API.',
            })
        } else {

            req.workspaceId = workspaceId;
            const board = await DbService.boards.findOne({ _id: ObjectId(req.workspaceId) });

            if (board) {
                const { owners, contributors } = board;
                const hasAccess = owners.
                    some(owner =>
                        owner === req.userId) || contributors
                            .some(contributors => contributors === req.userId)
                if (hasAccess) next();
                else res.status(403).json({ message: 'Forbidden. Not your workspace.' })

            } else {
                res.status(404).json({ message: 'Workspace not exists.' })
            }

        }
    },
}

module.exports = AuthService;