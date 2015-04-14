require("whatwg-fetch"); // Global
var EventEmitter = require("events").EventEmitter;
var _ = require("lodash");

var Names = require("../infrastructure/user-list-command-names.js");
var UserListDispatcher = require("../infrastructure/user-list-dispatcher.js");

var LOADED_EVENT = "LOADED";

var postList = [];

var UserPostService = _.merge(EventEmitter.prototype, {
    GetUserPosts: function (userId) {
        var result;

        result = postList.filter(function (post) {
            return post.userId === userId;
        });

        return result;
    },

    AddLoadedListener: function (callback) {
        this.on(LOADED_EVENT, callback);
    },

    RemoveLoadedListener: function (callback) {
        this.removeListener(LOADED_EVENT, callback);
    },

    DispatcherIndex: UserListDispatcher.register(function (command) {
        coonsole.log("MESSAGE!");

        switch (command.Name) {
            case Names.GET_LIST:
                var url =
                    "http://jsonplaceholder.typicode.com/users?userId=" 
                    + command.Arg;

                fetch(url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        postList = postList.filter(function (post) {
                            return post.userId !== command.Arg;
                        });

                        postList = postList.concat(json);

                        UserPostService.emit(LOADED_EVENT);
                    })
                    .catch(function (ex) {
                        console.log("BAD:", ex);
                    });

                break;
            default:
                break;
        }
    })
});

module.exports = UserPostService;