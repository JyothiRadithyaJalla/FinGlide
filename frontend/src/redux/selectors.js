export const selectIsUserLoggedIn = (state) =>
  state.core.isUserLoggedIn;

export const selectAccounts = (state) =>
  state.core.accountList;

export const selectCategories = (state) =>
  state.core.categoryList;

export const selectTransactions = (state) =>
  state.core.transactionList;

export const selectBudgets = (state) =>
  state.core.budgetList;

export const selectPieData = (state) =>
  state.core.pieData;

export const selectLineData = (state) =>
  state.core.lineData;

export const selectExpVsInc = (state) =>
  state.core.expVsInc;



export const selectSpendVsBudget = (state) =>
  state.core.spendVsBudgetData;
