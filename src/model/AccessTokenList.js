var accessTokens = [];

module.exports = () => {
    return accessTokens;
}

module.exports.findAccessToken = (token) => {
    var accessToken = accessTokens.find((actualToken) => {
        return  actualToken.bearer === token;
    });
    return accessToken !== null && accessToken !== undefined? accessToken.userid : undefined;
}

module.exports.saveAccessToken = (userid, bearer) => {
    accessTokens.push({bearer: bearer, userid: userid});
}