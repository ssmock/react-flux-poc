/**
 * About the Load functions, below:
 *
 * It looks like we should refactor these out, but the way that Webpack handles
 * asynchronous requires with dynamic paths will get us into trouble.
 * 
 * See http://webpack.github.io/docs/context.html.  Basically, we are
 * adding another point of configuration in order to keep our lazy-
 * loading agile and flexible.
 */

/**
 * About the module members:
 *
 * This is pure convention, and a little unsafe, in consequence.  The rule
 * is: members that are not functions are assumed to be route branches.
 *
 * This convention also applies to the routes object itself!
 */
var RouteConfig = {
    "user-list": { // Convention: the first route is the default route.
        Load: function (callback) {
            require.ensure(["../../user-list/components/user-list.js"],
                function (require) {
                    callback(
                        require("../../user-list/components/user-list.js"));
                });
        }
    },
    "user": {
        Load: function (callback) {
            // Convention: call back with null to indicate a viewless route.
            callback(null);
        },
        ":id": {
            Load: function (callback) {
                require.ensure(["../../user/components/user-detail.js"],
                    function (require) {
                        callback(
                            require("../../user/components/user-detail.js"));
                    });
            }
        }
    },
    "about": {
        Load: function (callback) {
            require.ensure(["../../about/components/about.js"],
                function (require) {
                    callback(require("../../about/components/about.js"));
                });
        }
    },
    "contact": {
        Load: function (callback) {
            require.ensure(["../../contact/components/contact.js"],
                function (require) {
                    callback(require("../../contact/components/contact.js"));
                });
        }
    }
};

module.exports = RouteConfig;