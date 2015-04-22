var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var About = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return DOM.div({}, "Here's something about this very application.");
    }
});

module.exports = About;