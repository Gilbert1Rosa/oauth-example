const express = require('express'),
      oauthServer = require('node-oauth2-server'),
      bodyParser = require('body-parser');

var app = express();

var OAuthModel = require('./src/model/OAuthModel'),
    UserList = require('./src/model/UserList'),
    AccessTokenList = require('./src/model/AccessTokenList');

app.use(bodyParser.json());
app.oauth = oauthServer({
    model: OAuthModel(UserList, AccessTokenList),
    grants: ['password'],
    debug: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.use((error, req, res, next) => {
    if (error) {
        console.log("An error ocurred");
        var response = {
            message: "An error ocurred"
        }
        res.send(response);
    } else {
        next();
    }
});


app.post('/login', app.oauth.grant());
app.post('/protected', app.oauth.authorise(), (req, res) => {
    var response = {
        message: "You accessed protected area successfully"
    }
    res.send(response);
});
app.listen(5000);