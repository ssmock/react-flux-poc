var React = require("react");
var Reflux = require("reflux");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;
var DIV = DOM.div;

var UserDetailActions = require("../infrastructure/user-detail-actions.js");
var UserDetailStore = require("../stores/user-detail-store.js");

var UserComponentBase =
    require("../../common/types/component-base/user-component-base.js");

var Loading = require("../../common/components/loading.js");
var Modal = require("../../common/components/modal.js");
var PostBox = require("../../user-list/components/post-box.js");
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
                result = getUserDisplay.bind(this)(
                    this.state.User,
                    this.state.IsViewingPosts,
                    this.state.IsAddingPost);
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

//var config 
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

function getUserDisplay(user, isViewingPosts, isAddingPost) {
    var content = [
        getLabelledField("ID", user.id),
        getLabelledField("Name", user.name),
        getLabelledField("User Name", user.username),
        getLabelledField("Email", user.email),
        getLabelledField("Address", getAddress(user.address)),
        getLabelledField("Phone", user.phone),
        getLabelledField("Website", user.website),
        getLabelledField("Company", getCompany(user.company))
    ];

    //
    // TODO: 
    // A lot of this can be refactored; it's very similar to what's in user.js.
    //

    var viewPosts;
    var postBox;
    var addPost;
    var addBox;

    if (isViewingPosts) {
        viewPosts = DOM.button({
            onClick: this.HidePosts
        }, "Hide Posts");

        postBox = EL(PostBox, { User: user });
    }
    else {
        viewPosts = DOM.button({
            onClick: this.ViewPosts
        }, "View Posts");
    }

    addPost = DOM.button({
        onClick: this.AddPost
    }, "Add Post");

    if (isAddingPost) {
        addBox = EL(Modal, {
            children: [
                EL(AddPostBox, {
                    User: user,
                    OnCancel: this.AddPostClosed,
                    OnOk: this.AddPostClosed
                })
            ],
            obscureBackground: true
        });
    }

    content.push(getLabelledField("", [
        viewPosts,
        addPost
    ]));

    content.push(postBox);
    content.push(addBox);

    return DOM.div({}, content);
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