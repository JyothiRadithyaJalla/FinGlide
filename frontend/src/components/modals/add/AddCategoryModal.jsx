import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import Select from "react-select";
import { categoryIcons } from "../../utils/utilities.js";
import { createCategoryThunk } from "../../../redux/coreThunks.js";
import { categoryFormReducer, categoryInitialState, } from "../../../reducers";
import { selectCustomStyles } from "../../utils/selectCustomStyles.js";


export const AddCategoryModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [form, dispatchForm] = useReducer(categoryFormReducer,categoryInitialState);

  const categoryTypeOptions = [
    { value: "Expense", label: "Expense" },
    { value: "Income", label: "Income" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await dispatch(
      createCategoryThunk(form)
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
            <h1 className="text-[#3A3A3A] font-[500] text-[23px]">
              Add New Category
            </h1>
            <p className="text-[#5A5A5A] text-[14px]">
              Create a new category to organize your transactions.
            </p>
          </div>
          <MdOutlineCancel
            size={25}
            onClick={onClose}
            className="cursor-pointer hover:text-red-600"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">Category Name</label>
            <input
            required
            value={form.name}
            onChange={(e) =>
              dispatchForm({
                type: "SET_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
            type="text" placeholder="e.g., Food & Dining" className=" outline-none py-2 px-3 rounded shadow focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300"
          />
          </div>
          
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">Category type</label>
            <Select
              className='w-[50%]'
              value={categoryTypeOptions.find(
                (opt) => opt.value === form.categoryType
              )}
              onChange={(opt) =>
                dispatchForm({ type: "SET_TYPE", value: opt.value })
              }
              options={categoryTypeOptions}
              styles={selectCustomStyles}
            />
          </div>

          <div className="flex flex-col mb-5">
              <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">Icon</label>
              <div className="flex overflow-auto py-2 px-2 my-3">
                {categoryIcons.map((eachIcon) => {
                  const IconComponent = eachIcon.icon
                  const isSelected = eachIcon.id === form.icon
                  return(
                  <button
                    key={eachIcon.id}
                    type="button"
                    onClick={() =>
                      dispatchForm({
                        type: "SET_FIELD",
                        field: "icon",
                        value: eachIcon.id,
                      })
                    }
                    style={{ background: eachIcon.color }}
                    className={`flex-shrink-0 w-12 h-12 rounded-full mx-2 flex items-center justify-center ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                  >
                    <IconComponent color="white" />
                  </button>
                  )})}
              </div>
            </div>

          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">Description <span className="text-[16px] font-[400]">(optional)</span></label>
            <textarea
              value={form.description}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "description",
                  value: e.target.value,
                })
              }
              type="text" placeholder="Brief description of this category" className="border-1 outline-none py-2 px-3 h-[100px] rounded shadow"
            />
          </div>

          

          <div className="flex justify-end">
            <button className="bg-[#D96D38] text-white p-1 px-5 rounded">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
