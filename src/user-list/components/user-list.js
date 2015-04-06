var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Dispatcher = require("../infrastructure/user-list-dispatcher.js");
var UserListService = require("../services/user-list-service.js");

var Loading = require("../../common/components/loading.js");

var UserList = React.createClass({
    getInitialState: function () {
        this.LoadList();

        return { Users: [] };
    },
    componentWillMount: function() {
        UserListService.AddLoadedListener(this.ListLoaded);
    },
    render: function () {
        var result;

        if (this.state.Users.length) {
            result = DOM.div({}, "YA");
        }
        else {
            result = EL(Loading);
        }

        return result;
    },
    LoadList: function () {
        console.log("LOAD LIST");

        var search = {};

        Dispatcher.GetList(search);
    },
    ListLoaded: function (data) {
        console.log("Loaded:", data);
    }
});

module.exports = UserList;