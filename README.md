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
[Webpack](http://webpack.github.io/).  I use CommonJS-style ``requires``, 
including a few ``require.ensures`` to create chunks for our "top-level" 
components and their dependencies; see 
[Navigation and loading](#Navigation and loading) below.

## 1. Modals

Creating a popup using React is pretty simple.  Once we have a modal component
defined, the rendering strategy is:

1. Determine whether to render the modal component based on a flag contained by
"launching" component's state.
2. Set the contents of the modal component using its ``children`` property.

Here is an example, where ``Modal`` is our reusable modal component, and 
``AddPostBox`` is the component that it should contain.  (Again, ``EL`` aliases
``React.createElement``.

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

Suppose you have two components that should share some functionality: this 
could include logic, child elements to render, or styling.  You want to keep 
your code DRY, and you also want to provide a consistent user experience.

My solution here was to create a "base" component configuration, and then extend
it via ``_.extend`` for each "derived" component configuration.  

Here is a very simple example of this priciple. First, we have the base object.
This is simply an object that could be used to configure a React component, and
not a component itself.  (Or almost be used; it lacks a ``render`` method.)

      var MyComponentBase = {
          GetOkButton: function() {
              return DOM.button({ onClick: this.OnOk }, "OK")
          },
    
          OnOk: function() {
              alert("You clicked OK!");
          }
      };

Next, a derivation.  This overrides the OnOk method while using the 
``GetOkayButton`` method to get a "standard" OK button.  It also introduces a
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

## 3. Server API access

Since the focus here is on React-centered client code, I didn't write anything
for the server at all, instead using
[jsonplaceholder](http://jsonplaceholder.typicode.com/) as a server API.  I'm 
only using ``POST`` and ``GET`` methods, but this is sufficient for a 
demonstration.

Data access is mediated by [Reflux](https://www.npmjs.com/package/reflux) stores 
and actions.  For actual HTTP requests, I use the 
[fetch](https://www.npmjs.com/package/whatwg-fetch) module, which provides is a 
pretty clear and compact way to make and handle requests.

## 4. Navigation and loading

