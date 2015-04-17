var _ = require("lodash");
var Director = require("director");
var Reflux = require("reflux");
var QueryString = require("query-string");

var CoreActions = require("../core-actions.js");
var MakeRouteChangeMessage = require("./make-route-change-message.js");
var RouteConfig = require("./route-config.js");

var Router = {};

var routeSetup = {};

_.each(RouteConfig, function (value, key) {
    if (!(value instanceof Function)) {
        routeSetup["/" + key] = makeRoute(value);
    }
});

function makeRoute(source) {
    var route = {
        on: routeHandler
    };

    _.each(source, function (value, key) {
        if (!(value instanceof Function)) {
            routeSetup["/" + key] = makeRoute(value);
        }
    });

    return route;
}

console.log(routeSetup);

Router = Director.Router(routeSetup);

Router.notFound = function () {
    UserListActions.RouteNotFound();
}

Router.init();

module.exports = Router;

function routeHandler() {
    var currentRouteMessage = MakeRouteChangeMessage(Router.getRoute());

    CoreActions.RouteChanged(currentRouteMessage);
}