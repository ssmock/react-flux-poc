var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Loading = require("../../common/components/loading.js");

var User = React.createClass({
    getInitialState: function () {
        return { Posts: [], Loaded: false };
    },
    render: function () {
        var result;

        if (!this.state.Loaded) {
            result = EL(Loading, {});
        }
        else {
            result = DOM.div({}, "HERE BE POSTS FOR " + this.props.UserId);
        }

        return result;
    }
});

module.exports = User;