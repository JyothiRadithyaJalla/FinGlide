import React,{useState,useEffect} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";
import EmptyView from "../../EmptyView";
import api from "../../../api/axios";
import { showError } from "../../utils/toast";
import { useDispatch} from "react-redux";
import { coreActions } from "../../../redux/coreSlice";


export default function PieChartCategory() {
  const [period, setPeriod] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [pieData,setPieData] = useState([])
  const [year, month] = period.split("-");
  const dispatch = useDispatch()


  
  const rainbowColor = scaleSequential(interpolateRainbow)
    .domain([0, pieData.length])

  useEffect(() => {
  let isMounted = true; 

  const fetchData = async () => {
    try {
      
      dispatch(coreActions.startLoading(true));
      const res = await api.get(
        `/category/getPieData/?month=${month}&year=${year}`,
        { withCredentials: true }
      );

      if (isMounted) {
        setPieData(res.data.transactionData);
      }
    } catch (err) {
      showError(
        err.response?.data?.message ||
        "Failed to load report data"
      );
    }
     finally {
      if (isMounted) {
        dispatch(coreActions.stopLoading(false));
      }
    }
  };

  fetchData();

  return () => {
    isMounted = false; 
  };
}, [period]);


  return (
    <div className="flex flex-col bg-[#FFFAF4] rounded-2xl p-4 w-full h-full min-w-0">
      <div className="flex justify-between">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Expenses by Category
          </h2>
          <p className="text-[#8E5660]">
            Your spending breakdown for this month.
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

      {pieData.length > 0 ? (
        <div className="flex flex-col md:flex-row lg:flex-col items-center justify-center gap-6 w-full h-[350px]">          
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

          {/* LEGEND */}
          <div className="flex gap-2 md:flex-col lg:flex-row flex-wrap">
            {pieData.map((entry, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: rainbowColor(i) }}
                />
                <span className="text-sm text-gray-700">
                  {entry.name}
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
