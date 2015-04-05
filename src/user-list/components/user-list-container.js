var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserListDispatcher =
    require("../services/user-list-test-service.js");

var Actions = require("../infrastructure/user-list-actions.js");

/**
 * props:
 * - ???: ???
 */
var UserListContainer = React.createClass({
    getInitialState: function () {
        return {};
    },
    raiseSomeEvent: function() {
        Actions.HandleTestAction("TEST@" + new Date());
    },
    render: function () {
        return DOM.div({}, [
            DOM.button({
                onClick: _.debounce(this.raiseSomeEvent, 500, true)
            }, "Raise it")
        ]);
    }
});

module.exports = UserListContainer;