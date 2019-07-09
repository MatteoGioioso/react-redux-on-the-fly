import { createActions } from "../createActions";

describe("actionsCreator", () => {
  it("should return types and actions correctly", function() {
    const result = createActions("CUSTOMER");

    expect(result.actions).toMatchSnapshot();
    expect(result.types).toMatchSnapshot();
  });

  it("should add more types and actions", function() {
    const options = {
      types: {
        CUSTOM_TYPE: "CUSTOM_TYPE"
      },
      actions: {
        myCustomAction: data => ({ type: "CUSTOM_TYPE", payload: data })
      }
    };
    const result = createActions("CUSTOMER", options);

    expect(result.actions).toMatchSnapshot();
    expect(result.types).toMatchSnapshot();
    expect(result.actions.myCustomAction).toBeDefined();
  });
});
