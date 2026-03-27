export const categoryInitialState = {
  name: "",
  categoryType: "Expense",
  icon: "home",
  description: "",
};

export function categoryFormReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_TYPE":
      return {
        ...state,
        categoryType: action.value,
      };

    case "SET_ALL":
      return {
        ...state,
        ...action.payload,
      };

    case "RESET":
      return categoryInitialState;

    default:
      return state;
  }
}
