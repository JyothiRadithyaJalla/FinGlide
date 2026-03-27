import { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import Select from "react-select";
import { createBudgetThunk } from "../../../redux/coreThunks";
import { budgetFormReducer, budgetInitialState } from "../../../reducers";
import { selectCategories } from "../../../redux/selectors";
import { selectCustomStyles } from "../../utils/selectCustomStyles";

export const AddBudgetModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) || [];
  const [error, setError] = useState(false);

  const [form, dispatchForm] = useReducer(
    budgetFormReducer,
    budgetInitialState
  );

  const categoryOptions = categories
    .filter((c) => c.categoryType === "Expense")
    .map((c) => ({ label: c.name, value: c._id }));

  const periodOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "weekly", label: "Weekly" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId) {
      setError(true);
      return;
    }

    const success = await dispatch(
      createBudgetThunk(form)
    );

    if (success) {
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50">
      <div className="bg-white w-[350px] p-5 rounded-lg">
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-[23px] font-[500]">Add New Budget</h1>
            <p className="text-[14px] text-gray-600">Set a spending limit</p>
          </div>
          <MdOutlineCancel
            size={25}
            onClick={onClose}
            className="self-start mt-3 cursor-pointer text-[#555B5A] hover:text-red-600"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Category type
            </label>
            <Select
              className="w-[100%]"
              styles={selectCustomStyles}
              options={categoryOptions}
              maxMenuHeight={150}
              onChange={(opt) => {
                setError(false);
                dispatchForm({
                  type: "SET_FIELD",
                  field: "categoryId",
                  value: opt.value,
                });
              }}
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">
                Please select a category
              </p>
            )}
          </div>

          <div className="flex flex-col w-[100%] mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">
              Budget Limit
            </label>
            <input
              type="number"
              required
              value={form.limit}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "limit",
                  value: e.target.value,
                })
              }
              placeholder="0.00"
              step={0.1}
              className="outline-none py-2 px-3 rounded shadow border-1 border-gray-300"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Period
            </label>
            <Select
              value={periodOptions.find((p) => p.value === form.period)}
              onChange={(opt) =>
                dispatchForm({
                  type: "SET_PERIOD",
                  value: opt.value,
                })
              }
              className="w-[100%]"
              defaultValue={periodOptions[0]}
              styles={selectCustomStyles}
              options={periodOptions}
            />
          </div>

          <div className="flex justify-end mt-5">
            <button className="bg-[#D96D38] text-white px-5 py-1 rounded">
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
