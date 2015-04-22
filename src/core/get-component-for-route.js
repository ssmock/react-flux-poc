/**
 * Based on its Segments property, maps the specified route state to a component
 * for rendering.  If the specified route state cannot be mapped, returns null.
 */
function GetComponentForRoute(routeState) {
    var result = null;
    console.log("MACROSS");


    if (routeState.hasOwnProperty("Segments")) {
        if (routeState.Segments.length > 0) {
            var segments = routeState.Segments.map(function (seg) {
                return seg.toLowerCase();
            });

            var firstSegment = segments[0];
            var lastSegment = segments[segments.length - 1];

            switch (firstSegment) {
                case "contact":
                    result = require("../contact/components/contact.js");
                    break;
                case "about":
                    result = require("../about/components/about.js");
                    break;
                case "user-list":
                    result = require("../user-list/components/user-list.js");
                    break;
                case "user":
                    result = require("../user/components/user-detail.js");
                    break;
                default:
                    result = require("../user-list/components/user-list.js");
                    break;
            }
        }
    }

    return result;
}

module.exports = GetComponentForRoute;