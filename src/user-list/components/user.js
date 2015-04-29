var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Modal = require("../../common/components/modal.js");
var PostBox = require("./post-box.js");
var AddPostBox = require("./add-post-box.js");

var User = React.createClass({
    getInitialState: function () {
        return {
            IsViewingPosts: false,
            IsAddingPost: false
        };
    },
    
    render: function () {
        var result;

        var viewPosts;
        var postBox = null;
        var addBox = null;

        if (this.state.IsViewingPosts) {
            viewPosts = DOM.button({
                onClick: this.HidePosts
            }, "Hide Posts");

            postBox = EL(PostBox, { User: this.props.User });
        }
        else {
            viewPosts = DOM.button({
                onClick: this.ViewPosts
            }, "View Posts");
        }

        if (this.state.IsAddingPost) {
            addBox = EL(Modal, {
                children: [
                    EL(AddPostBox, {
                        User: this.props.User,
                        OnCancel: this.AddPostClosed,
                        OnOk: this.AddPostClosed
                    })
                ],
                obscureBackground: true
            });
        }

        var addPost = DOM.button({
            onClick: this.AddPost
        }, "Add Post");

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
            getCell(90, viewPosts),
            getCell(90, addPost),
            postBox,
            addBox
        ]);

        return result;
    },

    ViewPosts: function () {
        this.setState({ IsViewingPosts: true });
    },

    HidePosts: function () {
        this.setState({ IsViewingPosts: false });
    },

    AddPost: function () {
        this.setState({ IsAddingPost: true });
    },

    AddPostClosed: function () {
        this.setState({ IsAddingPost: false });
    }
});

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