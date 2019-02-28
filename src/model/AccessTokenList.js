var accessTokens = [];

module.exports = () => {
    return accessTokens;
}

module.exports.findAccessToken = (token) => {
    var accessToken = accessTokens.find((actualToken) => {
        return  actualToken.bearer === token;
    });
    console.log("findAccessToken reached");
    return accessToken.userid;
}

module.exports.saveAccessToken = (userid, bearer) => {
    accessTokens.push({bearer: bearer, userid: userid});
}