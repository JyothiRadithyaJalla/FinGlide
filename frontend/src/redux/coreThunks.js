import api from "../api/axios";
import { coreActions } from "./coreSlice";
import { showSuccess, showError } from "../components/utils/toast";


export const fetchCoreData = () => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const [acc, cat, tx, bud] = await Promise.all([
      api.get("/account/getAccounts/", { withCredentials: true }),
      api.get("/category/getCategories/", { withCredentials: true }),
      api.get("/transaction/getTransactions/", { withCredentials: true }),
      api.get("/budget/getBudgets/", { withCredentials: true }),
    ]);

    dispatch(coreActions.setAccountList(acc.data.accounts));
    dispatch(coreActions.setCategoryList(cat.data.Categories));
    dispatch(coreActions.setTransactionList(tx.data.transactions));
    dispatch(coreActions.setBudgetList(bud.data.Budgets));

    dispatch(coreActions.stopLoading());
  } catch {
    dispatch(coreActions.setError("Failed to load app data"));
    showError("Failed to load app data");
  }
};


export const fetchReportsData = () => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const [pie, line, bar] = await Promise.all([
      api.get("/category/getPieData/", { withCredentials: true }),
      api.get("/transaction/yearlySummary/", { withCredentials: true }),
      api.get("/transaction/expVsincYearly/", { withCredentials: true }),
    ]);

    dispatch(coreActions.setPieData(pie.data.transactionData));
    dispatch(coreActions.setLineData(line.data.summary));
    dispatch(coreActions.setExpVsInc(bar.data.summary));

    dispatch(coreActions.stopLoading());
  } catch {
    dispatch(coreActions.setError("Failed to load reports"));
    showError("Failed to load reports");
  }
};

export const fetchSpendVsBudgetThunk =
  ({ month, year }) =>
  async (dispatch) => {
    dispatch(coreActions.startLoading());

    try {
      const res = await api.get(
        `/budget/spendVsBudget?month=${month}&year=${year}`,
        { withCredentials: true }
      );

      dispatch(
        coreActions.setSpendVsBudgetData(res.data.data)
      );
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to fetch spend vs budget data"
      );
    } finally {
      dispatch(coreActions.stopLoading());
    }
  };



export const registerUser = (details) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    await api.post("/auth/register", details, {
      withCredentials: true,
    });

    showSuccess("Account created successfully");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message || "Registration failed"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};


export const loginUser = (data) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    await api.post("/auth/login", data, { withCredentials: true });
    dispatch(coreActions.setIsUserLoggedIn(true));
    showSuccess("Logged in successfully");
  } catch (err) {
    showError(err.response?.data?.message || "Login failed");
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );

    dispatch(coreActions.resetCoreState());

    showSuccess("Logged out successfully");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message || "Logout failed"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const deleteUserThunk = () => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    await api.delete(
      "/auth/deleteuser",
      { withCredentials: true }
    );

    dispatch(coreActions.resetCoreState());

    showSuccess("Account deleted successfully");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message || "Failed to delete account"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};


export const createTransactionThunk = (form) => async (dispatch) => {
  dispatch(coreActions.startLoading());
  console.log(form)

  try {
    const res = await api.post(
      "/transaction/createTransaction/",
      form,
      { withCredentials: true }
    );

    dispatch(coreActions.setTransactionList(res.data.transactions));
    dispatch(coreActions.setAccountList(res.data.accounts));

    showSuccess(res.data.message || "Transaction created");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message ||
        "Failed to create transaction"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};


export const deleteTransactionThunk = (id) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.delete(
      `/transaction/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(coreActions.setTransactionList(res.data.transactions));
    dispatch(coreActions.setAccountList(res.data.accounts));

    showSuccess(res.data.message || "Transaction deleted");
  } catch (err) {
    showError(
      err.response?.data?.message || "Failed to delete transaction"
    );
  } finally {
    dispatch(coreActions.stopLoading());
  }
};




export const deleteAccountThunk = (id) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.delete(`/account/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(coreActions.setAccountList(res.data.accounts));

    showSuccess(res.data.message || "Account deleted");
  } catch (err) {
    showError(
      err.response?.data?.message || "Failed to delete account"
    );
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const createAccountThunk = (form) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.post(
      "/account/createAccount/",
      form,
      { withCredentials: true }
    );

    dispatch(coreActions.setAccountList(res.data.accounts));

    showSuccess(res.data.message || "Account created");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message ||
        "Failed to create account"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const updateAccountThunk =
  (id, form) => async (dispatch) => {
    dispatch(coreActions.startLoading());

    try {
      const res = await api.put(
        `/account/update/${id}`,
        form,
        { withCredentials: true }
      );

      dispatch(coreActions.setAccountList(res.data.accounts));

      showSuccess(res.data.message || "Account updated");
      return true;
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to update account"
      );
      return false;
    } finally {
      dispatch(coreActions.stopLoading());
    }
  };





export const deleteBudgetThunk = (budgetId) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.delete(
      `/budget/delete/${budgetId}`,
      { withCredentials: true }
    );

    dispatch(coreActions.setBudgetList(res.data.budgets));

    showSuccess(res.data.message || "Budget deleted");
  } catch (err) {
    showError(
      err.response?.data?.message || "Failed to delete budget"
    );
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const createBudgetThunk = (form) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.post(
      "/budget/createBudget/",
      form,
      { withCredentials: true }
    );

    dispatch(coreActions.setBudgetList(res.data.budgets));

    showSuccess(res.data.message || "Budget created");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message ||
        "Failed to create budget"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};



export const deleteCategoryThunk = (id) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.delete(
      `/category/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(coreActions.setCategoryList(res.data.categories));

    showSuccess(res.data.message || "Category deleted");
  } catch (err) {
    showError(
      err.response?.data?.message || "Failed to delete category"
    );
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const createCategoryThunk = (form) => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    const res = await api.post(
      "/category/createCategory/",
      form,
      { withCredentials: true }
    );

    dispatch(coreActions.setCategoryList(res.data.categories));

    showSuccess(res.data.message || "Category created");
    return true;
  } catch (err) {
    showError(
      err.response?.data?.message ||
        "Failed to create category"
    );
    return false;
  } finally {
    dispatch(coreActions.stopLoading());
  }
};

export const updateCategoryThunk =
  (id, form) => async (dispatch) => {
    dispatch(coreActions.startLoading());

    try {
      const res = await api.put(
        `/category/update/${id}`,
        form,
        { withCredentials: true }
      );

      dispatch(coreActions.setCategoryList(res.data.categories));

      showSuccess(res.data.message || "Category updated");
      return true;
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to update category"
      );
      return false;
    } finally {
      dispatch(coreActions.stopLoading());
    }
  };




export const restoreSession = () => async (dispatch) => {
  dispatch(coreActions.startLoading());

  try {
    await api.get("/auth/check", { withCredentials: true });
    dispatch(coreActions.setIsUserLoggedIn(true));
  } catch {
    dispatch(coreActions.setIsUserLoggedIn(false));
  } finally {
    dispatch(coreActions.stopLoading());
  }
};
