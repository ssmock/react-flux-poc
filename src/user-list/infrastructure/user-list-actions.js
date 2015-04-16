var Reflux = require("reflux");

var UserListActions = Reflux.createActions([
    "LoadUsers",
    "LoadUserPosts"
]);

module.exports = UserListActions;