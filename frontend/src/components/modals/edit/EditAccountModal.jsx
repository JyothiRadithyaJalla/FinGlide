import { useEffect, useReducer } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Select from "react-select";
import { updateAccountThunk } from "../../../redux/coreThunks";
import { accountIcons } from "../../utils/utilities";
import { accountFormReducer, accountInitialState, } from "../../../reducers/accountFormReducer";
import { selectCustomStyles } from "../../utils/selectCustomStyles";
import { useDispatch } from "react-redux";

export const EditAccountModal = ({ editAccount, onClose }) => {
  const dispatch = useDispatch();

  const [form, dispatchForm] = useReducer(
    accountFormReducer,
    accountInitialState
  );

  useEffect(() => {
    if (!editAccount) return;
    dispatchForm({
      type: "SET_ALL",
      payload: {
        name: editAccount.name,
        accountType: editAccount.accountType,
        balance: editAccount.balance,
        accountNumber: editAccount.accountNumber,
        institution: editAccount.institution,
        icon: editAccount.icon,
      },
    });
  }, [editAccount]);

  const accountOptions = [
    { value: "wallet", label: "Wallet" },
    { value: "bank", label: "Bank" },
    { value: "card", label: "Card" },
    { value: "investment", label: "Investment" },
    { value: "crypto", label: "Crypto" },
    { value: "loan", label: "Loan" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await dispatch(
      updateAccountThunk(editAccount._id, form)
    );

    if (success) {
      onClose(); 
    }
};


  if (!editAccount) return null;

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50">
      <div className="bg-white w-[480px] p-5 rounded-lg">
        <div className="mb-3 flex justify-between">
          <div>
            <h1 className="text-[23px] font-[500]">Edit Account</h1>
            <p className="text-[14px] text-gray-600">
              Update account information.
            </p>
          </div>
          <MdOutlineCancel
            size={25}
            onClick={onClose}
           className="self-start mt-3 cursor-pointer text-[#555B5A] hover:text-red-600" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
                <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">
                  Account Name
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
                  placeholder="e.g., Main Checking"
                  className=" outline-none py-2 px-3 rounded shadow focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-300"
                />
              </div>

          <div className="flex w-[100%] items-center justify-between mb-3">
            <div className="flex flex-col w-[45%]">
              <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">
                Account type
              </label>
              <Select
                value={accountOptions.find(
                  (o) => o.value === form.accountType
                )}
                onChange={(opt) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "accountType",
                    value: opt.value,
                  })
                }
                options={accountOptions}
                styles={selectCustomStyles}
                defaultValue={accountOptions[0]}
              />
            </div>
            

            <div className="flex flex-col w-[45%]">
              <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">
                Account Balance
              </label>
              <input
                type="number"
                value={form.balance}
                onChange={(e) =>
                  dispatchForm({
                    type: "SET_FIELD",
                    field: "balance",
                    value: e.target.value,
                  })
                }
                placeholder="0.00"
                step={0.1}
                className="outline-none py-2 px-3 rounded shadow"   
              />
            </div>            
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-1">
              Icon
            </label>
            <div className="flex overflow-auto py-2 px-2">
              {accountIcons.map((eachIcon) => {
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
                    className={`w-10 h-10 rounded-full mx-2 flex items-center justify-center ${
                      isSelected
                        ? "ring-2 ring-gray-500 scale-110"
                        : ""
                    }`}
                  >
                    <Icon color="white" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">
              Account Number{" "}
              <span className="text-[16px] font-[400]">(Optional)</span>
            </label>
            <input
              value={form.accountNumber || ""}
              onChange={(e) =>
                dispatchForm({
                  type: "SET_FIELD",
                  field: "accountNumber",
                  value: e.target.value,
                })
              }
              type="text"
              placeholder="*****1234"
              className="border-1 border-gray-400 outline-none py-2 px-3 rounded shadow"
            />
          </div>

          <div className="flex flex-col mb-3">
                <label className="text-[#3A3A3A] font-[500] text-[18px] mb-2">
                  Institution{" "}
                  <span className="text-[16px] font-[400]">(Optional)</span>
                </label>
                <input
                  value={form.institution || ""}
                  onChange={(e) =>
                    dispatchForm({
                      type: "SET_FIELD",
                      field: "institution",
                      value: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="e.g., SBI Bank"
                  className="border-1 border-gray-400 outline-none py-2 px-3 rounded shadow"
                />
              </div>

          

          <div className="flex justify-end">
            <button className="bg-[#D96D38] text-white px-5 py-1 rounded">
              Edit Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
