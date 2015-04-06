﻿var BaseDispatcher = require("../../common/infrastructure/base-dispatcher.js");
var Names = require("./user-list-command-names.js");
var _ = require("lodash");

var UserListDispatcher = _.extend(BaseDispatcher.prototype, {
    GetList: function (search) {
        this.dispatch({
            Name: Names.GET_LIST,
            Arg: search
        });
    }
});


module.exports = UserListDispatcher;