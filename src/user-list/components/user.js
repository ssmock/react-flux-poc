var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserComponentBase =
    require("../component-base/user-component-base.js");

var Modal = require("../../common/components/modal.js");
var AddPostBox = require("./add-post-box.js");

var config = _.extend(UserComponentBase, {
    render: function () {
        var result;

        var postBox = this.GetPostBox();
        var viewPostsButton = this.GetViewPostsButton();
        var addBox = this.GetAddBox();
        var addPostButton = this.GetAddPostButton();

        result = DOM.div({
            style: {
                marginBottom: "10px"
            }
        }, [
            getCell(50, getDetailLink(this.props.User.id, this.props.User.id)),
            getCell(200,
                getDetailLink(this.props.User.name, this.props.User.id)),
            getCell(200, this.props.User.username),
            getCell(200, this.props.User.email),
            getCell(90, viewPostsButton),
            getCell(90, addPostButton),
            postBox,
            addBox
        ]);

        return result;
    }
});

var User = React.createClass(config);

function getCell(width, content) {
    return DOM.div({
        style: {
            display: "inline-block",
            width: width + "px"
        }
    }, content);
}

function getDetailLink(text, userId) {
    return DOM.a({
        href: "#user/" + userId
    }, text);
}

module.exports = User;