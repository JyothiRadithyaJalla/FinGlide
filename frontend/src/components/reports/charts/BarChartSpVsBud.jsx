import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid,Cell,} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpendVsBudgetThunk } from "../../../redux/coreThunks";
import EmptyView from "../../EmptyView";
import { selectSpendVsBudget } from "../../../redux/selectors";

export default function BarChartSpVsBud({period,setPeriod}) {
  const dispatch = useDispatch();
  
  const spendVsBudgetData = useSelector(selectSpendVsBudget) || [];
  
  const [year, month] = period.split("-");

 
  useEffect(() => {
    dispatch(
      fetchSpendVsBudgetThunk({ month, year })
    );
  }, [month, year, dispatch]);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-2 rounded shadow text-sm">
          <p className="font-semibold">{label}</p>
          <p>Budget: ₹{payload[0].value}</p>
          <p>Spent: ₹{payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Category Spending vs Budget
          </h2>
          <p className="text-[#8E5660] text-sm">
            Compare actual spending against budgets
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Period</label>
            <input
                type="month"
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value)
                }
                className="border px-3 py-1 rounded outline-none cursor-pointer"
              />
          </div>
        </div>
      </div>

      {spendVsBudgetData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={spendVsBudgetData} barGap={10}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoryName" fontSize={12} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            <Bar dataKey="budget" name="Budget" fill="#9ca3af" barSize={28} />
            <Bar dataKey="spent" name="Spent" fill="#22c55e" barSize={28}>
              {spendVsBudgetData.map((e, i) => (
                <Cell
                  key={i}
                  fill={e.spent > e.budget ? "#ef4444" : "#22c55e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyView message="No budget data available." />
      )}
    </div>
  );
}
