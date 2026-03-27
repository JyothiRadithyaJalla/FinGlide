export const budgetInitialState = {
  categoryId: "",
  limit: "",
  period: "monthly",
};

export function budgetFormReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_PERIOD":
      return {
        ...state,
        period: action.value,
      };

    case "SET_ALL":
      return {
        ...state,
        ...action.payload,
      };


    case "RESET":
      return budgetInitialState;

    default:
      return state;
  }
}
