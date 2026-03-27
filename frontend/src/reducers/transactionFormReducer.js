export const transactionInitialState = {
  description: "",
  transactionType: "Expense",
  categoryId: "",
  accountId: "",
  fromAccountId: null,
  toAccountId: null,
  amount: 1,
  notes: "",
};

export function transactionFormReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_TYPE":
      if (action.value === "Transfer") {
        return {
          ...state,
          transactionType: "Transfer",
          categoryId: null,
          accountId: null,
        };
      }
      return {
        ...state,
        transactionType: action.value,
        fromAccountId: null,
        toAccountId: null,
      };

    case "SET_ALL":
      return {
        ...state,
        ...action.payload,
      };

    case "RESET":
      return transactionInitialState;

    default:
      return state;
  }
}
