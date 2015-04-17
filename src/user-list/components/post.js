var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Post = React.createClass({
    render: function () {
        var result;

        result = DOM.div({
            style: {
                borderBottom: "1px solid #888",
                padding: "5px"
            }
        }, [
            DOM.div({}, [
                getCell(100, this.props.Post.userId + "." + this.props.Post.id),
                getCell(350, this.props.Post.title),
            ]),
            getCell(500, this.props.Post.body, 100),
        ]);

        return result;
    }
});

function getCell(width, content, offset) {
    return DOM.div({
        style: {
            display: "inline-block",
            verticalAlign: "top",
            width: width + "px",
            marginLeft: (offset || 0) + "px"
        }
    }, content);
}

module.exports = Post;