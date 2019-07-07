/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { mount } from "enzyme";
import createRoot from "../createRoot";
import { connect, Provider } from "react-redux";
import { withAsyncReducer } from "../injectAsyncReducer";
import { createDuck, createNamedWrapperReducer } from "../helpers";
import { baseArrayReducer } from "../baseArrayReducer";
import { createActions } from "../createActions";

/**
 * Integration test
 */

const mapStateToProps = (state, props) => ({
  testData: state[props.reducerName]
});
const staticReducer = createDuck("static-reducer", "STATIC_REDUCER", "object");
const reducer = createNamedWrapperReducer(baseArrayReducer("TEST_REDUCER"));
const actions = createActions("TEST_REDUCER");
const TestComponent = () => <div />;
const TestComponentWithAsyncReducer = withAsyncReducer("test", "id", reducer)(
  connect(mapStateToProps)(TestComponent)
);

describe("withAsyncReducer", function() {
  let Root;
  beforeEach(function() {
    Root = createRoot(Provider, staticReducer);
  });

  it("should render without crash", function() {
    mount(
      <Root>
        <TestComponentWithAsyncReducer id="123" />
      </Root>
    );
  });

  it("should inject a reducer correctly", function() {
    const wrapper = mount(
      <Root>
        <TestComponentWithAsyncReducer id="123" />
      </Root>
    );

    const { reducerName, testData } = wrapper.find(TestComponent).props();
    expect(reducerName).toBe("test/123");
    expect(testData).toEqual([]);
  });

  // This test the full cycle of redux
  it("should dispatch an action and complete the full redux cycle", function() {
    // Create a component that dispatch an action on mount
    function NewTestComponent({ receiveTestReducers, reducerName }) {
      useEffect(() => {
        receiveTestReducers([{ id: "1" }, { id: "2" }], reducerName);
      }, []);

      return <div />;
    }

    // Inject the reducer
    const NewTestComponentWithAsyncReducer = withAsyncReducer(
      "test",
      "id",
      reducer
    )(
      connect(
        mapStateToProps,
        actions.actions
      )(NewTestComponent)
    );
    // Mount it in the DOM
    const wrapper = mount(
      <Root>
        <NewTestComponentWithAsyncReducer id="123" />
      </Root>
    );
    wrapper.update();

    // Check that the data have been received
    const { testData } = wrapper.find(NewTestComponent).props();
    expect(testData).toEqual([{ id: "1" }, { id: "2" }]);
  });
});
