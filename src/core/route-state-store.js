require("whatwg-fetch"); // Global
var Reflux = require("reflux");

var CoreActions = require("./core-actions.js");
var GetCurrentRoute = require("./router/router.js").GetCurrentRoute;

var currentState = toCurrentState(GetCurrentRoute());

var RouteStateStore = Reflux.createStore({
    init: function () {
        this.listenTo(CoreActions.RouteChanged, this.RouteChanged);
        this.listenTo(CoreActions.RouteNotFound, this.RouteNotFound);
    },

    RouteChanged: function (routeChangedMessage) {
        currentState = toCurrentState(GetCurrentRoute());

        this.trigger(currentState);
    },

    RouteNotFound: function () {
        this.trigger({});
    },

    GetState: function () {
        return currentState;
    }
});

function toCurrentState(routeChangedMessage) {
    return {
        Segments: routeChangedMessage.Segments,
        QueryValues: routeChangedMessage.QueryValues
    };
}

module.exports = RouteStateStore;