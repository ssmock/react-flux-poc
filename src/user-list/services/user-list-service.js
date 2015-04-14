﻿require("whatwg-fetch"); // Global
var EventEmitter = require("events").EventEmitter;

var Names = require("../infrastructure/user-list-command-names.js");
var UserListDispatcher = require("../infrastructure/user-list-dispatcher.js");

var LOADED_EVENT = "LOADED";

var userList;

var UserListService = _.merge(EventEmitter.prototype, {
    GetList: function () {
        return userList || [];
    },

    AddLoadedListener: function (callback) {
        this.on(LOADED_EVENT, callback);
    },

    RemoveLoadedListener: function (callback) {
        this.removeListener(LOADED_EVENT, callback);
    },

    DispatcherIndex: UserListDispatcher.register(function (command) {
        switch (command.Name) {
            case Names.GET_LIST:
                fetch("http://jsonplaceholder.typicode.com/users")
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        userList = json;

                        UserListService.emit(LOADED_EVENT);
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

module.exports = UserListService;