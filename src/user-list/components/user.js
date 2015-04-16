var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var PostBox = require("./post-box.js");

var User = React.createClass({
    getInitialState: function () {
        return { IsViewingPosts: false };
    },

    componentWillMount: function () {
        // Wire up events
    },

    render: function () {
        var result;

        var viewPosts;
        var postBox;

        if (this.state.IsViewingPosts) {
            viewPosts = DOM.button({
                onClick: this.HidePosts
            }, "Hide Posts");

            postBox = EL(PostBox, { UserId: this.props.Data.id });
        }
        else {
            viewPosts = DOM.button({
                onClick: this.ViewPosts
            }, "View Posts");

            postBox = null;
        }

        result = DOM.div({}, [
            getCell(50, this.props.Data.id),
            getCell(200, this.props.Data.name),
            getCell(200, this.props.Data.username),
            getCell(200, this.props.Data.email),
            getCell(200, viewPosts),
            postBox
        ]);

        return result;
    },

    ViewPosts: function () {
        this.setState({ IsViewingPosts: true });
    },

    HidePosts: function () {
        this.setState({ IsViewingPosts: false });
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

module.exports = User;