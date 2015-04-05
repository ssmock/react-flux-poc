var UserListDispatcher = require("../infrastructure/user-list-dispatcher.js");

var TestService = {
    DispatcherIndex: UserListDispatcher.register(handleAction)
};

function handleAction(payload) {
    var action = payload.Action;
      
    console.log(action.Name + ":", action.Args);
}

module.exports = TestService;