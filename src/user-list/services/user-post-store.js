require("whatwg-fetch"); // Global
var Reflux = require("reflux");

var UserListActions = require("../infrastructure/user-list-actions.js");

var posts = [];

var UserListStore = Reflux.createStore({
    init: function() {
        this.listenTo(UserListActions.LoadUserPosts, this.LoadUserPosts);
    },

    LoadUserPosts: function (userId) {
        var self = this;

        var url = "http://jsonplaceholder.typicode.com/posts?userId=" + userId;
        console.log(url);

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log("It could.", userId, json);
                replacePostsFor(userId, json);

                self.trigger(userId);
            })
            .catch(function (ex) {
                console.log("BAD:", ex);
            });
    },

    LoadedPosts: function() {
        this.trigger();
    },

    GetUserPosts: function (userId) {
        return [
            { userId: 123, id: 987, title: "TEST STUFF", body: "TEST BODY" },
            { userId: 123, id: 654, title: "TEST MOAR STUFF", body: "TEST ANOTHER BODY" }];
    }
});

function replacePostsFor(userId, json) {
    posts = posts.filter(isNotForUser(userId));

    posts = posts.concat(json);
}

function isNotForUser(userId) {
    return function (post) {
        post.userId !== userId;
    };
}

module.exports = UserListStore;