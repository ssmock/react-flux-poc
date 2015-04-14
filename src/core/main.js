var React = require("react");

var DOM = React.DOM;
var EL = React.createElement;

var UserListContainer =
    require("../user-list/components/user-list-container.js");

React.render(
    EL(UserListContainer, {}),
    at("UserListContainer"));

function at(id) {
    return document.getElementById(id);
}