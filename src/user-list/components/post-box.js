var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Dispatcher = require("../infrastructure/user-list-dispatcher.js");
var UserPostService = require("../services/user-post-service.js");

var Loading = require("../../common/components/loading.js");

var User = React.createClass({
    getInitialState: function () {
        this.LoadList(this.props.UserId);

        return { Posts: [], Loaded: false };
    },
    componentWillMount: function () {
        UserPostService.AddLoadedListener(this.ListLoaded);
    },
    componentWillUnMount: function () {
        UserPostService.RemoveLoadedListener(this.ListLoaded);
    },
    render: function () {
        var result;

        if (!this.state.Loaded) {
            result = EL(Loading, {});
        }
        else {
            result = DOM.div({}, "HERE BE POSTS FOR " + this.props.UserId);
        }

        return result;
    },
    LoadList: function () {
        var search = {};

        Dispatcher.GetPosts(this.props.UserId);
    },
    ListLoaded: function () {
        var list = UserPostService.GetPosts(this.props.UserId);

        this.setState({ Posts: list });
    }
});

module.exports = User;