require("whatwg-fetch");
var Reflux = require("reflux");

var UserDetailActions = require("../infrastructure/user-detail-actions.js");

var currentUser;

var UserDetailStore = Reflux.createStore({
    init: function () {
        this.listenTo(UserDetailActions.LoadDetail, this.LoadDetail)
    },

    LoadDetail: function (userId) {
        var self = this;

        console.log(userId);

        var url = "http://jsonplaceholder.typicode.com/users/" + userId;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                currentUser = json;

                self.trigger(currentUser);
            })
        .catch(function (ex) {
            console.log("GET USER FAILED", ex);
        });
    },

    LoadedDetail: function () {
        this.trigger();
    },

    GetDetail: function () {
        return currentUser;
    }
});

module.exports = UserDetailStore;