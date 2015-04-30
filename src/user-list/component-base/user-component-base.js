var React = require("react");

var DOM = React.DOM;
var EL = React.createElement;

var Modal = require("../../common//components/modal.js")
var PostBox = require("../../user-list/components/post-box.js");
var AddPostBox = require("../../user-list/components/add-post-box.js");

var UserComponentBase = {
    getInitialState: function () {
        return {
            IsViewingPosts: false,
            IsAddingPost: false
        };
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
    },

    GetViewPostsButton: function () {
        var viewPosts;

        if (this.state.IsViewingPosts) {
            viewPosts = DOM.button({
                onClick: this.HidePosts
            }, "Hide Posts");
        }
        else {
            viewPosts = DOM.button({
                onClick: this.ViewPosts
            }, "View Posts");
        }

        return viewPosts;
    },

    GetPostBox: function () {
        var postBox = null;

        if (this.state.IsViewingPosts) {
            postBox = EL(PostBox, { User: this.GetUser() });
        }

        return postBox;
    },

    GetAddPostButton: function () {
        var addPost = DOM.button({
            onClick: this.AddPost
        }, "Add Post");

        return addPost;
    },

    GetAddBox: function () {
        var addBox;

        if (this.state.IsAddingPost) {
            addBox = EL(Modal, {
                children: [
                    EL(AddPostBox, {
                        User: this.GetUser(),
                        OnCancel: this.AddPostClosed,
                        OnOk: this.AddPostClosed
                    })
                ],
                obscureBackground: true
            });
        }

        return addBox;
    },

    GetUser: function () {
        return this.state.User || this.props.User;
    }
};

module.exports = UserComponentBase;