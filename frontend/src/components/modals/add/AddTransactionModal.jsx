import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import Select from "react-select";
import { createTransactionThunk } from "../../../redux/coreThunks";
import { transactionFormReducer, transactionInitialState} from "../../../reducers";
import { selectCategories, selectAccounts} from "../../../redux/selectors";
import { selectCustomStyles } from "../../utils/selectCustomStyles.js";

export const AddTransactionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) || [];
  const accounts = useSelector(selectAccounts) || [];

  const [form, dispatchForm] = useReducer(
    transactionFormReducer,
    transactionInitialState
  );

  const categoryOptions = categories
    .filter((c) => c.categoryType === form.transactionType)
    .map((c) => ({ label: c.name, value: c._id }));

  const accountOptions = accounts.map((a) => ({
    label: a.name,
    value: a._id,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await dispatch(
      createTransactionThunk(form)
    );

    if (success) {
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50">
      <div className="bg-white w-[480px] p-5 rounded-lg">
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-[#3A3A3A] font-[500] text-[23px]">Add New Transaction</h1>
            <p className="text-[#5A5A5A] text-[14px]">Create a new category to organize your transactions.</p>
          </div>
          <MdOutlineCancel
            size={25}
            onClick={onClose}
            className="cursor-pointer hover:text-red-600"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">Description</label>
            <input
              required
              value={form.description}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "description",
                  value: e.target.value,
                })
              }
              type="text" placeholder="e.g., Grocery Store" className=" outline-none py-2 px-3 rounded shadow focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300"
            />
          </div>
          
          
          <div className='flex justify-center mb-5'>
            <div className='flex justify-between w-[800px]  px-3 py-2 rounded-lg text-center shadow border-1 border-gray-300'>
              <div onClick={() => dispatchForm({ type: "SET_TYPE", value: "Income" })} className={`${form.transactionType === "Income" ? "bg-green-500 shadow text-white" : ""} py-1 px-3 w-[45%] rounded cursor-pointer`}>Income</div>

              <div onClick={() => dispatchForm({ type: "SET_TYPE", value: "Expense" })} className={`${form.transactionType === "Expense" ? "bg-red-500 shadow text-white" : ""} py-1 px-3 w-[45%] rounded cursor-pointer`}>Expense</div>

              <div onClick={() => dispatchForm({ type: "SET_TYPE", value: "Transfer" })} className={`${form.transactionType === "Transfer" ? "bg-blue-500 shadow text-white" : ""} py-1 px-3 w-[45%] rounded cursor-pointer`}>Transfer</div>
            </div>
          </div>

          {/* {(form.transactionType === "Income" ||
            form.transactionType === "Expense") && (
            <div className="flex gap-3 mb-4">
              <Select
                styles={selectCustomStyles}
                options={categoryOptions}
                value={categoryOptions.find(
                  (o) => o.value === form.categoryId
                )}
                onChange={(opt) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "categoryId",
                    value: opt.value,
                  })
                }
              />
              <Select
                styles={selectCustomStyles}
                options={accountOptions}
                value={accountOptions.find(
                  (o) => o.value === form.accountId
                )}
                onChange={(opt) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "accountId",
                    value: opt.value,
                  })
                }
              />
            </div>
          )}

          {form.transactionType === "Transfer" && (
            <div className="flex gap-3 mb-4">
              <Select
                styles={selectCustomStyles}
                options={accountOptions}
                placeholder="From"
                onChange={(opt) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "fromAccountId",
                    value: opt.value,
                  })
                }
              />
              <Select
                styles={selectCustomStyles}
                options={accountOptions}
                placeholder="To"
                onChange={(opt) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "toAccountId",
                    value: opt.value,
                  })
                }
              />
            </div>
          )} */}

          {(form.transactionType === "Income" || form.transactionType === "Expense") && (
            <div className="flex w-[100%] items-center justify-between mb-3">
              <div className="flex flex-col w-[45%]">
                <label className="text-[#3A3A3A] font-[500] text-[18px]">Category</label>
                <Select
                  styles={selectCustomStyles}
                  options={categoryOptions}
                  value={categoryOptions.find(opt => opt.value === form.categoryId) || null}
                  onChange={(opt) =>
                    dispatchForm({ type: "SET_FIELD", field: "categoryId", value: opt.value })
                  }
                  maxMenuHeight={150}
                />
              </div>

              <div className="flex flex-col w-[45%]">
                <label className="text-[#3A3A3A] font-[500] text-[18px]">Account</label>
                <Select
                  styles={selectCustomStyles}
                  options={accountOptions}
                  value={accountOptions.find(opt => opt.value === form.accountId) || null}
                  onChange={(opt) =>
                    dispatchForm({ type: "SET_FIELD", field: "accountId", value: opt.value })
                  }
                  maxMenuHeight={150}
                />
              </div>
            </div>
          )}
          {form.transactionType === "Transfer" && (
            <div className="flex w-[100%] items-center justify-between mb-3">
              <div className="flex flex-col w-[45%]">
                <label className="text-[#3A3A3A] font-[500] text-[18px]">From Account</label>
                <Select
                  styles={selectCustomStyles}
                  options={accountOptions}
                  value={accountOptions.find(opt => opt.value === form.fromAccountId) || null}
                  onChange={(opt) =>
                    dispatchForm({ type: "SET_FIELD", field: "fromAccountId", value: opt.value })
                  }
                  maxMenuHeight={150}
                />
              </div>

              <div className="flex flex-col w-[45%]">
                <label className="text-[#3A3A3A] font-[500] text-[18px]">To Account</label>
                <Select
                  styles={selectCustomStyles}
                  options={accountOptions}
                  value={accountOptions.find(opt => opt.value === form.toAccountId) || null}
                  onChange={(opt) =>
                    dispatchForm({ type: "SET_FIELD", field: "toAccountId", value: opt.value })
                  }
                  maxMenuHeight={150}
                />
              </div>
            </div>
          )}


          {/* <input
            type="number"
            required
            value={form.amount}
            onChange={(e) =>
              dispatchForm({
                type: "SET_FIELD",
                field: "amount",
                value: Number(e.target.value),
              })
            }
            className="outline-none py-2 px-3 rounded shadow w-full mb-4"
          /> */}
          <div className="flex flex-col mb-4">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">Amount</label>
            <input
              type="number"
              required
              placeholder="0.00"
              step={0.1}
              value={form.amount}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "amount",
                  value: (e.target.value),
                })
              }
              className="outline-none py-2 px-3 rounded shadow w-[80%] border-1 border-gray-300"
            />
          </div>


          {/* <textarea
            value={form.notes}
            onChange={(e) =>
              dispatchForm({
                type: "SET_FIELD",
                field: "notes",
                value: e.target.value,
              })
            }
            className="border py-2 px-3 rounded w-full mb-5"
          /> */}

          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Notes <span className="text-[16px] font-[400]">(optional)</span>
            </label>
            <textarea
              placeholder="Brief description of this category"
              value={form.notes}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "notes",
                  value: e.target.value,
                })
              }
              className="border-1 border-gray-300 outline-none py-2 px-3 h-[70px] rounded shadow"
            />
          </div>


          <div className="flex justify-end">
            <button className="bg-[#D96D38] text-white px-5 py-1 rounded">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
