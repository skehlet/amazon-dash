#!/usr/bin/env node

var DASH_MACS = ["74:c2:46:67:a3:3f"];
var WIFI_ITF = process.env.WIFI_ITF ? process.env.WIFI_ITF : 'en1';
var HUBOT_WEB_API_BASE = 'http://localhost:8080/amazon-dash';

var dash_button = require('node-dash-button');
var _ = require('lodash');
var rp = require('request-promise');

function onPress(mac) {
    console.log('Dash[' + mac + '] button pressed');
    var options = {
        method: 'POST',
        uri: HUBOT_WEB_API_BASE + '/' + mac,
        body: {
            room: '#amazon-dash-test',
            message: ':amazon: Dash[' + mac + '] button pressed'
        },
        json: true
    };
    if (process.env.HUBOT_USERNAME && process.env.HUBOT_PASSWORD) {
        options.auth = {
            user: process.env.HUBOT_USERNAME,
            pass: process.env.HUBOT_PASSWORD
        };
    }
    rp(options)
        .then(function (parsedBody) {
            console.log('POST successful');
        })
        .catch(function (err) {
            console.log('POST failed:', err);
        });
}

var dash = dash_button(DASH_MACS, WIFI_ITF);
dash.on('detected', _.debounce(
    onPress,
    2 * 60 * 1000,
    {
        'leading': true,
        'trailing': false
    }
));
