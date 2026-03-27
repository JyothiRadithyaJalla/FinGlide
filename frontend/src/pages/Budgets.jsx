import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { AddBudgetModal } from "../components/modals/add/AddBudgetModal";
import { categoryIcons } from "../components/utils/utilities";
import { TriangleAlert, CircleCheckBig, CircleX } from "lucide-react";
import EmptyView from "../components/EmptyView";
import { deleteBudgetThunk } from "../redux/coreThunks";
import { selectBudgets } from "../redux/selectors";

function Budgets() {
  const dispatch = useDispatch();
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // ✅ SAFE DATA
  const budgetList = useSelector(selectBudgets) || [];

  const deleteBudget = (id) => {
    dispatch(deleteBudgetThunk(id));
  };

  // ✅ SAFE CALCULATIONS
  const totalBudget = budgetList.reduce((a, b) => a + (b.limit || 0), 0);
  const totalSpent = budgetList.reduce((a, b) => a + (b.spent || 0), 0);

  const spentPercent =
    totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(2) : 0;

  const budgetAlerts = budgetList.filter((b) => (b.progress || 0) > 80);
  const overBudgets = budgetList.filter((b) => (b.progress || 0) > 100).length;

  return (
    <div>
      {isBudgetModalOpen && (
        <AddBudgetModal onClose={() => setIsBudgetModalOpen(false)} />
      )}

      {/* HEADER */}
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-semibold">Budgets</h1>
        <button
          onClick={() => setIsBudgetModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          + Add Budget
        </button>
      </div>

      {budgetList.length > 0 ? (
        <div>
          {/* SUMMARY */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <h3>Total Budget</h3>
              <p>₹{totalBudget}</p>
            </div>

            <div>
              <h3>Total Spent</h3>
              <p>₹{totalSpent}</p>
              <ProgressBar value={spentPercent} />
              <p>{spentPercent}% used</p>
            </div>
          </div>

          {/* LIST */}
          {budgetList.map((each, i) => {
            const IconComponent =
              categoryIcons.find((icon) => icon.id === each.icon) || {
                icon: () => null,
                color: "#ccc",
              };

            return (
              <div key={i} className="border p-3 mb-3">
                <div className="flex justify-between">
                  <h3>{each.category || "No Category"}</h3>
                  <button onClick={() => deleteBudget(each.budgetId)}>
                    <MdOutlineDelete />
                  </button>
                </div>

                <p>{each.period || "Monthly"}</p>

                <ProgressBar value={each.progress || 0} />

                <p>
                  ₹{each.spent || 0} / ₹{each.limit || 0}
                </p>

                <p>
                  Remaining: ₹
                  {each.remaining !== undefined ? each.remaining : 0}
                </p>

                <p>
                  {(each.progress || 0).toFixed(2)}%
                </p>
              </div>
            );
          })}

          {/* ALERTS */}
          <div className="mt-5">
            <h2>Budget Alerts</h2>

            {budgetAlerts.length > 0 ? (
              budgetAlerts.map((each, i) => (
                <div key={i} className="border p-2 mb-2">
                  <p>{each.category}</p>
                  <p>
                    {each.remaining > 0
                      ? `${each.progress}% used`
                      : `₹${Math.abs(each.remaining || 0)} over budget`}
                  </p>
                </div>
              ))
            ) : (
              <p>All budgets are on track</p>
            )}
          </div>
        </div>
      ) : (
        <EmptyView message="No budgets yet" />
      )}
    </div>
  );
}

export default Budgets;