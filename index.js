const express = require('express'),
      oauthServer = require('node-oauth2-server'),
      bodyParser = require('body-parser');

var OAuthModel = require('./src/model/OAuthModel');

var app = express();

app.use(bodyParser.json());
app.oauth = oauthServer({
    model: OAuthModel(),
    grants: ['password'],
    debug: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(app.oauth.errorHandler());

app.post('/login', app.oauth.grant());
app.listen(5000);