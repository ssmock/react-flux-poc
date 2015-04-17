var Reflux = require("reflux");

var UserListActions = Reflux.createActions([
    "LoadUsers",
    "LoadUserPosts",
    "AddUserPost"
]);

module.exports = UserListActions;