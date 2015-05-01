var React = require("react");
var Reflux = require("reflux");

var DOM = React.DOM;
var EL = React.createElement;

var MainComponentStore = require("./main-component-store.js");

var Main = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            ComponentState: MainComponentStore.GetCurrentComponentState()
        };
    },

    componentWillMount: function () {
        this.listenTo(MainComponentStore, this.MainComponentChanged);

        var routeState = this.state.ComponentState.RouteState;

        if (routeState.Segments[0] === "") {
            MainComponentStore.LoadComponentState();
        }
    },

    render: function () {
        var result;

        if (this.state.ComponentState.Component) {
            result = EL(this.state.ComponentState.Component, {
                RouteState: this.state.ComponentState.RouteState
            });
        }

        return result;
    },

    MainComponentChanged: function (componentState) {
        this.setState({ ComponentState: componentState });
    }
});

React.render(
    EL(Main, {}),
    document.getElementById("Main"));