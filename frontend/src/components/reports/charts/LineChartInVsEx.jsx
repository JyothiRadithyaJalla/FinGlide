import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip,YAxis, Legend, ResponsiveContainer } from "recharts";
import { selectLineData } from "../../../redux/selectors";
import EmptyView from "../../EmptyView";

export  function LineChartInVsEx() {

  const linedata = useSelector(selectLineData) || [];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-md border text-sm">
          {payload.map((entry) => (
            <p key={entry.name} className="text-black font-semibold">
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="bg-[#FFFAF4] shadow-lg rounded-2xl p-4 w-full max-w-4xl border-1 border-[#DDDFDE]">
        <div className="self-start mb-5">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Income, Expenses & Savings</h2>
          <p className="text-[#8E5660]">Income, expenses, and savings over the past year.</p>
        </div>
        {!linedata.every((each) => each.income === 0 && each.expense === 0 && each.savings === 0) ? <div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={linedata} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="income" stroke="#0088FE" strokeWidth={2} dot={{ r: 4 }}/>
              <Line type="monotone" dataKey="expense" stroke="#FF8042" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="savings" stroke="#00C49F" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div> : <EmptyView message={"No income, expenses, or savings data available yet. Start adding transactions to see your trends."}/>}
      </div>
    </div>
  );
}