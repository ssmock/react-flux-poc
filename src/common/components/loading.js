var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return DOM.div({}, "LOADING...");
    }
});

module.exports = UserList;