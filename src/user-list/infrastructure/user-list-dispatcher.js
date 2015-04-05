var baseDispatcher = require("../../common/base-dispatcher.js");
var constants = require("./user-list-action-constants.js");
//var merge = require('react/lib/merge');
var _ = require("lodash");

var UserListDispatcher = _.extend(baseDispatcher.prototype, {
    HandleTestAction: function (action) {
        this.dispatch({
            Source: "HandleTestAction",
            Action: action
        });
    }
});

module.exports = UserListDispatcher;