/**
 * createActions
 * @param {String} section
 * @param {Object} options you can inject additional types and action
 * Create a template with common actions and types. Just need to pass a section name
 * and register it into asyncReducersActions.js file
 */
export const createActions = (
  section,
  options = { types: {}, actions: {} }
) => ({
  types: {
    FIND: `FIND_${section}`,
    FIND_BY_ID: `FIND_${section}_BY_ID`,
    CREATE: `CREATE_${section}_BY_ID`,
    UPDATE_BY_ID: `UPDATE_${section}_BY_ID`,
    DELETE_BY_ID: `DELETE_${section}_BY_ID`,
    RECEIVE_MANY: `RECEIVE_${section}S`,
    RECEIVE_ONE: `RECEIVE_${section}`,
    DESTROY_ONE: `DESTROY_${section}`,
    RESET: `RESET_${section}S`,
    ...options.types
  },
  // The only way to reference the same Object's properties during its creation is to use a getter
  get actions() {
    // Api actions
    return {
      [`find${this._normalizeName()}s`]: (data, name, callback) => ({
        type: this.types.FIND,
        payload: { data, name, callback }
      }),
      [`find${this._normalizeName()}ById`]: (data, name, callback) => ({
        type: this.types.FIND_BY_ID,
        payload: { data, name, callback }
      }),
      [`create${this._normalizeName()}`]: (data, name, callback) => ({
        type: this.types.CREATE,
        payload: { data, name, callback }
      }),
      [`update${this._normalizeName()}ById`]: (data, name, callback) => ({
        type: this.types.UPDATE_BY_ID,
        payload: { data, name, callback }
      }),
      [`destroy${this._normalizeName()}ById`]: (data, name, callback) => ({
        type: this.types.DELETE_BY_ID,
        payload: { data, name, callback }
      }),

      // State actions
      [`receive${this._normalizeName()}s`]: (data, name) => ({
        type: this.types.RECEIVE_MANY,
        name,
        payload: data
      }),
      [`receive${this._normalizeName()}`]: (data, name) => ({
        type: this.types.RECEIVE_ONE,
        name,
        payload: data
      }),
      [`remove${this._normalizeName()}`]: (data, name) => ({
        type: this.types.DESTROY_ONE,
        name,
        payload: data
      }),

      ...options.actions
    };
  },

  /**
   * _normalizeName
   * @returns {string}
   * @private
   * input "EVENT_AVAILABLE" -> output "EventAvailable"
   */
  _normalizeName: () => {
    const capitalizeFirstLetter = name => {
      const firstCapitalLetter = name[0];
      const restOfTheNameLowerCase = name.slice(1).toLowerCase();

      return firstCapitalLetter + restOfTheNameLowerCase;
    };

    if (section.includes("_")) {
      return section
        .split("_")
        .map(name => capitalizeFirstLetter(name))
        .join("");
    } else {
      return capitalizeFirstLetter(section);
    }
  }
});
