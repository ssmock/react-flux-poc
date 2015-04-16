var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var AddPost = React.createClass({
    getInitialState: function () {
        return { CanClose: true };
    },

    render: function () {
        return DOM.div({}, [
            getHeader(this.props.User),
            getTitle(),
            getBody(),
            getButtons.bind(this)()
        ]);
    },

    Cancel: function () {
        this.props.OnCancel();
    },

    Ok: function () {
        this.props.OnOk();
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
                cols: "50"
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
                cols: "50"
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