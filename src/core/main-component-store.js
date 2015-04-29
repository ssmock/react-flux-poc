var Reflux = require("reflux");

var RouteLoader = require("./route-loader.js");
var RouteStateStore = require("./route-state-store.js");

var Loading = require("../common/components/loading.js");

var currentComponent = Loading;
var currentRouteState = RouteStateStore.GetState();

var MainComponentStore = Reflux.createStore({
    init: function () {
        this.listenTo(RouteStateStore, this.LoadComponentState);
    },

    LoadComponentState: function () {
        currentComponent = Loading;
        currentRouteState = RouteStateStore.GetState();

        this.trigger(getCurrentComponentState());
        
        var load;

        if (currentRouteState.Segments[0] === "") {
            load = RouteLoader.GetDefaultLoadMethod();
        }
        else {
            load = RouteLoader.GetLoadMethodForRouteState(currentRouteState);
        }

        load(this.RouteStateComponentLoaded);
    },

    GetCurrentComponentState: function () {
        return getCurrentComponentState();
    },

    RouteStateComponentLoaded: function (component) {
        currentComponent = component;

        this.trigger(getCurrentComponentState());
    }
});

function getCurrentComponentState() {
    return {
        Component: currentComponent,
        RouteState: currentRouteState
    };
}

module.exports = MainComponentStore;