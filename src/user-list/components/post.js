var React = require("react");
var _ = require("lodash");

var DOM = React.DOM;
var EL = React.createElement;

var Post = React.createClass({
    render: function () {
        var result;

        console.log(this.props);

        result = DOM.div({
            style: {
                borderBottom: "1px solid #888"
            }
        }, [
                DOM.div({}, [
                    getCell(100, this.props.Data.userId + ". " + this.props.Data.id),
                    getCell(350, this.props.Data.title),
                ]),
                getCell(500, this.props.Data.body, 100),
        ]);

        return result;
    }
});

function getCell(width, content, offset) {
    return DOM.div({
        style: {
            display: "inline-block",
            width: width + "px",
            marginLeft: (offset || 0) + "px"
        }
    }, content);
}

module.exports = Post;