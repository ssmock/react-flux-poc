var UserListDispatcher = require("../infrastructure/user-list-dispatcher.js");

var TestService = {
    DispatcherIndex: UserListDispatcher.register(handleAction)
};

function handleAction(command) {      
    console.log(command.Name + ":", command.Arg);
}

module.exports = TestService;