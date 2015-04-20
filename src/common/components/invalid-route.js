var React = require("react");

var DOM = React.DOM;
var EL = React.createElement;

var InvalidRoute = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return DOM.div({}, "INVALID ROUTE");
    }
});

module.exports = InvalidRoute;