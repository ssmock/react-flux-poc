var React = require("react");
var _ = require("lodash");

console.log("Addons", React.addons);

var UserListActions = require("../infrastructure/user-list-actions.js");

var DOM = React.DOM;
var EL = React.createElement;

var AddPost = React.createClass({
    getInitialState: function () {
        return {
            CanClose: true,
            Title: "",
            Body: ""
        };
    },

    render: function () {
        return DOM.div({}, [
            getHeader(this.props.User),
            getTitle.bind(this)(),
            getBody.bind(this)(),
            getButtons.bind(this)()
        ]);
    },

    Cancel: function () {
        this.props.OnCancel();
    },

    Ok: function () {
        UserListActions.AddUserPost({
            userId: this.props.User.id,
            id: 0,
            title: this.state.Title,
            body: this.state.Body
        });

        this.props.OnOk();
    },

    BindState: function (name) {
        return (function (e) {
            var arg = {};

            arg[name] = e.target.value;

            this.setState(arg);
        }).bind(this);
    }
});

function getHeader(user) {
    return DOM.div({
        style: {
            marginBottom: "10px"
        }
    }, "New post for " + user.name);
}

function getTitle() {
    return DOM.div({}, [
        DOM.div({}, "Title"),
        DOM.div({
            style: {
                marginBottom: "10px"
            }
        }, [
            DOM.textarea({
                rows: "2",
                cols: "50",
                onChange: this.BindState("Title")
            }, "")
        ])
    ]);
}

function getBody() {
    return DOM.div({}, [
        DOM.div({}, "Body"),
        DOM.div({
            style: {
                marginBottom: "10px"
            }
        }, [
            DOM.textarea({
                rows: "8",
                cols: "50",
                onChange: this.BindState("Body")
            }, "")
        ])
    ]);
}

function getButtons() {
    return DOM.div({}, [
        DOM.button({
            disabled: !this.state.CanClose,
            onClick: this.Cancel
        }, "Cancel"),
        DOM.button({
            disabled: !this.state.CanClose,
            onClick: this.Ok
        }, "OK")
    ]);
}

module.exports = AddPost;