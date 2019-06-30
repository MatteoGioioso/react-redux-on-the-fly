/* eslint-disable react/prop-types */
import React, { Component } from "react";

import {
  withAsyncReducer,
  createActions,
  createNamedWrapperReducer,
  baseArrayReducer
} from "react-redux-on-the-fly";
import { connect } from "react-redux";

const section = "CUSTOMER";
const actions = createActions(section);
const reducer = createNamedWrapperReducer(baseArrayReducer(section));

class App extends Component {
  render() {
    return (
      <div>
        Hello world my async reducer is {JSON.stringify(this.props.customers)}
        <button onClick={() => this.props.findCustomers()}>Click me</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  customers: state[props.reducerName]
});

export default withAsyncReducer("customer", "id", reducer)(
  connect(
    mapStateToProps,
    actions.actions
  )(App)
);
