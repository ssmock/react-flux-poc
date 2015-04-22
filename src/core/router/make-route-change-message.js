var RouteChangeMessage = require("./route-change-message.js");

function makeRouteChangeMessage(route) {
    var lastIndex = route.length - 1;

    var queryValues = getQueryValues(route);

    route[lastIndex] = withoutQueryString(route);

    return new RouteChangeMessage(route, queryValues);
}

function getQueryValues(route) {
    route = route instanceof Array ? _.last(route) : route;

    var matches = route.match(/(\?.+)/);

    if (matches) {
        return QueryString.parse(matches[0].slice(1));
    }

    return null;
}

function withoutQueryString(route) {
    var lastIndex = route.length - 1;

    return route[lastIndex].split("?")[0];
}

module.exports = makeRouteChangeMessage;