# Following envs must be provided:

# app
PORT=<number> 
HTTPS=<boolean>

# mongodb
MONGODB_PREFIX=<example: mongodb:// :required>
MONGODB_USER=<string:optional>
MONGODB_PASSWORD=<string:optional>
MONGODB_CLUSTER=<example: localhost:20217/something :required>
MONGODB_OPTIONS=<example: ?retryWrites=true&w=majority :optional>
MONGODB_NAME=<string:required>
MONGODB_CLIENT_OPTIONS=<boolean:required>

# auth0
AUTH0_CONFIG_PATH=<string:required>
SKIP_AUTH0=<boolean:required>

# auth0 management 
USE_FAKE_OTHER_USERS=<boolean:required>
MANAGEMENT_TEST_TOKEN=<string:optional>

# certs
CERTS_STORE_PATH=<string:optional>