let userList;
let accessTokenList;

module.exports = (injectedUserList, injectedAccessTokenList) => {
    userList = injectedUserList;
    accessTokenList = injectedAccessTokenList;
    return {
        getClient: getClient,
        saveAccessToken: saveAccessToken,
        grantTypeAllowed: grantTypeAllowed,
        getAccessToken: getAccessToken,
        getUser: getUser
    }
}

function getClient(clientID, clientSecret, callback) {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUrl: null
    };
    callback(false, client)
}

function saveAccessToken(accessToken, clientID, expires, user, callback) {
    accessTokenList.saveAccessToken(user.userid, accessToken);
    console.log(`Access token ${accessToken} for user ${user.userid} saved`);
    callback(false);
}

function grantTypeAllowed(clientID, grantType, callback) {
    console.log(`Grant allowed to client: ${clientID}, with type ${grantType}`);
    callback(false, true);
}

function getAccessToken(bearerToken, callback) {
    var userid = accessTokenList.findAccessToken(bearerToken);
    var accessToken = {
        user: {
            id: userid
        },
        expires: null
    };
    var isUseridUndefined = userid === undefined;
    console.log(`Fetched token: ${JSON.stringify(accessToken)}`);
    callback(isUseridUndefined, isUseridUndefined? null : accessToken);
}

function getUser(user, password, callback) {
    var user = userList.findUser(user, password);
    console.log(`User id: ${user.userid}, name: ${user.username}, password: ${user.password}`);
    callback(false, user);
}