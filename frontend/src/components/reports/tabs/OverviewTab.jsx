import { useSelector } from "react-redux";
import PieChartCategory  from "../charts/PieChartCategory";
import EmptyView from "../../EmptyView";
import { LineChartInVsEx } from "../charts/LineChartInVsEx";

export default function OverviewTab() {
  const { pieData = [] } = useSelector((store) => store.sliceState || {});

  const totalAmount = pieData.reduce((sum, entry) => sum + entry.total, 0);

  const topSpendingCategories = [...pieData]
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 justify-around items-stretch">
        {/* LEFT: PIE CHART */}
        <div className="lg:basis-[55%] bg-[#FFFAF4] shadow-lg rounded-2xl flex flex-col border-2 border-[#DDDFDE]">
          <PieChartCategory/>
        </div>

        {/* RIGHT: TOP SPENDING CATEGORIES */}
        <div className="lg:basis-[45%] flex flex-col bg-[#FFFAF4] border-2 border-[#DDDFDE] shadow-lg rounded-2xl p-4 w-full ">
          <div className="self-start">
            <h2 className="text-lg font-semibold text-gray-700">
              Top Spending Categories
            </h2>
            <p className="text-[#8E5660]">
              Your highest expense categories this period.
            </p>
          </div>

          {topSpendingCategories.length > 0 ? (
            <ul className="space-y-4 p-4 pl-7 list-disc list-outside marker:text-orange-400 marker:text-[20px]">
              {topSpendingCategories.map((eachCat, index) => (
                <li key={index}>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[20px] font-[500] text-[#3A3A3A]">
                      {eachCat.name}
                    </h1>
                    <div className="text-end">
                      <h1 className="text-[18px] font-[500]">
                        ₹{eachCat.total}
                      </h1>
                      <p className="text-[12px] text-[#8E5660]">
                        {totalAmount
                          ? ((eachCat.total / totalAmount) * 100).toFixed(2)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyView message={"No expenses to display yet."} />
          )}
        </div>

        
        
      </div>
      <LineChartInVsEx/>
    </div>
  );
}
