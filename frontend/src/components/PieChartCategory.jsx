import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";
import EmptyView from "./EmptyView";
import { selectPieData } from "../redux/selectors";

export default function PieChartCategory() {
  // ✅ Always safe default
  const pieData = useSelector(selectPieData) || [];

  // ✅ Prevent crash if empty
  const safeLength = pieData.length > 0 ? pieData.length : 1;

  const rainbowColor = scaleSequential(interpolateRainbow)
    .domain([0, safeLength]);

  return (
    <div className="flex flex-col bg-[#FFFAF4] rounded-2xl p-4 w-full h-full min-w-0">
      
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Expenses by Category
        </h2>
        <p className="text-[#8E5660]">
          Your spending breakdown for this month.
        </p>
      </div>

      {/* ✅ Check safely */}
      {pieData && pieData.length > 0 ? (
        <div className="flex flex-col md:flex-row lg:flex-col items-center justify-center gap-6 w-full h-[350px]">

          {/* Chart */}
          <div className="w-full md:w-2/3 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="75%"
                  paddingAngle={1}
                  dataKey="total"
                  isAnimationActive
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={rainbowColor(i)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Labels */}
          <div className="flex gap-2 md:flex-col lg:flex-row flex-wrap">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: rainbowColor(i) }}
                />
                <span className="text-sm text-gray-700">
                  {entry?.name || "Unknown"}
                </span>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <EmptyView message="No expenses to display yet." />
      )}
    </div>
  );
}