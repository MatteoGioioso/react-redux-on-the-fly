import {
  createNamedWrapperReducer,
  getReducerName,
  mapIdentifierNamesToProp
} from "../helpers";
import { baseArrayReducer } from "../baseArrayReducer";

describe("Helpers functions", function() {
  describe("createNamedWrappedReducer", function() {
    it("should instantiate correctly the given reducer", function() {
      const action = {
        name: "customers",
        type: "RECEIVE_CUSTOMERS",
        payload: [{ name: "new customer", id: "1" }]
      };
      const result = createNamedWrapperReducer(baseArrayReducer("CUSTOMER"))(
        "customers"
      )([], action);

      expect(result).toEqual(action.payload);
    });

    it("should not instantiate a reducer, given name is different", function() {
      const action = {
        name: "todos",
        type: "RECEIVE_TODOS",
        payload: [{ name: "new customer", id: "1" }]
      };
      const result = createNamedWrapperReducer(baseArrayReducer("CUSTOMER"))(
        "customers"
      )([], action);

      expect(result).toEqual([]);
    });
  });

  describe("getReducerName", function() {
    it("should get a reducer name", function() {
      const props = {
        match: { params: { customerId: "123" } }
      };
      const result = getReducerName(props, "customerId", "customers");

      expect(result).toBe("customers/123");
    });

    it("should get a reducer name given 2 identifiers", function() {
      const props = {
        match: { params: { customerId: "123" } },
        groupId: "abc"
      };
      const result = getReducerName(
        props,
        ["customerId", "groupId"],
        "customers"
      );

      expect(result).toBe("customers/123/abc");
    });

    it("should return only the name space, no identifier has been specified", function() {
      const props = {
        match: { params: { customerId: "123" } },
        groupId: "abc"
      };
      const result = getReducerName(props, null, "customers");

      expect(result).toBe("customers");
    });

    it("should map identifier name to props correctly given an array of identifiers", function() {
      const props = {
        match: { params: { customerId: "123" } },
        groupId: "abc"
      };
      const result = mapIdentifierNamesToProp(["customerId", "groupId"], props);

      expect(result).toEqual(["123", "abc"]);
    });

    it("should map identifier name to props correctly given one identifier", function() {
      const props = {
        match: { params: { customerId: "123" } },
        groupId: "abc"
      };
      const result = mapIdentifierNamesToProp(["customerId"], props);

      expect(result).toEqual(["123"]);
    });
  });
});
