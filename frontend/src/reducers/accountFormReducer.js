export const accountInitialState = {
  name: "",
  accountType: "wallet",
  balance: 1,
  institution: "",
  icon: "cash",
  accountNumber: "",
};

export function accountFormReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_ALL":
      return {
        ...state,
        ...action.payload,
      };


    case "RESET":
      return accountInitialState;

    default:
      return state;
  }
}
