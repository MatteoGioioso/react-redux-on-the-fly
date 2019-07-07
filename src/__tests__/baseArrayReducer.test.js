import { baseArrayReducer, BaseArrayReducerMethods } from "../baseArrayReducer";

describe("BaseArrayReducer", function() {
  describe("Overrides", function() {
    class myCustomMethods extends BaseArrayReducerMethods {
      receiveMany = (state, payload) => "custom implementation";
    }

    it("should overrides method correctly", function() {
      const reducer = baseArrayReducer("CUSTOMER", null, myCustomMethods);
      const action = {
        type: "RECEIVE_CUSTOMERS",
        payload: ["1", "2", "3", "4"]
      };
      const result = reducer([], action);

      expect(result).toBe("custom implementation");
    });

    it("should accept and additional override reducer", function() {
      const overrideReducer = (state, action) => {
        if (action.type === "MY_CUSTOM_ACTION") {
          return action.payload;
        } else {
          return state;
        }
      };
      const reducer = baseArrayReducer(
        "CUSTOMER",
        null,
        undefined,
        overrideReducer
      );
      const actions = {
        type: "MY_CUSTOM_ACTION",
        payload: "custom payload"
      };
      const result = reducer([], actions);

      expect(result).toBe("custom payload");
    });
  });

  describe("reducer", function() {
    let reducer;

    beforeEach(function() {
      reducer = baseArrayReducer("CUSTOMER", []);
    });

    it("should receive many", function() {
      const action = {
        type: "RECEIVE_CUSTOMERS",
        payload: ["3", "4"]
      };
      const result = reducer(["1", "2"], action);

      expect(result).toEqual(["1", "2", "3", "4"]);
    });

    it("should receive many on top", function() {
      const action = {
        type: "RECEIVE_CUSTOMERS_ON_TOP",
        payload: ["3", "4"]
      };
      const result = reducer(["1", "2"], action);

      expect(result).toEqual(["3", "4", "1", "2"]);
    });

    it("should substitute one", function() {
      const action = {
        type: "SUBSTITUTE_CUSTOMER",
        payload: { id: "2", content: "update" }
      };
      const result = reducer(
        [
          { id: "1", content: "old" },
          { id: "2", content: "old" },
          { id: "3", content: "old" }
        ],
        action
      );

      expect(result[1]).toEqual({ id: "2", content: "update" });
    });

    it("should destroy one", function() {
      const action = {
        type: "DESTROY_CUSTOMER",
        payload: "2"
      };
      const result = reducer(
        [
          { id: "1", content: "old" },
          { id: "2", content: "old" },
          { id: "3", content: "old" }
        ],
        action
      );

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: "1", content: "old" },
        { id: "3", content: "old" }
      ]);
    });

    it("should destroy many", function() {
      const action = {
        type: "DESTROY_CUSTOMERS",
        payload: ["2", "3"]
      };
      const result = reducer(
        [
          { id: "1", content: "old" },
          { id: "2", content: "old" },
          { id: "3", content: "old" },
          { id: "4", content: "old" }
        ],
        action
      );

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: "1", content: "old" },
        { id: "4", content: "old" }
      ]);
    });

    it("should reset all", function() {
      const action = {
        type: "RESET_CUSTOMERS"
      };
      const result = reducer(
        [
          { id: "1", content: "old" },
          { id: "2", content: "old" },
          { id: "3", content: "old" },
          { id: "4", content: "old" }
        ],
        action
      );

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });
});
