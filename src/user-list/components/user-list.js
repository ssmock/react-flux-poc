var React = require("react");
var Reflux = require("reflux");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserListActions = require("../infrastructure/user-list-actions.js");
var UserListStore = require("../services/user-list-store.js");

var Loading = require("../../common/components/loading.js");
var User = require("./user.js");

var UserList = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        this.LoadList();

        return { Users: [] };
    },

    componentWillMount: function () {
        this.listenTo(UserListStore, this.ListLoaded);
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

        UserListActions.LoadUsers(search);
    },

    ListLoaded: function () {
        var list = UserListStore.GetList();

        this.setState({ Users: list });
    }
});

function toUserElement(user, index) {
    return EL(User, { Data: user, key: user.id });
}

module.exports = UserList;