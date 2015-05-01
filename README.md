# Proof-of-concept: React (+Reflux)

This is a simple demo web application that demonstrates the following:

1.  Modal "popup" controls in React
2.  Sharing logic and UI composition between React components
3.  Server API access using stores (facilitated by Reflux)
4.  SPA-style navigation, including lazy-loading of top-level components and 
their dependencies

Each of these features is detailed below, following some general remarks about
how the application is structured and (stylistically) written.

## 0. Style and architecture

### No JSX

There currently isn't good support in Visual Studio 2013 for JSX editing.  And 
beyond that, I'm a little uncomfortable with JSX -- I'd rather just keep my 
templates in plain old JavaScript.

React provides a couple of methods to use in place of JSX: 
[createElement](http://facebook.github.io/react/docs/top-level-api.html#react.createelement)
and [DOM](http://facebook.github.io/react/docs/top-level-api.html#react.dom). 

To use these methods most efficiently, I adopted a convention, starting each of
my component definition files by aliasing them:

      var DOM = React.DOM;
      var EL = React.createElement;

### Webpack

The project's gulpfile provides some simple, standard tasks for compiling with 
[Webpack](http://webpack.github.io/).  I use CommonJS-style `requires`, 
including a few `require.ensures` to create chunks for our "top-level" 
components and their dependencies; see "Navigation and loading" below.

## 1. Modals

Creating a popup using React is pretty simple.  Once we have a modal component
defined, the rendering strategy is:

1. Determine whether to render the modal component based on a flag contained by
"launching" component's state.
2. Set the contents of the modal component using its `children` property.

Here is an example, where `Modal` is our reusable modal component, and 
`AddPostBox` is the component that it should contain.  (Again, `EL` aliases
`React.createElement`.)

      EL(Modal, {
          children: [
              EL(AddPostBox, {
                  User: this.GetUser(),
                  OnCancel: this.AddPostClosed,
                  OnOk: this.AddPostClosed
              })
          ],
          obscureBackground: true
      });

## 2. Shared logic

Suppose you have two components that should share some functionality: this could
include logic, child elements to render, or styling.  You want to keep your code 
DRY, and you also want to provide a consistent user experience, so centralizing
the common bits is a good idea.

My strategy here was to create a "base" component configuration, and then extend
it via `_.extend` for each "derived" component configuration.  

Here is a very simple example of this strategy. First, we have the base object.
This is simply an object that is not a React component itself, but could be used 
to configure a component.  (Or almost be used, in this case; our example lacks a
`render` method.)

      var MyComponentBase = {
          GetOkButton: function() {
              return DOM.button({ onClick: this.OnOk }, "OK")
          },
    
          OnOk: function() {
              alert("You clicked OK!");
          }
      };

Next, a derivation.  This overrides the OnOk method while using the 
`GetOkayButton` method to get a "standard" OK button.  It also introduces a
render method.

      var MyDerivedComponent1 = React.createClass(_.extend(MyComponentBase, {
          render: function() {
              return DOM({}, [ 
                  "Derived one!",
                  this.GetOkButton() ]);
          },
    
          OnOk: function() {
              alert("Derived 1 says hello.");
          }
      };

This project uses this strategy principly in to share common methods between
the `user` and `user-detail` components.

## 3. Server API access

Since the focus of this project is on React-centered client code, I didn't 
write anything for the server at all, instead using
[jsonplaceholder](http://jsonplaceholder.typicode.com/) as a server API.  I'm 
only using `POST` and `GET` methods, but this is sufficient for a 
demonstration.

If you try to create more than one new post for a user, it will not work as
expected. This is due to how jsonplaceholder handles additions -- our project
code is just fine.

Data access is mediated by [Reflux](https://www.npmjs.com/package/reflux) stores 
and actions.  For actual HTTP requests, I use the 
[fetch](https://www.npmjs.com/package/whatwg-fetch) module, which provides a 
pretty clear and compact way to make and handle requests.

## 4. Navigation and loading

When it came to routing, I had a number of subgoals:

*  Routes should be hash-y
*  Routes should be centrally configured
*  The application's current route and route change events should be exposed via
Reflux store
*  Each configured route should map to a top-level component
*  Top-level components should receive the current route as a property; i.e.
the route indicates both which component to render, and how to do it
*  Source for top-level components should be lazy loaded (by Webpack)

Here's what it took to make it work, in order of salience.

### Route configuration

The problems of mapping routes to components and lazy-loading their source when
the route changes turned out to be very closely tied, due to how Webpack 
handles [dynamic requires](http://webpack.github.io/docs/context.html).  The 
gist of this is: if you try to use an expression to specify which files to 
`require.ensure`, be prepared for Webpack's chunks to be larger than expected.

Because of this restriction and my reluctance to give up Webpack, I picked a 
pretty ugly solution: the `require.ensures` would be provided via functions
within the route configuration itself.  Here is an example route from the 
configuration to demonstrate how this works:

      "user-list": {
          Load: function (callback) {
              require.ensure(["../../user-list/components/user-list.js"],
                  function (require) {
                      callback(
                          require("../../user-list/components/user-list.js"));
                  });
          }
      }

Explanation: `user-list` is a route; `user-list.js` is its component's source
file.  I admit to having committed this code with a bad conscience, but it works
well within Webpack's constraints.

### Director

[flatiron director](https://www.npmjs.com/package/director) is my routing module
of choice, especially combined with 
[query-string](https://www.npmjs.com/package/query-string) for parsing URLs to
the fullest extent.  My director router is configured with a simple projection 
of our lazy-loader configuration object. (See above)

Route change events do not directly trigger component rendering, however. 
Instead, they merely trigger a Reflux action.  This loose-coupling fits nicely
with our Flux-style architecture.

### Bringing it together

director's routing and Webpack's lazy component loading are brought together via
two Reflux stores.

*  `RouteStateStore` listens for route change actions (above), and maintains the 
current (route-based) state.  Accordingly, any component or store can go to 
`RouteStateStore` for an authoritative statement of "where the application 
is."
*  `MainComponentStore` is one such component.  When the state changes, 
`MainComponentStore` updates which top-level React component is "current," and
ensures that its source is available.

So to make our application work like a SPA, we simply need a single "view 
container" component that listens for changes on the `MainComponentStore`, grabs
the current component, and renders it on our page.  The `Main` component does
exactly this.
