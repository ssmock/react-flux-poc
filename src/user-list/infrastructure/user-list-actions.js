var constants = require("./user-list-action-constants.js");
var dispatcher = require("./user-list-dispatcher.js");

var Actions = {
    HandleTestAction: function (args) {
        dispatcher.HandleTestAction({
            Name: constants.TEST_ACTION,
            Args: args
        });
    }
};

module.exports = Actions;