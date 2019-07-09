# React Redux on The Fly

> Reducers lazy loading for React

[![NPM](https://img.shields.io/npm/v/react-redux-on-the-fly.svg)](https://www.npmjs.com/package/react-redux-on-the-fly)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/MatteoGioioso/react-redux-on-the-fly.svg?branch=master)](https://travis-ci.com/MatteoGioioso/react-redux-on-the-fly)

- Lazy load dynamic reducers
- Create reducer with almost zero boiler plate
- Enforce actions and types naming schema

#### This library and this guide is still under construction, so be gentle 😏

## Why?

You can read more about the motivation of this library on my blog article: https://blog.hirvitek.com/post/redux-advanced-pattern:-dynamic-reducers_bZCV33Fkdvegf4LWwvYe1<>

## Install

```bash
npm install --save react-redux-on-the-fly
```

## Usage

There are fundamental 2 type of usage: high-level and low-level

### High Level usage

To create your `Root` element containing the `redux` store and `react-redux` provider

```javascript
import { Provider } from "react-redux";
import { createRoot } from "react-redux-on-the-fly";

const Root = createRoot(Provider, staticReducers, [yourMiddleware]);
```

After that simply wrap your `App` component or your routes with the created `Root`
Then into your component you can inject your dynamic reducer:

```jsx
import React, { Component } from "react";
import { customerReducer, customerActions } from "./reducers";
import { connect } from "react-redux";

import {
  withAsyncReducer,
  createNamedWrapperReducer
} from "react-redux-on-the-fly";

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}

const mapStateToProps = (state, props) => ({
  customers: state[props.reducerName]
});

const wrappedCustomerReducer = createNamedWrapperReducer(customerReducer);

export default withAsyncReducer(
  "customer",
  "customerId",
  wrappedCustomerReducer
)(
  connect(
    mapStateToProps,
    customerActions
  )(Example)
);
```

If you inspect your redux `store` you are going to find a reducer named `customer/<customerId>`.
That is your dynamic "dynamically" injected reducer

### Low Level

If you wish to have more control over your `Root` and `store` you can simply do it your way by just adding the `ReactReduxOnTheFlyProvider`

```javascript
//TODO: complete code for low level implementation
```

## Reducer and actions creation

`react-redux-on-the-fly` give you the possibility to create pre-made reducers and sets of actions with two simple methods

- Reducer data structure:
  At the moment there are three types of data structures:
  - Array
  - Object (key and value pairs)
  - Single entity (could be any type, but it is not intended to be used with collections)

Array and Object structures contains the classic CRUD methods, while the Single entity contains only the update method.

### Create a reducer

To create a reducer, import your reducer data structure and give it a `section` name.
The `section` name is going to be root of the actions naming.
Ex:

```javascript
const section = "CUSTOMER";
//action name FIND_CUSTOMERS, FIND_CUSTOMER_BY_ID, RECEIVE_CUSTOMERS, SUBSTITUTE_CUSTOMER, ...
```

```javascript
import { baseArrayReducer } from "react-redux-on-the-fly";

const myReducer = baseArrayReducer(section);
```

### Create actions

Same as the reducer

```javascript
import { createActions } from "react-redux-on-the-fly";

const customerActions = createActions(section);
```

This method will return an object containing actions types and functions, this can and should be used with middleware like `redux-saga` or `redux-observable` which dispatch an action to trigger an API request and then dispatch an action to modify the state

```javascript
const { actions, types } = customerActions;
```

### Naming convention

- types:

```javascript
FIND: `FIND_${section}S`,
FIND_BY_ID: `FIND_${section}_BY_ID`,
CREATE: `CREATE_${section}`,
UPDATE_BY_ID: `UPDATE_${section}_BY_ID`,
DELETE_BY_ID: `DELETE_${section}_BY_ID`,
RECEIVE_MANY: `RECEIVE_${section}S`,
RECEIVE_MANY_ON_TOP: `RECEIVE_${section}S_ON_TOP`,
RECEIVE_ONE: `RECEIVE_${section}`,
RECEIVE_ONE_ON_TOP: `RECEIVE_${section}_ON_TOP`,
SUBSTITUTE_ONE: `SUBSTITUTE_${section}`,
DESTROY_ONE: `DESTROY_${section}`,
DESTROY_MANY: `DESTROY_${section}S`,
RESET: `RESET_${section}S`,
```

- Actions
  actions follow the same naming conventions as types but in camelCase

```
find<section_name>s
find<section_name>ById
receive<section_name>s
...
```

### Overrides

- ### Reducer methods

You can override each one of the standard reducer methods by importing the `BaseArrayReducerMethods` base class
and create a custom class that inherits from the base class

```javascript
class myCustomMethods extends BaseArrayReducerMethods {
  receiveMany = (state, payload) => {...};

  receiveManyOnTop = (state, payload) => {...};

  substituteOne = (state, payload) => {...};

  destroyOne = (state, payload) => {...};

  destroyMany = (state, payload) => {...};

  resetAll = (state, payload) => {...};
}
```

Then simply pass it as arguments to your reducer creator

```javascript
const reducer = baseArrayReducer("CUSTOMER", null, myCustomMethods);
```

- ### Add more reducer methods
  If you need to add more reducer methods create your custom piece of reducer and pass it as arguments to your reducer creator

```javascript
const overrideReducer = (state, action) => {
   switch (action.type) {
    case "MY_CUSTOM_ACTION":
      return myCustomMethod(state, action.payload);
      //...
};
const reducer = baseArrayReducer("CUSTOMER", null, undefined, overrideReducer);
```

- ### Add custom actions
  If you have the need to add more actions and types, you can easily to that

```javascript
const options = {
  types: {
    CUSTOM_TYPE: "CUSTOM_TYPE"
  },
  actions: {
    myCustomAction: data => ({ type: "CUSTOM_TYPE", payload: data })
  }
};
const result = createActions("CUSTOMER", options);
```

## Upcoming features

- Hooks

## Some stuff

Code reviews, feature request and question are higly welcome. Just open an issue!

---

## License

MIT © [Matteo Gioioso](https://github.com/MatteoGioioso)
