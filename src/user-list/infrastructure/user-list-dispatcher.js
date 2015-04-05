var BaseDispatcher = require("../../common/base-dispatcher.js");
var Constants = require("./user-list-command-constants.js");
var _ = require("lodash");

var UserListDispatcher = _.extend(BaseDispatcher.prototype, {
    SendTest: function (arg) {
        this.dispatch({
            Name: Constants.TEST_COMMAND,
            Arg: arg
        });
    }
});

function getDispatch(commandName) {
    var self = this;

    return function (arg) {
        self.dispatch({
            Name: commandName,
            Arg: arg
        });
    };
}

module.exports = UserListDispatcher;