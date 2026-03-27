import { useSelector } from "react-redux";
import BarChartInVsEx from "../charts/BarChartInVsEx";
import EmptyView from "../../EmptyView";
import { useMemo } from "react";
import { selectTransactions,selectExpVsInc } from "../../../redux/selectors";

export default function TrendsTab() {
  const transactionList = useSelector(selectTransactions) || [];
  const expVsInc = useSelector(selectExpVsInc) || [];


  const currentYear = new Date().getFullYear();
  const { income, expenses } = useMemo(() => {
  let income = 0;
  let expenses = 0;

  transactionList.forEach((tx) => {
      const year = new Date(tx.date).getFullYear();
      if (year === currentYear) {
        if (tx.transactionType === "Income") income += tx.amount;
        if (tx.transactionType === "Expense") expenses += tx.amount;
      }
    });

    return { income, expenses };
  }, [transactionList, currentYear]);

  const financialInsights = [
    { name: "Income", value: income, prefix: "₹" },
    { name: "Expense", value: expenses, prefix: "₹" },
    { name: "Savings", value: income - expenses, prefix: "₹" },
    {
      name: "Savings Rate",
      value: income
        ? (((income - expenses) / income) * 100).toFixed(2)
        : 0,
      suffix: "%",
    },
  ];




  const isEmpty = expVsInc.every(
    (each) => each.income === 0 && each.expense === 0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="lg:basis-[68%]">
        <BarChartInVsEx />
      </div>
      <div className="bg-[#FFFAF4] border border-[#DDDFDE] rounded-2xl p-4 flex-1">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-700">
            Financial Insights
          </h2>
          <p className="text-[#8E5660]">
            Income and expenses for this year.
          </p>
        </div>

        {!isEmpty ? (
          <div className="space-y-6 p-4">
            {financialInsights.map((each, index) => (
              <div key={index} className="flex justify-between">
                <h1 className="text-[#433c3E] text-[18px] font-[500]">
                  {each.name}
                </h1>
                <h1 className="text-green-700 text-[18px] font-[500]">
                  {each.prefix || ""}
                  {each.value}
                  {each.suffix || ""}
                </h1>
              </div>
            ))}
          </div>
        ) : (
          <EmptyView message="No financial data available yet. Add income and expenses to view insights for this year." />
        )}
      </div>
    </div>
  );
}
