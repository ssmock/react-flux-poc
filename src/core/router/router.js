﻿"use strict";

var _ = require("lodash");
var Director = require("director");
var Reflux = require("reflux");
var QueryString = require("query-string");

var CoreActions = require("../core-actions.js");
var MakeRouteChangeMessage = require("./make-route-change-message.js");
var RouteConfig = require("./route-config.js");

var Router = getRouter();

Router.notFound = function () {
    UserListActions.RouteNotFound();
};

Router.GetCurrentRoute = function () {
    var route = Router.getRoute();

    var message = MakeRouteChangeMessage(route);

    return message;
};

var firstRoute = _(RouteConfig).keys().first();

Router.init("/" + firstRoute);

module.exports = Router;

function getRouter() {
    var routeSetup = {};

    _.each(RouteConfig, function (value, key) {
        if (!(value instanceof Function)) {
            routeSetup["/" + key] = makeRoute(value);
        }
    });
    
    return Director.Router(routeSetup);
}

function makeRoute(source) {
    var route = {
        on: routeHandler
    };

    _.each(source, function (value, key) {
        if (!(value instanceof Function)) {
            route["/" + key] = makeRoute(value);
        }
    });

    return route;
}

function routeHandler() {
    var currentRouteMessage = MakeRouteChangeMessage(Router.getRoute());

    CoreActions.RouteChanged(currentRouteMessage);
}