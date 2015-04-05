var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserListDispatcher =
    require("../services/user-list-test-service.js");

var Dispatcher = require("../infrastructure/user-list-dispatcher.js");

/**
 * props:
 * - ???: ???
 */
var UserListContainer = React.createClass({
    getInitialState: function () {
        return {};
    },
    raiseSomeEvent: function() {
        Dispatcher.SendTest("TEST@" + new Date());
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