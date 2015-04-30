var React = require("react");
var Reflux = require("reflux");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;
var DIV = DOM.div;

var UserDetailActions = require("../infrastructure/user-detail-actions.js");
var UserDetailStore = require("../stores/user-detail-store.js");

var UserComponentBase =
    require("../../user-list/component-base/user-component-base.js");

var Loading = require("../../common/components/loading.js");
var Modal = require("../../common/components/modal.js");
var AddPostBox = require("../../user-list/components/add-post-box.js");

var config = _.extend(UserComponentBase, {
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        var state = getInitialState.bind(this)();

        return state;
    },

    componentWillMount: function () {
        this.LoadDetail();

        this.listenTo(UserDetailStore, this.DetailLoaded);
    },

    render: function () {
        var result;

        if (this.state.UserID) {
            if (this.state.User) {
                var postBox = this.GetPostBox();
                var viewPostsButton = this.GetViewPostsButton();
                var addBox = this.GetAddBox();
                var addPostButton = this.GetAddPostButton();

                var content = [
                    getLabelledField("ID", this.state.User.id),
                    getLabelledField("Name", this.state.User.name),
                    getLabelledField("User Name", this.state.User.username),
                    getLabelledField("Email", this.state.User.email),
                    getLabelledField("Address",
                        getAddress(this.state.User.address)),
                    getLabelledField("Phone", this.state.User.phone),
                    getLabelledField("Website", this.state.User.website),
                    getLabelledField("Company",
                        getCompany(this.state.User.company)),
                    getLabelledField("", [
                        viewPostsButton,
                        addPostButton
                    ]),
                    postBox,
                    addBox
                ];

                return DOM.div({}, content);
            }
            else {
                result = EL(Loading, {});
            }
        }
        else {
            result = DOM.div({}, "No user ID specified.");
        }

        return result;
    },

    LoadDetail: function () {
        UserDetailActions.LoadDetail(this.state.UserID);
    },

    DetailLoaded: function () {
        var user = UserDetailStore.GetDetail();

        this.setState({ User: user });
    },
});

var UserList = React.createClass(config);

module.exports = UserList;

function getInitialState() {
    var state = {};

    if (this.props.RouteState.Segments.length > 1) {
        state.UserID = this.props.RouteState.Segments[1];
    }

    state.User = null;
    state.IsViewingPosts = false;
    state.IsAddingPost = false;

    return state;
}

function getLabelledField(label, text) {
    return DOM.div({
        style: {
            marginBottom: "10px"
        }
    }, [
        DOM.div({
            style: {
                display: "inline-block",
                width: "150px",
                verticalAlign: "top"
            }
        }, label),
        DOM.div({
            style: {
                display: "inline-block",
                verticalAlign: "top"
            }
        }, text)
    ]);
}

function getAddress(address) {
    return DOM.div({}, [
        DOM.div({}, address.street),
        DOM.div({}, address.suite),
        DOM.div({}, address.city),
        DOM.div({}, address.zipcode)
    ]);
}

function getCompany(company) {
    return DOM.div({}, [
        DOM.div({}, company.name),
        DOM.div({}, company.catchPhrase),
        DOM.div({}, company.bs)
    ]);
}