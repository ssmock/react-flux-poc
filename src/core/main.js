var React = require("react");
var Reflux = require("reflux");

var DOM = React.DOM;
var EL = React.createElement;

var UserListContainer =
    require("../user-list/components/user-list-container.js");
var Contact = require("../contact/components/contact.js");
var InvalidRoute = require("../common/components/invalid-route.js");

var RouteStateStore = require("./route-state-store.js");

var GetComponentForRoute = require("./get-component-for-route.js");

var Main = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return { RouteState: RouteStateStore.GetState() };
    },

    componentWillMount: function () {
        this.listenTo(RouteStateStore, this.RouteChanged);
    },

    render: function () {
        var result;

        //
        // TODO: Lazy load resources based on the route.
        //

        component = GetComponentForRoute(this.state.RouteState);

        if (component) {
            result = EL(component, { RouteState: this.state.RouteState });
        }        

        return result;
    },

    RouteChanged: function (state) {
        if (state.hasOwnProperty("Segments")) {
            this.setState({ RouteState: state })
        }
        else {
            //
            // TODO: Handle this.
            //
            alert("Route not found!");
        }
    }
});

React.render(
    EL(Main, {}),
    document.getElementById("Main"));