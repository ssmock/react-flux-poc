var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var UserList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var result;

        var style = {
            zIndex: 10000,
            position: "fixed",
            top: "50%",
            left: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            MozTransform: "translate(-50%, -50%)",
            msTransform: "translate(-50%, -50%)",
            OTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.40)",
            padding: "10px",
            backgroundColor: "#fff"
        };

        if (this.props.width) {
            style.width = this.props.width;
        }

        if (this.props.height) {
            style.height = this.props.height;
        }

        if (this.props.obscureBackground) {
            result = DOM.div({}, [
                DOM.div({
                    style: {
                        position: "fixed",
                        zIndex: "9999",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#444",
                        opacity: "0.6"
                    }
                }, ""),
                DOM.div({
                    style: style
                }, this.props.children)
            ]);
        }
        else {
            result = DOM.div({
                style: style
            }, this.props.children);
        }

        return result;
    }
});

module.exports = UserList;