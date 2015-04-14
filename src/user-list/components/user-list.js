var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Dispatcher = require("../infrastructure/user-list-dispatcher.js");
var UserListService = require("../services/user-list-service.js");

var Loading = require("../../common/components/loading.js");
var User = require("./user.js");

var UserList = React.createClass({
    getInitialState: function () {
        this.LoadList();

        return { Users: [] };
    },
    componentWillMount: function () {
        UserListService.AddLoadedListener(this.ListLoaded);
    },
    render: function () {
        var result;

        if (this.state.Users.length) {
            var userElements = this.state.Users.map(toUserElement);

            result = DOM.div({ key: "LIST" }, userElements);
        }
        else {
            result = EL(Loading);
        }

        return result;
    },
    LoadList: function () {
        var search = {};

        Dispatcher.GetList(search);
    },
    ListLoaded: function () {
        var list = UserListService.GetList();

        this.setState({ Users: list });
    }
});

function toUserElement(user, index) {
    return EL(User, { Data: user, key: user.id });
}

module.exports = UserList;