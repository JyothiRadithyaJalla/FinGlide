import { useEffect, useReducer } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Select from "react-select";
import { updateCategoryThunk } from "../../../redux/coreThunks";
import { categoryIcons } from "../../utils/utilities";
import {
  categoryFormReducer,
  categoryInitialState,
} from "../../../reducers/categoryFormReducer";
import { selectCustomStyles } from "../../utils/selectCustomStyles";
import { useDispatch } from "react-redux";

export const EditCategoryModal = ({ category, onClose }) => {
  const dispatch = useDispatch();

  const [form, dispatchForm] = useReducer(
    categoryFormReducer,
    categoryInitialState
  );

  useEffect(() => {
    if (!category) return;
    dispatchForm({
      type: "SET_ALL",
      payload: {
        name: category.name,
        categoryType: category.categoryType,
        icon: category.icon,
        description: category.description,
      },
    });
  }, [category]);

  const categoryTypeOptions = [
    { value: "Expense", label: "Expense" },
    { value: "Income", label: "Income" },
  ];

  const handleEdit = async (e) => {
    e.preventDefault();

    const success = await dispatch(
      updateCategoryThunk(category._id, form)
    );

    if (success) {
      onClose();
    }
  };
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50">
      <div className="bg-white w-[480px] p-5 rounded-lg">
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-[23px] font-[500]">Edit Category</h1>
            <p className="text-[14px] text-gray-600">
              Update your category information.
            </p>
          </div>
          <MdOutlineCancel
            size={25}
            onClick={onClose}
            className="self-start mt-3 cursor-pointer text-[#555B5A] hover:text-red-600"
          />
        </div>

        <form onSubmit={handleEdit}>
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Category Name
            </label>
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
              type="text"
              placeholder="e.g., Food & Dining"
              className=" outline-none py-2 px-3 rounded shadow focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Category type
            </label>
            <Select
              className="w-[50%] mb-5"
              value={categoryTypeOptions.find(
                (o) => o.value === form.categoryType
              )}
              onChange={(opt) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "categoryType",
                  value: opt.value,
                })
              }
              options={categoryTypeOptions}
              styles={selectCustomStyles}
              defaultValue={categoryTypeOptions[0]}
              maxMenuHeight={200}
            />
          </div>
          
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Icon
            </label>
            <div className="flex overflow-auto py-2 px-2">
              {categoryIcons.map((eachIcon) => {
                const Icon = eachIcon.icon;
                const isSelected = eachIcon.id === form.icon;
                return (
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
                    className={`flex-shrink-0 w-12 h-12 rounded-full mx-2 flex items-center justify-center ${
                      isSelected
                        ? "ring-2 ring-gray-500 ring-offset-2 scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    <Icon color="white" />
                  </button>
                );
              })}
            </div>
          </div>
          
          
          <div className="flex flex-col mb-5">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-3">
              Description{" "}
              <span className="text-[16px] font-[400]">(optional)</span>
            </label>
            <textarea
              required
              value={form.description}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "description",
                  value: e.target.value,
                })
              }
              type="text"
              placeholder="Brief description of this category"
              className="border-1 outline-none py-2 px-3 h-[100px] rounded shadow"
            />
          </div>
      

          

          <div className="flex justify-end">
            <button className="bg-[#D96D38] text-white px-5 py-1 rounded">
              Edit Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
