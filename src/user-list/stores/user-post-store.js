require("whatwg-fetch"); // Global
var Reflux = require("reflux");
var _ = require("lodash");

var UserListActions = require("../infrastructure/user-list-actions.js");

var posts = [];

var UserListStore = Reflux.createStore({
    init: function () {
        this.listenTo(UserListActions.LoadUserPosts, this.LoadUserPosts);
        this.listenTo(UserListActions.AddUserPost, this.AddUserPost);
    },

    LoadUserPosts: function (userId) {
        var self = this;

        var url = "http://jsonplaceholder.typicode.com/posts?userId=" + userId;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                mergePostsFor(userId, json);

                self.trigger(userId);
            })
            .catch(function (ex) {
                console.log("BAD:", ex);
            });
    },

    AddUserPost: function (newPost) {
        var self = this;

        var url = "http://jsonplaceholder.typicode.com/posts";

        var config = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        };

        fetch(url, config)
            .then(function (response) {
                return response.json();
            })
            .then(function (addedPost) {
                posts.push(addedPost);

                self.trigger(addedPost.userId);
            })
            .catch(function (ex) {
                console.log("BAD ADD:", ex);
            });
    },

    GetUserPosts: function (userId) {
        var result = posts.filter(isForUser(userId));

        return result;
    }
});

function mergePostsFor(userId, newPosts) {
    newPosts.forEach(function (newPost) {
        if (!_.some(posts, { id: newPost.id })) {
            posts.push(newPost);
        }
    });
}

function isNotForUser(userId) {
    return function (post) {
        return post.userId !== userId;
    };
}

function isForUser(userId) {
    return function (post) {
        return post.userId === userId;
    }
}

module.exports = UserListStore;