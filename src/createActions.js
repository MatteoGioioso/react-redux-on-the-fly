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
    FIND: `FIND_${section}S`,
    FIND_BY_ID: `FIND_${section}_BY_ID`,
    CREATE: `CREATE_${section}`,
    UPDATE_BY_ID: `UPDATE_${section}_BY_ID`,
    DELETE_BY_ID: `DELETE_${section}_BY_ID`,
    RECEIVE_MANY: `RECEIVE_${section}S`,
    RECEIVE_MANY_ON_TOP: `RECEIVE_${section}S_ON_TOP`,
    RECEIVE_ONE: `RECEIVE_${section}`,
    SUBSTITUTE_ONE: `SUBSTITUTE_${section}`,
    REMOVE_ONE: `REMOVE_${section}`,
    RESET: `RESET_${section}S`,
    ...options.types
  },

  // The only way to reference the same Object's properties during its creation is to use a getter
  get actions() {
    return {
      [`find${this._normalizeName()}s`]: (urlObject, callback) => ({
        type: this.types.FIND,
        payload: { urlObject, callback }
      }),
      [`find${this._normalizeName()}ById`]: (urlObject, callback) => ({
        type: this.types.FIND_BY_ID,
        payload: { urlObject, callback }
      }),
      [`create${this._normalizeName()}`]: (urlObject, data, callback) => ({
        type: this.types.CREATE,
        payload: { urlObject, data, callback }
      }),
      [`update${this._normalizeName()}ById`]: (urlObject, data, callback) => ({
        type: this.types.UPDATE_BY_ID,
        payload: { urlObject, data, callback }
      }),
      [`delete${this._normalizeName()}ById`]: (urlObject, data, callback) => ({
        type: this.types.DELETE_BY_ID,
        payload: { urlObject, data, callback }
      }),

      [`receive${this._normalizeName()}s`]: (data, name) => ({
        type: this.types.RECEIVE_MANY,
        name,
        payload: data
      }),
      [`receive${this._normalizeName()}sOnTop`]: (data, name) => ({
        type: this.types.RECEIVE_MANY_ON_TOP,
        name,
        payload: data
      }),
      [`substitute${this._normalizeName()}`]: (data, name) => ({
        type: this.types.SUBSTITUTE_ONE,
        name,
        payload: data
      }),
      [`remove${this._normalizeName()}`]: (id, name) => ({
        type: this.types.REMOVE_ONE,
        name,
        payload: id
      }),

      [`receive${this._normalizeName()}`]: (data, name) => ({
        type: this.types.RECEIVE_ONE,
        name,
        payload: data
      }),

      [`reset${this._normalizeName()}s`]: name => ({
        type: this.types.RESET,
        name
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
