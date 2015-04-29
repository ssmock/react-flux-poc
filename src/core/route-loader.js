var RouteConfig = require("./router/route-config.js");

var RouteLoader = {
    GetLoadMethodForRouteState: getLoadMethodForRouteState,
    GetDefaultLoadMethod: getDefaultLoadMethod
};

function getLoadMethodForRouteState(routeState) {
    var result;

    if (routeState.hasOwnProperty("Segments")) {
        if (routeState.Segments.length > 0) {
            var segments = routeState.Segments.map(function (seg) {
                return seg.toLowerCase();
            });

            result = getLoadForSegments(RouteConfig, segments);
        }
    }

    return result || function (callback) {
        callback();
    }
}

function getLoadForSegments(parentRoute, segments) {
    var firstSegment = segments.shift();

    var route = getRoute(parentRoute, firstSegment);

    if (route) {
        if (segments.length === 0) {
            return route.Load;
        }
        else {
            return getLoadForSegments(route, segments);
        }
    }
    else {
        return null;
    }
}

function getRoute(parentRoute, segment) {
    var result = parentRoute[segment];

    if (!result) {
        var paramKey = _(parentRoute).keys().find(function (key) {
            return key[0] === ":";
        });

        result = parentRoute[paramKey];
    }

    return result;
}

function getDefaultLoadMethod() {
    var first = _(RouteConfig).keys().first();

    return RouteConfig[first].Load;
}

module.exports = RouteLoader;