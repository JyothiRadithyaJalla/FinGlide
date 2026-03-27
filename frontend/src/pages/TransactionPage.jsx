import { CiFilter, CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { categoryIcons } from "../components/utils/utilities.js";
import { AddTransactionModal } from "../components/modals/add/AddTransactionModal.jsx";
import Select from "react-select";
import { ArrowBigRight } from "lucide-react";
import { HiArrowRightCircle, HiArrowLeftCircle } from "react-icons/hi2";
import { MdOutlineDelete } from "react-icons/md";
import { deleteTransactionThunk } from "../redux/coreThunks";
import EmptyView from "../components/EmptyView.jsx";
import {
  selectAccounts,
  selectCategories,
  selectTransactions,
} from "../redux/selectors";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#F96C4A" : "white",
    color: state.isFocused ? "white" : "black",
    cursor: "pointer",
    borderRadius: "6px",
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    borderColor: state.isFocused ? "#999" : "#ccc",
  }),
};

function Transactions() {
  const dispatch = useDispatch();

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    searchTransaction: "",
    searchAccount: "All",
    searchTransactionType: "All",
    searchCategory: "All",
  });

  // ✅ SAFE DATA
  const transactionList = useSelector(selectTransactions) || [];
  const categoryList = useSelector(selectCategories) || [];
  const accountList = useSelector(selectAccounts) || [];

  const deleteTransaction = (id) => {
    dispatch(deleteTransactionThunk(id));
  };

  // ✅ DROPDOWNS SAFE
  const categoryTypes = [
    { value: "All", label: "All Categories" },
    ...categoryList.map((c) => ({
      label: c?.name || "Unknown",
      value: c?._id?.toString() || "",
    })),
  ];

  const accountTypes = [
    { value: "All", label: "All Accounts" },
    ...accountList.map((a) => ({
      label: a?.name || "Unknown",
      value: a?._id?.toString() || "",
    })),
  ];

  const transactionTypes = [
    { value: "All", label: "All Types" },
    { value: "Expense", label: "Expense" },
    { value: "Income", label: "Income" },
    { value: "Transfer", label: "Transfer" },
  ];

  // ✅ SAFE FILTER
  const filteredTransactions = useMemo(() => {
    let list = transactionList.filter((tx) =>
      (tx.description || "")
        .toLowerCase()
        .includes(filterOptions.searchTransaction.toLowerCase())
    );

    if (filterOptions.searchAccount !== "All") {
      list = list.filter(
        (tx) =>
          tx.accountId?._id?.toString() === filterOptions.searchAccount ||
          tx.fromAccountId?._id?.toString() === filterOptions.searchAccount ||
          tx.toAccountId?._id?.toString() === filterOptions.searchAccount
      );
    }

    if (filterOptions.searchTransactionType !== "All") {
      list = list.filter(
        (tx) => tx.transactionType === filterOptions.searchTransactionType
      );
    }

    if (filterOptions.searchCategory !== "All") {
      list = list.filter(
        (tx) =>
          tx.categoryId?._id?.toString() === filterOptions.searchCategory
      );
    }

    return list;
  }, [transactionList, filterOptions]);

  const totalIncome = filteredTransactions
    .filter((t) => t.transactionType === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.transactionType === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  const PAGE_SIZE = 6;
  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (pageNum - 1) * PAGE_SIZE;
    return filteredTransactions.slice(start, start + PAGE_SIZE);
  }, [filteredTransactions, pageNum]);

  return (
    <div>
      {isTransactionModalOpen && (
        <AddTransactionModal
          onClose={() => setIsTransactionModalOpen(false)}
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <button
          onClick={() => setIsTransactionModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          + Add Transaction
        </button>
      </div>

      {/* FILTER */}
      <input
        placeholder="Search..."
        value={filterOptions.searchTransaction}
        onChange={(e) =>
          setFilterOptions((prev) => ({
            ...prev,
            searchTransaction: e.target.value,
          }))
        }
        className="border p-2 mb-4 w-full"
      />

      {/* LIST */}
      {paginated.length > 0 ? (
        paginated.map((tx, i) => {
          let Icon = { icon: ArrowBigRight, color: "blue" };

          if (tx.transactionType !== "Transfer") {
            Icon =
              categoryIcons.find(
                (icon) => icon.id === tx.categoryId?.icon
              ) || Icon;
          }

          return (
            <div key={i} className="border p-3 mb-3 flex justify-between">
              <div>
                <h3>{tx.description || "No Description"}</h3>
                <p>{tx.categoryId?.name || "No Category"}</p>
                <p>{tx.accountId?.name || "Unknown"}</p>
                <p>
                  {tx.date
                    ? new Date(tx.date).toDateString()
                    : "No Date"}
                </p>
              </div>

              <div>
                <p>₹{tx.amount}</p>
                <button onClick={() => deleteTransaction(tx._id)}>
                  <MdOutlineDelete />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyView message="No transactions found" />
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          {pageNum > 1 && (
            <HiArrowLeftCircle onClick={() => setPageNum(pageNum - 1)} />
          )}
          <span>
            {pageNum} / {totalPages}
          </span>
          {pageNum < totalPages && (
            <HiArrowRightCircle onClick={() => setPageNum(pageNum + 1)} />
          )}
        </div>
      )}
    </div>
  );
}

export default Transactions;