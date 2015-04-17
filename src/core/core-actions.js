var Reflux = require("reflux");

var UserListActions = Reflux.createActions([
    "RouteChanged",
    "RouteNotFound"
]);

module.exports = UserListActions;