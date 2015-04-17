require("whatwg-fetch"); // Global
var Reflux = require("reflux");

var UserListActions = require("../infrastructure/user-list-actions.js");

var userList;

var UserListStore = Reflux.createStore({
    init: function() {
        this.listenTo(UserListActions.LoadUsers, this.LoadUsers);
    },

    LoadUsers: function (search) {
        var self = this;

        var url = "http://jsonplaceholder.typicode.com/users";

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                userList = json;

                self.trigger(userList);
            })
            .catch(function (ex) {
                console.log("BAD:", ex);
            });
    },

    LoadedUsers: function() {
        this.trigger();
    },

    GetList: function () {
        return userList || [];
    }
});

module.exports = UserListStore;