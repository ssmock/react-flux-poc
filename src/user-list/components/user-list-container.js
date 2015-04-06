var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserListService =
    require("../services/user-list-service.js");

var UserListDispatcher =
    require("../infrastructure/user-list-dispatcher.js");

var UserList =
    require("./user-list.js");

/**
 * props:
 * - ???: ???
 */
var UserListContainer = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return EL(UserList, {});
    }
});

module.exports = UserListContainer;