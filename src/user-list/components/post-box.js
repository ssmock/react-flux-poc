var React = require("react");
var Reflux = require("reflux");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserListActions = require("../infrastructure/user-list-actions.js");
var UserPostStore = require("../stores/user-post-store.js");

var Loading = require("../../common/components/loading.js");
var Post = require("./post.js");

var User = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        var posts = UserPostStore.GetUserPosts(this.props.User.id);

        if (!posts.length) {
            this.LoadPosts();
        }

        return { Posts: posts || [], Loaded: false };
    },

    componentWillMount: function () {
        this.listenTo(UserPostStore, this.PostsLoaded);
    },

    render: function () {
        var result;

        if (!this.state.Posts.length) {
            result = EL(Loading, {});
        }
        else {
            var postElements = this.state.Posts.map(toPostElement);

            result = DOM.div({
                style: {
                    marginTop: "10px",
                    marginLeft: "50px",
                    border: "1px solid #888"
                }
            }, postElements);
        }

        return result;
    },

    LoadPosts: function () {
        UserListActions.LoadUserPosts(this.props.User.id);
    },

    PostsLoaded: function (userId) {
        if (this.props.User.id === userId) {
            var posts = UserPostStore.GetUserPosts(this.props.User.id);

            this.setState({ Posts: posts });
        }
    }
});

function toPostElement(post) {
    return EL(Post, { Post: post, key: post.id });
}

module.exports = User;