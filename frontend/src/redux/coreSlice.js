import { createSlice } from "@reduxjs/toolkit";

const initialLineData = [
  { month: "Jan", income: 0, expense: 0, savings: 0 },
  { month: "Feb", income: 0, expense: 0, savings: 0 },
  { month: "Mar", income: 0, expense: 0, savings: 0 },
  { month: "Apr", income: 0, expense: 0, savings: 0 },
  { month: "May", income: 0, expense: 0, savings: 0 },
  { month: "Jun", income: 0, expense: 0, savings: 0 },
  { month: "Jul", income: 0, expense: 0, savings: 0 },
  { month: "Aug", income: 0, expense: 0, savings: 0 },
  { month: "Sep", income: 0, expense: 0, savings: 0 },
  { month: "Oct", income: 0, expense: 0, savings: 0 },
  { month: "Nov", income: 0, expense: 0, savings: 0 },
  { month: "Dec", income: 0, expense: 0, savings: 0 },
];

const coreSlice = createSlice({
  name: "core",
  initialState: {
    isUserLoggedIn: false,

    accountList: [],
    categoryList: [],
    transactionList: [],
    budgetList: [],

    pieData: [],
    lineData: initialLineData,
    expVsInc: [],
    areaData: [],
    spendVsBudgetData: [],

    isLoading: false,
    error: null, 
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    setIsUserLoggedIn(state, action) {
      state.isUserLoggedIn = action.payload;
    },
    setAccountList(state, action) {
      state.accountList = action.payload;
    },
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
    setTransactionList(state, action) {
      state.transactionList = action.payload;
    },
    setBudgetList(state, action) {
      state.budgetList = action.payload;
    },
    setPieData(state, action) {
      state.pieData = action.payload;
    },
    setLineData(state, action) {
      state.lineData = action.payload;
    },
    setExpVsInc(state, action) {
      state.expVsInc = action.payload;
    },
    setAreaData(state, action) {
      state.areaData = action.payload;
    },
    setSpendVsBudgetData(state, action) {
      state.spendVsBudgetData = action.payload;
    },
    resetCoreState() {
      return coreSlice.getInitialState();
    },
  },
});

export const coreActions = coreSlice.actions;
export default coreSlice.reducer;
